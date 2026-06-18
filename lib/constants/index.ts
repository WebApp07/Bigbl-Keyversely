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

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "KEYVERSELY LLC";
export const APP_DESCRIPTION =
  process.env.PUBLIC_APP_DESCRIPTION ||
  " Keyversely LLC is an authorized Microsoft and Adobe partner providing genuine digital licenses, software subscriptions, and business solutions. Secure payments, instant delivery, and trusted support worldwide.";

export const APP_COMPANY_ADDRESS =
  process.env.NEXT_PUBLIC_COMPANY_ADDRESS ||
  "63 N Burritt Ave Rm 100 PMB 1180, Buffalo, Wyoming 82834 USA";

export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export const APP_EMAIL_SUPPORT =
  process.env.NEXT_PUBLIC_APP_EMAIL_ADDRESS || "support@keyversely.com";

export const APP_PHONE_NUMBER =
  process.env.NEXT_PUBLIC_APP_PHONE_NUMBER || "+1 (307) 785-6160";

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
  { label: "LLC via Bizee", icon: "ti-building" },
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
import { Mood, Order } from "@/types";

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

export const shippingPriceForNow = 0;

export const logosPartners = [
  { name: "Microsoft", src: "/images/partners/microsoft-logo.svg" },
  { name: "Google", src: "/images/partners/google.svg" },
  { name: "Stripe", src: "/images/partners/stripe.svg" },
  { name: "PayPal", src: "/images/partners/paypal.svg" },
  { name: "Bizee", src: "/images/partners/bizee.svg" },
];

export const contactInfo = [
  { icon: "ti-mail", text: "support@keyversely.com" },
  { icon: "ti-clock", text: "Response within 30 min" },
  { icon: "ti-shield-check", text: "Secure & confidential" },
];

export const subjects = [
  "License activation issue",
  "Order not received",
  "Wrong product key",
  "Refund request",
  "Technical support",
  "Other",
];

export const faqs = [
  {
    q: "How do I receive my license key after purchase?",
    a: "Your license key is delivered instantly to your email address after payment is confirmed. Check your spam folder if you don't see it within a few minutes.",
  },
  {
    q: "Are your Microsoft license keys genuine?",
    a: "Yes. All keys are 100% authentic and sourced through legitimate distribution channels. They activate directly through Microsoft's official activation servers.",
  },
  {
    q: "What if my key doesn't work?",
    a: "Contact us immediately with your order number and a screenshot of the error. We'll provide a replacement key or a full refund within our 30-day guarantee window.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "We accept PayPal, Stripe, Visa, Mastercard, and American Express. All payments are processed securely and are PCI compliant.",
  },
  {
    q: "Can I use the license on multiple devices?",
    a: "It depends on the license type. Most Windows Home and Pro keys are single-device licenses. Office 365 subscriptions support multiple devices. The product page always specifies the number of supported devices.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes. We offer a 30-day refund or replacement guarantee. If your key doesn't activate and we can't resolve it, you'll receive a full refund — no questions asked.",
  },
  {
    q: "Is Keyversely an official Microsoft partner?",
    a: "Keyversely LLC operates as an independent third-party reseller and is not directly affiliated with Microsoft Corporation. All licenses are genuine and activate through Microsoft's official servers.",
  },
];

export const tags = [
  "Product quality",
  "Delivery speed",
  "Customer support",
  "Pricing",
  "Website experience",
  "Activation process",
] as const;

export const MOODS = [
  {
    type: "positive",
    icon: "ti-mood-smile",
    color: "text-emerald-500",
    label: "Positive",
  },
  {
    type: "neutral",
    icon: "ti-mood-neutral",
    color: "text-amber-500",
    label: "Neutral",
  },
  {
    type: "negative",
    icon: "ti-mood-sad",
    color: "text-red-500",
    label: "Negative",
  },
] as const;

export const RATING_SCALE = [1, 2, 3, 4, 5] as const;

export const moods: {
  type: Mood;
  icon: string;
  color: string;
  label: string;
}[] = [
  {
    type: "positive",
    icon: "ti-mood-smile",
    color: "text-emerald-500",
    label: "Positive",
  },
  {
    type: "neutral",
    icon: "ti-mood-neutral",
    color: "text-amber-500",
    label: "Neutral",
  },
  {
    type: "negative",
    icon: "ti-mood-sad",
    color: "text-red-500",
    label: "Negative",
  },
];

export const moodOptions = [
  { value: "great", label: "😊 Great", color: "text-emerald-500" },
  { value: "good", label: "🙂 Good", color: "text-emerald-500" },
  { value: "okay", label: "😐 Okay", color: "text-amber-500" },
  { value: "bad", label: "🙁 Bad", color: "text-orange-500" },
  { value: "terrible", label: "😞 Terrible", color: "text-red-500" },
];

export const commonTags = [
  "User Experience",
  "Bug Report",
  "Feature Request",
  "Performance",
  "UI/Design",
  "Support",
];

export const quickContactOptions = [
  { label: "support@keyversely.com" },
  { label: "Avg. response: 30 minutes" },
  { label: "Secure & confidential" },
];

export const TIMELINE_STEPS = [
  {
    key: "placed",
    label: "Order Placed",
    description: "We received your order.",
    getTimestamp: (order: Order) => order.createdAt,
    isComplete: () => true,
  },
  {
    key: "paid",
    label: "Payment Confirmed",
    description: "Your payment was processed successfully.",
    getTimestamp: (order: Order) => order.paidAt,
    isComplete: (order: Order) => order.isPaid,
  },
  {
    key: "processing",
    label: "Processing",
    description: "Your digital product is being prepared.",
    getTimestamp: (order: Order) => order.paidAt,
    isComplete: (order: Order) => order.isPaid,
  },
  {
    key: "delivered",
    label: "Delivered",
    description: "Access details sent to your email.",
    getTimestamp: (order: Order) => order.deliveredAt,
    isComplete: (order: Order) => order.isDelivered,
  },
];
