import { stepsHowItWorks } from "@/lib/constants";

export default function HowItWorks() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="h-px w-10 bg-border" />
          <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            How it works
          </span>
          <span className="h-px w-10 bg-border" />
        </div>

        <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
          Get your key in 4 simple steps
        </h2>

        <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Purchase genuine software licenses in minutes with instant digital
          delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stepsHowItWorks.map((step, index) => (
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
