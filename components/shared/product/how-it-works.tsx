import { stepsHowItWorks } from "@/lib/constants";

export default function HowItWorks() {
  return (
    <section className="container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">How Does Bigbl Work?</h2>

        <p className="mt-4 text-muted-foreground">
          Purchase genuine software licenses in minutes with instant digital
          delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stepsHowItWorks.map((step) => (
          <div
            key={step.title}
            className="rounded-2xl border bg-card p-6 text-center transition-all hover:shadow-md"
          >
            <div className="flex justify-center mb-4">
              <step.icon className="w-10 h-10 text-primary" />
            </div>

            <h3 className="font-semibold text-lg mb-2">{step.title}</h3>

            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
