import { FaFacebook, FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Bigbl";
export const APP_DESCRIPTION =
  process.env.PUBLIC_APP_DESCRIPTION ||
  " Keyversely LLC is an authorized Microsoft and Adobe partner providing genuine digital licenses, software subscriptions, and business solutions. Secure payments, instant delivery, and trusted support worldwide.";

export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export const signInDefaultValues = {
  email: "",
  password: "",
};

export const signUpDefaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const socialProviders = [
  {
    provider: "google",
    label: "Google",
    Icon: FaGoogle,
    color: "#EA4335",
  },
  {
    provider: "facebook",
    label: "Facebook",
    Icon: FaFacebook,
    color: "#1877F2",
  },
  {
    provider: "twitter",
    label: "Twitter",
    Icon: FaXTwitter,
    color: "#000000",
  },
];

export const trustBadges = ["SSL secured", "Encrypted", "GDPR compliant"];

export const shippingAddressDefaultValues = {
  fullName: "",
  email: "",
  country: "",
};

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(", ")
  : ["PayPal", "Stripe"];

export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || PAYMENT_METHODS[0];
