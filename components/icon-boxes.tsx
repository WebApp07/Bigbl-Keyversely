import { Card, CardContent } from "./ui/card";
import { getT } from "@/lib/i18n/server";
import { Zap, ShieldCheck, RefreshCcw, Headset } from "lucide-react";

const IconBoxes = async () => {
  const t = await getT();
  const features = [
    {
      icon: Zap,
      title: t("home.features.instantDelivery"),
      description: t("home.featureDescriptions.instantDelivery"),
    },
    {
      icon: ShieldCheck,
      title: t("home.features.genuineKeys"),
      description: t("home.featureDescriptions.genuineKeys"),
    },
    {
      icon: RefreshCcw,
      title: t("home.features.guarantee"),
      description: t("home.featureDescriptions.guarantee"),
    },
    {
      icon: Headset,
      title: t("home.features.support"),
      description: t("home.featureDescriptions.support"),
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="h-px w-10 bg-border" />
          <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            {t("home.whyChooseUs")}
          </span>
          <span className="h-px w-10 bg-border" />
        </div>

        <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
          {t("home.whyChooseUsTitle")}
        </h2>

        <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {t("home.whyChooseUsDescription")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((item) => (
          <Card
            key={item.title}
            className="group border-border bg-card transition-colors duration-200 hover:border-border/80 hover:bg-accent/40"
          >
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>

              <h3 className="font-medium text-sm text-foreground mb-1.5">
                {item.title}
              </h3>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default IconBoxes;