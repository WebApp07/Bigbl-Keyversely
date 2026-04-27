"use server";

import {
  shippingAddressSchema,
  signInFormSchema,
  signUpFormSchema,
} from "../validators";
import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/db/prisma";
import { hashSync } from "bcrypt-edge";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { formatError } from "../utils";
import { ShippingAddress } from "@/types";
import { revalidatePath } from "next/cache";

// Sign in the user with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData,
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    await signIn("credentials", user);

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error; // Let Next.js handle the redirect
    }
    return { success: false, message: "Invalid email or password" };
  }
}

// Sign out the user
export async function signOutUser() {
  await signOut();
  return { success: true, message: "Signed out successfully" };
}

// Sign up user
export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const plainPassword = user.password;
    user.password = hashSync(user.password, 10);

    await prisma.user.create({
      data: { name: user.name, email: user.email, password: user.password },
    });

    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
    });

    return { success: true, message: "User registered successfully." };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error; // Let Next.js handle the redirect
    }
    return { success: false, message: "User was not registered." };
  }
}

// Get user by ID
export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

// Update user's shipping address
export async function updateUserAddress(data: ShippingAddress) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) throw new Error("Not authenticated");

    const address = shippingAddressSchema.parse(data);

    await prisma.user.update({
      where: { id: userId },
      data: { address },
    });

    revalidatePath("/payment-method");

    return {
      success: true,
      message: "Shipping address updated successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
