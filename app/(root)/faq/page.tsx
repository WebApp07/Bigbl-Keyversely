import FaqClient from "./faq-client";

export const metadata = {
  title: "FAQ – Frequently Asked Questions",
  description:
    "Find answers to common questions about orders, product keys, security, and support at Digitlogs.",
};

export default function FaqPage() {
  return <FaqClient />;
}
