import { ShoppingCart, CreditCard, Mail, Key } from "lucide-react";
import { getT } from "@/lib/i18n/server";

export default async function HowItWorks() {
  const t = await getT();

  const steps = [
    {
      icon: ShoppingCart,
      title: t("home.steps.chooseProduct"),
      description: t("home.steps.chooseProductDescription"),
    },
    {
      icon: CreditCard,
      title: t("home.steps.secureCheckout"),
      description: t("home.steps.secureCheckoutDescription"),
    },
    {
      icon: Mail,
      title: t("home.steps.instantDelivery"),
      description: t("home.steps.instantDeliveryDescription"),
    },
    {
      icon: Key,
      title: t("home.steps.activateEnjoy"),
      description: t("home.steps.activateEnjoyDescription"),
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="h-px w-10 bg-border" />
          <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            {t("home.howItWorks")}
          </span>
          <span className="h-px w-10 bg-border" />
        </div>

        <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
          {t("home.howItWorksTitle")}
        </h2>

        <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {t("home.howItWorksDescription")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="rounded-2xl border border-border bg-card p-6 transition-colors duration-200 hover:border-border/80 hover:bg-accent/40"
          >
            {/* Step number */}
            <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center mb-4">
              <span className="text-[11px] font-medium text-blue-600 dark:text-blue-400">
                {index + 1}
              </span>
            </div>

            {/* Icon */}
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center mb-4">
              <step.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>

            <h3 className="font-medium text-sm text-foreground mb-1.5">
              {step.title}
            </h3>

            <p className="text-xs text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}