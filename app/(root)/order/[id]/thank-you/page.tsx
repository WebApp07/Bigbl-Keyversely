import { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import { getOrderById } from "@/lib/actions/order.actions";
import Link from "next/link";
import { notFound } from "next/navigation";
import Stripe from "stripe";
import { 
  CheckCircle, 
  Package, 
  Mail, 
  Clock, 
  CreditCard, 
  Calendar, 
  Hash, 
  User, 
  MapPin, 
  ShoppingCart, 
  Info, 
  Phone,
  ArrowRight,
  ExternalLink,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import Image from "next/image";
import { ShippingAddress, OrderItem } from "@/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const metadata: Metadata = {
  title: "Order Complete | Keyversely",
  description: "Your order has been successfully completed.",
};

const ThankYouPage = async (props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ payment_intent?: string }>;
}) => {
  const { id } = await props.params;
  const { payment_intent: paymentIntentId } = await props.searchParams;

  // Fetch order
  const order = await getOrderById(id);
  if (!order) notFound();

  let isSuccess = order.isPaid;

  // If redirected from Stripe, verify payment intent
  if (paymentIntentId) {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      if (
        paymentIntent.metadata.orderId != null &&
        paymentIntent.metadata.orderId === order.id.toString()
      ) {
        isSuccess = paymentIntent.status === "succeeded";
      }
    } catch (error) {
      console.error("Error retrieving payment intent:", error);
    }
  }

  const {
    shippingAddress,
    orderitems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    createdAt,
    paymentMethod,
  } = order;

  const address = shippingAddress as ShippingAddress;

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-10 px-4">
      {/* Success Hero */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          {isSuccess ? (
            <CheckCircle className="w-16 h-16 text-green-500" />
          ) : (
            <AlertCircle className="w-16 h-16 text-amber-500" />
          )}
        </div>
        <h1 className={`h1-bold ${isSuccess ? 'text-green-600' : 'text-amber-600'}`}>
          {isSuccess ? 'Thank You!' : 'Order Placed!'}
        </h1>
        <p className="text-muted-foreground text-lg font-medium">
          {isSuccess 
            ? 'Your order has been successfully completed and paid.' 
            : 'Your order has been placed and is awaiting payment.'}
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Card className="bg-muted/30 border-none shadow-none">
            <CardContent className="p-4 space-y-1 text-center">
              <div className="flex items-center justify-center gap-1 text-muted-foreground text-[10px] uppercase tracking-wider font-bold">
                <Hash className="w-3 h-3" /> Order Number
              </div>
              <p className="font-bold text-sm md:text-base">{formatId(id)}</p>
            </CardContent>
          </Card>
          <Card className="bg-muted/30 border-none shadow-none">
            <CardContent className="p-4 space-y-1 text-center">
              <div className="flex items-center justify-center gap-1 text-muted-foreground text-[10px] uppercase tracking-wider font-bold">
                <Calendar className="w-3 h-3" /> Purchase Date
              </div>
              <p className="font-bold text-sm md:text-base">{formatDateTime(createdAt).dateOnly}</p>
            </CardContent>
          </Card>
          <Card className="bg-muted/30 border-none shadow-none">
            <CardContent className="p-4 space-y-1 text-center">
              <div className="flex items-center justify-center gap-1 text-muted-foreground text-[10px] uppercase tracking-wider font-bold">
                <CreditCard className="w-3 h-3" /> Payment Status
              </div>
              <div className="flex justify-center">
                {isSuccess ? (
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none text-[10px] h-5 font-bold uppercase">
                    Paid
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="text-[10px] h-5 font-bold uppercase">
                    Not Paid
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-muted/30 border-none shadow-none">
            <CardContent className="p-4 space-y-1 text-center">
              <div className="flex items-center justify-center gap-1 text-muted-foreground text-[10px] uppercase tracking-wider font-bold">
                <ShoppingCart className="w-3 h-3" /> Total Amount
              </div>
              <p className="font-bold text-sm md:text-base text-primary">{formatCurrency(totalPrice)}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Purchased Products */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-muted/20">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Package className="w-5 h-5 text-primary" /> Purchased Products
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-6">Product</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-right pr-6">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderitems.map((item: OrderItem) => (
                    <TableRow key={item.slug}>
                      <TableCell className="pl-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative w-14 h-14 rounded-lg border bg-white overflow-hidden flex-shrink-0 shadow-sm">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                          <span className="font-semibold text-sm md:text-base leading-tight">{item.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-medium">{item.qty}</TableCell>
                      <TableCell className="text-right pr-6 font-semibold">
                        {formatCurrency(item.price)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Delivery Section */}
          <Card className="border-blue-100 bg-blue-50/30 overflow-hidden">
            <CardHeader className="bg-blue-50/50">
              <CardTitle className="flex items-center gap-2 text-blue-800 text-xl">
                <Mail className="w-5 h-5" /> {isSuccess ? 'Digital Delivery' : 'Next Steps'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {isSuccess ? (
                <>
                  <p className="text-sm text-blue-700/80 leading-relaxed font-medium">
                    Your digital license keys are being processed. Since this is a digital purchase, please keep the following in mind:
                  </p>
                  <ul className="space-y-4">
                    <li className="flex gap-4 text-sm items-start">
                      <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-blue-900/80 pt-1">The license key will be delivered <strong>digitally</strong> to your email address.</span>
                    </li>
                    <li className="flex gap-4 text-sm items-start">
                      <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                        <Mail className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-blue-900/80 pt-1">Please check your inbox (and spam folder) for an email from <strong>Keyversely</strong>.</span>
                    </li>
                  </ul>
                </>
              ) : (
                <>
                  <p className="text-sm text-blue-700/80 leading-relaxed font-medium">
                    To complete your order, please proceed to the payment page. Once payment is confirmed, your digital products will be delivered.
                  </p>
                  <div className="pt-2">
                    <Button asChild className="w-full md:w-auto">
                      <Link href={`/order/${id}`}>
                        Complete Payment
                      </Link>
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Order Summary */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatCurrency(itemsPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-medium">{formatCurrency(taxPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">{formatCurrency(shippingPrice)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-xl text-primary pt-2">
                <span>Total</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-muted p-2 rounded-lg h-fit">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Customer Name</p>
                  <p className="text-sm font-semibold leading-none">{order.user.name}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-muted p-2 rounded-lg h-fit">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Email Address</p>
                  <p className="text-sm font-semibold leading-none break-all">{order.user.email}</p>
                </div>
              </div>
              {address && (
                <div className="flex gap-4">
                  <div className="bg-muted p-2 rounded-lg h-fit">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Billing Address</p>
                    <p className="text-sm font-semibold leading-none">{address.fullName}</p>
                    <p className="text-xs text-muted-foreground mt-1">{address.country}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            {!isSuccess && (
               <Button asChild className="w-full justify-between h-12 text-base font-semibold shadow-md group" variant="default">
               <Link href={`/order/${id}`}>
                 Proceed to Payment
                 <CreditCard className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
               </Link>
             </Button>
            )}
            <Button asChild className="w-full justify-between h-12 text-base font-semibold group" variant="outline">
              <Link href={`/order/${id}`}>
                View Order Details 
                <ExternalLink className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </Button>
            <Button asChild className="w-full justify-between h-12 text-base font-semibold group" variant="outline">
              <Link href="/">
                Continue Shopping 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
