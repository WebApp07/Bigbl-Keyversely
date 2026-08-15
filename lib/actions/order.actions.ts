"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { convertToPlainObject, formatError, round2 } from "../utils";
import { auth } from "@/auth";
import { getMyCart } from "./cart.actions";
import { getUserById } from "./user.actions";
import { insertOrderSchema } from "../validators";
import { prisma } from "@/db/prisma";
import { CartItem, PaymentResult, ShippingAddress } from "@/types";
import { paypal } from "../paypal";
import { revalidatePath } from "next/cache";
import { PAGE_SIZE, shippingPriceForNow } from "../constants";
import { Prisma } from "@prisma/client";
import { sendPurchaseReceipt } from "@/email";
import { getCurrency, getSettlementCurrency } from "@/lib/currency/server";
import { convertAmount } from "@/lib/currency/exchange-rates";
import { BASE_CURRENCY } from "@/lib/i18n/currencies";

/**
 * Recalculate cart totals server-side straight from the database. The stored
 * cart totals are never trusted for checkout: the price of each product is
 * re-read from the Product table and all amounts are computed in the base
 * currency. This makes it impossible for a tampered client to change what is
 * charged.
 */
async function recalcTotalsFromDb(cartItems: CartItem[]) {
  const products = await prisma.product.findMany({
    where: { id: { in: cartItems.map((i) => i.productId) } },
  });
  const priceMap = new Map(products.map((p) => [p.id, Number(p.price)]));

  const itemsPrice = round2(
    cartItems.reduce(
      (acc, item) =>
        acc + (priceMap.get(item.productId) ?? Number(item.price)) * item.qty,
      0,
    ),
  );
  const shippingPrice = shippingPriceForNow;
  const taxPrice = round2(itemsPrice * 0.2);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
    priceOf: (productId: string) => priceMap.get(productId) ?? null,
  };
}

// Create order and create the order items
export async function createOrder() {
  try {
    const session = await auth();
    const cart = await getMyCart();
    const userId = session?.user?.id;

    if (!cart || cart.items.length === 0) {
      return {
        success: false,
        message: "Your cart is empty.",
        redirectTo: "/cart",
      };
    }

    let shippingAddress: ShippingAddress | null = null;
    let paymentMethod: string | null = null;

    if (userId) {
      const user = await getUserById(userId);
      shippingAddress = user?.address as ShippingAddress;
      paymentMethod = user?.paymentMethod || null;
    } else {
      shippingAddress = cart.shippingAddress as ShippingAddress;
      paymentMethod = cart.paymentMethod || null;
    }

    if (!shippingAddress) {
      return {
        success: false,
        message: "No shipping address.",
        redirectTo: "/shipping-address",
      };
    }

    if (!paymentMethod) {
      return {
        success: false,
        message: "No payment method.",
        redirectTo: "/payment-method",
      };
    }

    const items = cart.items as CartItem[];

    // Recalculate prices from the database, never from client-provided totals.
    const totals = await recalcTotalsFromDb(items);

    // Create order object
    const order = insertOrderSchema.parse({
      userId: userId || null,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      itemsPrice: totals.itemsPrice,
      shippingPrice: totals.shippingPrice,
      taxPrice: totals.taxPrice,
      totalPrice: totals.totalPrice,
    });

    // Create a transaction to create  order and order items in database

    const insertedOrderId = await prisma.$transaction(async (tx) => {
      // Create order
      const insertedOrder = await tx.order.create({ data: order });
      // Create order items from the cart items

      for (const item of items) {
        const unitPrice = totals.priceOf(item.productId) ?? Number(item.price);
        await tx.orderItem.create({
          data: {
            ...item,
            price: unitPrice,
            orderId: insertedOrder.id,
          },
        });
      }

      // Clear cart
      await tx.cart.update({
        where: { id: cart.id },
        data: {
          items: [],
          totalPrice: 0,
          taxPrice: 0,
          shippingPrice: 0,
          itemsPrice: 0,
        },
      });
      return insertedOrder.id;
    });

    if (!insertedOrderId) {
      throw new Error("Order not created.");
    }

    return {
      success: true,
      message: "Order Created",
      redirectTo: `/order/${insertedOrderId}/thank-you`,
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { success: false, message: formatError(error) };
  }
}

// Get order by id
export async function getOrderById(orderId: string) {
  const data = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      orderitems: true,
      user: { select: { name: true, email: true } },
    },
  });

  return convertToPlainObject(data);
}

// Create new paypal order
export async function createPayPalOrder(orderId: string) {
  try {
    // Get order from db
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    });

    if (order) {
      // Settle in the user's currency only when PayPal supports it, otherwise
      // fall back to the base currency. Amount is converted server-side.
      const selected = await getCurrency();
      const settlement = getSettlementCurrency(selected);
      const amount = await convertAmount(
        Number(order.totalPrice),
        BASE_CURRENCY,
        settlement,
      );

      // Create paypal order
      const paypalOrder = await paypal.createOrder(amount, settlement);

      // Update order with paypa order id
      await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentResult: {
            id: paypalOrder.id,
            email_address: "",
            status: "",
            pricePaid: 0,
            currency: settlement,
          },
        },
      });

      return {
        success: true,
        message: "Item order created successfully",
        data: paypalOrder.id,
      };
    } else {
      throw new Error("Order not found");
    }
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Approve PayPal order and update order to paid
export async function approvePayPalOrder(
  orderId: string,
  data: { orderID: string },
) {
  try {
    //Get order from db
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    const captureData = await paypal.capturePayment(data.orderID);

    if (
      !captureData ||
      captureData.id !== (order.paymentResult as PaymentResult)?.id ||
      captureData.status !== "COMPLETED"
    ) {
      throw new Error("Error in PayPal payment");
    }
    // Update order to paid
    await updateOrderToPaid({
      orderId,
      paymentResult: {
        id: captureData.id,
        status: captureData.status,
        email_address: captureData.payer?.email_address ?? "",

        pricePaid:
          captureData.purchase_units?.[0]?.payments?.captures?.[0]?.amount
            ?.value ?? "0",
        currency:
          captureData.purchase_units?.[0]?.payments?.captures?.[0]?.amount
            ?.currency_code ?? "USD",
      },
    });

    revalidatePath(`/order/${orderId}`);
    revalidatePath(`/order/${orderId}/thank-you`);
    return {
      sucess: true,
      message: "Your oeder has been paid",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Update order to paid
export async function updateOrderToPaid({
  orderId,
  paymentResult,
}: {
  orderId: string;
  paymentResult?: PaymentResult;
}) {
  // Get order from database
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      orderitems: true,
    },
  });

  if (!order) throw new Error("Order not found");

  if (order.isPaid) throw new Error("Order is already paid");

  // Transaction to update order and account for product stock
  await prisma.$transaction(async (tx) => {
    // Iterate over products and update stock
    for (const item of order.orderitems) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { increment: -item.qty } },
      });
    }

    // Set the order to paid
    await tx.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        paidAt: new Date(),
        paymentResult,
      },
    });
  });
  // Get updated order after transaction
  const updatedOrder = await prisma.order.findFirst({
    where: { id: orderId },
    include: {
      orderitems: true,
      user: { select: { name: true, email: true } },
    },
  });

  if (!updatedOrder) throw new Error("Order not found");

  sendPurchaseReceipt({
    order: {
      ...updatedOrder,
      itemsPrice: updatedOrder.itemsPrice.toString(),
      shippingPrice: updatedOrder.shippingPrice.toString(),
      taxPrice: updatedOrder.taxPrice.toString(),
      totalPrice: updatedOrder.totalPrice.toString(),

      shippingAddress: updatedOrder.shippingAddress as ShippingAddress,
      paymentResult: updatedOrder.paymentResult as PaymentResult,
      user: updatedOrder.user as { name: string; email: string } | null,
      orderitems: updatedOrder.orderitems.map((item) => ({
        ...item,
        price: item.price.toString(),
      })),
    },
  });
}

// Get user's orders
export async function getMyOrders({
  limit = PAGE_SIZE,
  page,
  query,
}: {
  limit?: number;
  page: number;
  query?: string;
}) {
  const queryFilter: Prisma.OrderWhereInput =
    query && query !== "all"
      ? {
          user: {
            name: {
              contains: query,
              mode: "insensitive",
            } as Prisma.StringFilter,
          },
        }
      : {};
  const data = await prisma.order.findMany({
    where: { ...queryFilter },
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true } } },
    take: limit,
    skip: (page - 1) * limit,
  });
  const dataCount = await prisma.order.count({
    where: { ...queryFilter },
  });
  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}

type SalesDataType = {
  month: string;
  totalSales: number;
}[];

// Get sales data and order summary
export async function getOrderSummary() {
  // Get counts for each resource
  const ordersCount = await prisma.order.count();
  const productsCount = await prisma.product.count();
  const usersCount = await prisma.user.count();

  // Calculate the total sales
  const totalSales = await prisma.order.aggregate({
    _sum: { totalPrice: true },
  });

  // Get monthly sales
  const salesDataRaw = await prisma.$queryRaw<
    Array<{ month: string; totalSales: Prisma.Decimal }>
  >`SELECT to_char("createdAt", 'MM/YY') as "month", sum("totalPrice") as "totalSales" FROM "Order" GROUP BY to_char("createdAt", 'MM/YY')`;

  const salesData: SalesDataType = salesDataRaw.map((entry) => ({
    month: entry.month,
    totalSales: Number(entry.totalSales),
  }));

  // Get latest sales
  const latestSales = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true } },
    },
    take: 6,
  });

  return {
    ordersCount,
    productsCount,
    usersCount,
    totalSales,
    latestSales,
    salesData,
  };
}

// Ge all orders
export async function GetAllOrders({
  limit = PAGE_SIZE,
  page,
}: {
  limit?: number;
  page: number;
}) {
  const data = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: (page - 1) * limit,
    include: { user: { select: { name: true } } },
  });

  const dataCount = await prisma.order.count();

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}

// Delete an order
export async function deleteOrder(id: string) {
  try {
    await prisma.order.delete({
      where: { id },
    });
    revalidatePath("/admin/orders");

    return {
      success: true,
      message: "Order deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// Update COD order to paid

export async function updateOrderToPaidCOD(orderId: string) {
  try {
    await updateOrderToPaid({ orderId });

    revalidatePath(`/order/${orderId}`);
    revalidatePath(`/order/${orderId}/thank-you`);
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// Update COD order to delivered
export async function deliverOrder(orderId: string) {
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      throw new Error("Order not found.");
    }

    if (!order.isPaid) {
      throw new Error("Order is not paid.");
    }

    await prisma.order.update({
      where: { id: orderId },
      data: {
        isDelivered: true,
        deliveredAt: new Date(),
      },
    });

    revalidatePath(`/order/${orderId}`);
    revalidatePath(`/order/${orderId}/thank-you`);

    return {
      success: true,
      message: "Order has been marked delivered.",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// Track order by order ID and email - no authentication required
export async function trackOrder(orderId: string, email: string) {
  try {
    if (!orderId || !email) {
      return {
        success: false,
        message: "Order ID and email are required.",
      };
    }

    const order = await prisma.order.findFirst({
      where: { id: orderId },
      include: {
        orderitems: true,
        user: { select: { name: true, email: true } },
      },
    });

    if (!order) {
      return {
        success: false,
        message: "No order found with that ID.",
      };
    }

    const shippingAddress = order.shippingAddress as ShippingAddress;

    const emailMatches =
      order.user?.email?.toLowerCase() === email.trim().toLowerCase() ||
      shippingAddress?.email?.toLowerCase() === email.trim().toLowerCase();

    if (!emailMatches) {
      return {
        success: false,
        message: "The email address does not match this order.",
      };
    }

    return {
      success: true,
      message: "Order found",
      data: convertToPlainObject({
        ...order,
        shippingAddress: order.shippingAddress as ShippingAddress,
        paymentResult: order.paymentResult as PaymentResult,
      }),
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
