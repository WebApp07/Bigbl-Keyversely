import { ShieldCheck, Zap, Globe, TrendingDown } from "lucide-react";

const reasons = [
  {
    icon: TrendingDown,
    title: "Volume Licensing",
    description:
      "We purchase licenses in large quantities from authorized distributors, allowing us to negotiate significant discounts that we pass directly to you.",
  },
  {
    icon: Zap,
    title: "Zero Physical Overhead",
    description:
      "As a digital-only retailer, we eliminate costs associated with physical stores, warehouses, packaging, and shipping, significantly reducing the final price.",
  },
  {
    icon: Globe,
    title: "Global Sourcing",
    description:
      "We source genuine licenses from markets where prices are more competitive, ensuring you get the best value regardless of your location.",
  },
  {
    icon: ShieldCheck,
    title: "Direct-to-Consumer",
    description:
      "By cutting out middle-men and traditional retail markups, we ensure you receive genuine software at the lowest possible market price.",
  },
];

export default function PriceExplanation() {
  return (
    <section className="container mx-auto px-4 py-16 bg-blue-50/50 dark:bg-blue-950/10 rounded-3xl my-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="h-px w-10 bg-blue-200 dark:bg-blue-800" />
          <span className="text-[11px] font-medium uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Fair Pricing
          </span>
          <span className="h-px w-10 bg-blue-200 dark:bg-blue-800" />
        </div>

        <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
          How can we sell so cheap?
        </h2>

        <p className="mt-4 text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Many customers wonder how our prices can be up to 70-90% lower than
          traditional retail. The answer is simple and 100% legal.
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
          100% Legal & Genuine Microsoft Verified Licenses
        </div>
      </div>
    </section>
  );
}
