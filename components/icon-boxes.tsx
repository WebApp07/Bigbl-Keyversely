import { Card, CardContent } from "./ui/card";
import { items } from "@/lib/constants";

const IconBoxes = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="h-px w-10 bg-border" />
          <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            Why choose us
          </span>
          <span className="h-px w-10 bg-border" />
        </div>

        <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
          Why thousands choose Keyversely
        </h2>

        <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Genuine software licenses, secure payments, and instant digital
          delivery backed by real customer support.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
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
