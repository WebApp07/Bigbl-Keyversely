"use server";

import {
  forgotPasswordSchema,
  paymentMethodSchema,
  resetPasswordSchema,
  shippingAddressSchema,
  signInFormSchema,
  signUpFormSchema,
  updateUserSchema,
} from "../validators";
import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/db/prisma";
import { hashSync } from "bcrypt-edge";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { formatError } from "../utils";
import { ShippingAddress } from "@/types";
import { revalidatePath } from "next/cache";
import z from "zod";
import { PAGE_SIZE } from "../constants";
import { Prisma } from "@prisma/client";
import { sendPasswordResetEmail } from "@/email";
import { cookies, headers } from "next/headers";
import {
  checkSignupRateLimit,
  recordSignupAttempt,
} from "../sign-up-rate-limit";
import { isLoginBlocked, recordFailedLogin } from "../login-rate-limit";
import { memoryLoginLimit } from "../rate-limit-memory";

// Sign in the user with credentials

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData,
) {
  const email = String(formData.get("email") || "");

  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0] ?? "unknown";

  const fastKey = `${ip}:${email}`;

  if (memoryLoginLimit(fastKey)) {
    return {
      success: false,
      message: "Too many requests. Please slow down.",
    };
  }

  if (await isLoginBlocked(ip, email)) {
    return {
      success: false,
      message: "Too many login attempts. Try again in 15 minutes.",
    };
  }

  try {
    const user = signInFormSchema.parse({
      email,
      password: formData.get("password"),
    });

    const callbackUrl = String(formData.get("callbackUrl") || "/");

    await signIn("credentials", {
      ...user,
      redirectTo: callbackUrl,
    });
    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (error) {
    // record ONLY real failures
    await recordFailedLogin(ip, email);

    if (isRedirectError(error)) throw error;

    return {
      success: false,
      message: "Invalid email or password",
    };
  }
}

// Sign out the user
// Form-compatible sign out action
export async function signOutUser(): Promise<void> {
  try {
    await signOut();
  } catch (error) {
    console.error("Sign out error:", error);
    throw new Error("Failed to sign out. Please try again.");
  }
}

// Sign in User
export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    // Get user IP
    const headersList = await headers();

    const ip = headersList.get("x-forwarded-for")?.split(",")[0] ?? "unknown";

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: user.email.toLowerCase(),
      },
    });

    if (existingUser) {
      return {
        success: false,
        message: "Email already exists",
      };
    }

    // Check rate limit
    const allowed = await checkSignupRateLimit(ip);

    if (!allowed) {
      return {
        success: false,
        message: "Too many registration attempts. Please try again later.",
      };
    }

    // Record signup attempt
    await recordSignupAttempt(ip, user.email);

    const plainPassword = user.password;
    user.password = hashSync(user.password, 10);

    // Create user
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    // Auto login
    const callbackUrl = String(formData.get("callbackUrl") || "/");

    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
      redirectTo: callbackUrl,
    });

    return {
      success: true,
      message: "User registered successfully.",
    };
  } catch (error) {
    console.error("SIGNUP ERROR:", error);

    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: "User was not registered.",
    };
  }
}
// Forget password

// Forgot password - generate token and send email
export async function forgotPassword(prevState: unknown, formData: FormData) {
  try {
    const { email } = forgotPasswordSchema.parse({
      email: formData.get("email"),
    });

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      return {
        success: true,
        message: "If that email exists, a reset link has been sent.",
      };
    }

    // Generate token and expiry (1 hour)
    const resetToken = crypto.randomUUID();
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpiry },
    });

    // Send email
    await sendPasswordResetEmail(user.email, user.name, resetToken);

    return {
      success: true,
      message: "If that email exists, a reset link has been sent.",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Reset password - validate token and update password
export async function resetPassword(prevState: unknown, formData: FormData) {
  try {
    const { password } = resetPasswordSchema.parse({
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const token = formData.get("token") as string;

    if (!token) {
      return { success: false, message: "Reset token is missing." };
    }

    // Find user with valid token that hasn't expired
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gt: new Date() },
      },
    });

    if (!user) {
      return {
        success: false,
        message: "Reset link is invalid or has expired.",
      };
    }

    // Hash new password and clear token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashSync(password, 10),
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return {
      success: true,
      message: "Password reset successfully. You can now sign in.",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Get user by ID

export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    return user;
  } catch (error) {
    console.error("Database error fetching user:", error);
    throw new Error("Failed to fetch user");
  }
}

// Update user's shipping address
export async function updateUserAddress(data: ShippingAddress) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;

    if (!userId && !sessionCartId) throw new Error("Not authenticated");

    const address = shippingAddressSchema.parse(data);

    if (userId) {
      await prisma.user.update({
        where: { id: userId },
        data: { address },
      });
    }

    if (sessionCartId) {
      const cart = await prisma.cart.findFirst({
        where: { sessionCartId },
      });
      if (cart) {
        await prisma.cart.update({
          where: { id: cart.id },
          data: { shippingAddress: address },
        });
      }
    }

    revalidatePath("/payment-method");

    return {
      success: true,
      message: "Shipping address updated successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Update user's payment method
export async function updateUserPaymentMethod(
  data: z.infer<typeof paymentMethodSchema>,
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;

    if (!userId && !sessionCartId) throw new Error("Not authenticated");

    const paymentMethod = paymentMethodSchema.parse(data);

    if (userId) {
      await prisma.user.update({
        where: { id: userId },
        data: { paymentMethod: paymentMethod.method },
      });
    }

    if (sessionCartId) {
      const cart = await prisma.cart.findFirst({
        where: { sessionCartId },
      });
      if (cart) {
        await prisma.cart.update({
          where: { id: cart.id },
          data: { paymentMethod: paymentMethod.method },
        });
      }
    }

    return {
      success: true,
      message: "Payment method updated successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Update  the user profile
export async function updateProfile(user: { name: string; email: string }) {
  try {
    const seesion = await auth();

    const currentUser = await prisma.user.findFirst({
      where: {
        id: seesion?.user?.id,
      },
    });

    if (!currentUser) {
      throw new Error("User not found");
    }

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name: user.name,
      },
    });

    return {
      success: true,
      message: "User updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// Get all the users
export async function getAllUsers({
  limit = PAGE_SIZE,
  page,
  query,
}: {
  limit?: number;
  page: number;
  query: string;
}) {
  const queryFilter: Prisma.UserWhereInput =
    query && query !== "all"
      ? {
          name: {
            contains: query,
            mode: "insensitive",
          } as Prisma.StringFilter,
        }
      : {};

  const data = await prisma.user.findMany({
    where: { ...queryFilter },
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: (page - 1) * limit,
  });
  const dataCount = await prisma.user.count();

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}

// Delete a user

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id },
    });
    revalidatePath("/admin/users");
    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
// Update a user
export async function updateUser(user: z.infer<typeof updateUserSchema>) {
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    revalidatePath("/admin/users");

    return {
      success: true,
      message: "User updated successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Enable guest checkout
export async function setGuestCheckout() {
  (await cookies()).set("isGuestCheckout", "true", {
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });
}
