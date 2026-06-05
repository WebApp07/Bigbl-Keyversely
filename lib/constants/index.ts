import { FaFacebook, FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  Shield,
  Truck,
  Clock,
  Award,
  Zap,
  Lock,
  LucideIcon,
  Check,
  BadgeCheck,
  ShoppingCart,
  CreditCard,
  Mail,
  Key,
  Headset,
  RefreshCcw,
} from "lucide-react";
import { ElementType } from "react";

type Badge = {
  label: string;
  icon: ElementType;
  color: string;
};

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

export const items = [
  {
    icon: Zap,
    color: "text-yellow-500",
    title: "Instant Delivery",
    description: "License key sent to your email within seconds",
  },
  {
    icon: ShieldCheck,
    color: "text-green-500",
    title: "Genuine Keys",
    description: "100% authentic, Microsoft-verified licenses",
  },
  {
    icon: RefreshCcw,
    color: "text-blue-500",
    title: "30-Day Guarantee",
    description: "Full refund or replacement if your key fails",
  },
  {
    icon: Headset,
    color: "text-purple-500",
    title: "24/7 Support",
    description: "Activation help available any time",
  },
];

export const trustBadges = [
  { label: "SSL secured", icon: "Lock", color: "text-green-500" },
  { label: "Encrypted", icon: "Lock", color: "text-blue-500" },
  { label: "GDPR compliant", icon: "Shield", color: "text-purple-500" },
];

export const trustBadgesProducts: Badge[] = [
  { label: "Genuine License", icon: Check, color: "text-yellow-500" },
  { label: "Secure Payments", icon: Shield, color: "text-green-500" },
  { label: "Instant Delivery", icon: Truck, color: "text-blue-500" },
  { label: "24/7 Support", icon: Clock, color: "text-orange-500" },
  { label: "1 Year Warranty", icon: Award, color: "text-purple-500" },
  {
    label: "Microsoft Certified Partner",
    icon: BadgeCheck,
    color: "text-blue-600",
  },
];

export const shippingAddressDefaultValues = {
  fullName: "",
  email: "",
  country: "",
};

import { ShieldCheck } from "lucide-react";

export const productTrustBadges = [
  {
    icon: ShieldCheck,
    label: "Guaranteed Safe Checkout",
    color: "text-green-500",
  },
  {
    icon: Lock,
    label: "SSL Secured",
    color: "text-blue-500",
  },
  {
    icon: Zap,
    label: "Instant Digital Delivery",
    color: "text-yellow-500",
  },
];

export const paymentMethodsIcons = [
  {
    name: "PayPal",
    image: "../images/methods-payments/PayPal.svg",
  },
  {
    name: "Visa",
    image: "../images/methods-payments/visa.svg",
  },
  {
    name: "Mastercard",
    image: "../images/methods-payments/MasterCard.svg",
  },
  {
    name: "Discover Bank",
    image: "../images/methods-payments/discover.svg",
  },
  {
    name: "Stripe",
    image: "../images/methods-payments/stripe.svg",
  },
];

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(", ")
  : ["PayPal", "Stripe"];

export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || PAYMENT_METHODS[0];

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 12;

export const productDefaultValues = {
  name: "",
  slug: "",
  category: "",
  images: [],
  brand: "",
  description: "",
  features: "",
  faqs: "",
  price: "0",
  stock: 0,
  rating: "0",
  numReviews: "0",
  isFeatured: false,
  banner: null,
};

export const USER_ROLES = process.env.USER_ROLES
  ? process.env.USER_ROLES.split(", ")
  : ["admin", "user"];

export const reviewFormDefaultValues = {
  title: "",
  comment: "",
  rating: 0,
};

export const SENDER_EMAIL = process.env.SENDER_EMAIL || "onboarding@resend.dev";

export const iconMap: Record<string, LucideIcon> = {
  Shield,
  Truck,
  Clock,
  Award,
  Zap,
  Lock,
};

export const stepsHowItWorks = [
  {
    icon: ShoppingCart,
    title: "1. Choose Your Product",
    description:
      "Browse our catalog and select the software or digital product you need.",
  },
  {
    icon: CreditCard,
    title: "2. Secure Checkout",
    description:
      "Pay safely using PayPal, Stripe, Visa, Mastercard, or other supported methods.",
  },
  {
    icon: Mail,
    title: "3. Instant Delivery",
    description:
      "Your order is processed automatically and delivered directly to your email.",
  },
  {
    icon: Key,
    title: "4. Activate & Enjoy",
    description:
      "Use your license key or download link immediately after purchase.",
  },
];
