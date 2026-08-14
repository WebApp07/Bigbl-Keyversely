import { ShieldCheck, Zap, Globe, TrendingDown } from "lucide-react";
import { getT } from "@/lib/i18n/server";

export default async function PriceExplanation() {
  const t = await getT();

  const reasons = [
    {
      icon: TrendingDown,
      title: t("home.pricingReasons.volumeLicensing"),
      description: t("home.pricingReasons.volumeLicensingDescription"),
    },
    {
      icon: Zap,
      title: t("home.pricingReasons.zeroOverhead"),
      description: t("home.pricingReasons.zeroOverheadDescription"),
    },
    {
      icon: Globe,
      title: t("home.pricingReasons.globalSourcing"),
      description: t("home.pricingReasons.globalSourcingDescription"),
    },
    {
      icon: ShieldCheck,
      title: t("home.pricingReasons.directToConsumer"),
      description: t("home.pricingReasons.directToConsumerDescription"),
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16 bg-blue-50/50 dark:bg-blue-950/10 rounded-3xl my-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="h-px w-10 bg-blue-200 dark:bg-blue-800" />
          <span className="text-[11px] font-medium uppercase tracking-widest text-blue-600 dark:text-blue-400">
            {t("home.fairPricing")}
          </span>
          <span className="h-px w-10 bg-blue-200 dark:bg-blue-800" />
        </div>

        <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
          {t("home.fairPricingTitle")}
        </h2>

        <p className="mt-4 text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {t("home.fairPricingDescription")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {reasons.map((reason) => (
          <div key={reason.title} className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white dark:bg-card border border-blue-100 dark:border-blue-900/50 flex items-center justify-center shadow-sm">
              <reason.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-base mb-1.5 tracking-tight">
                {reason.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-card border border-blue-100 dark:border-blue-900/50 text-xs font-medium text-blue-700 dark:text-blue-300 shadow-sm">
          <ShieldCheck className="w-4 h-4" />
          {t("home.fairPricingLegal")}
        </div>
      </div>
    </section>
  );
}