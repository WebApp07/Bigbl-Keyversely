import { Card, CardContent } from "./ui/card";
import { items } from "@/lib/constants";

const IconBoxes = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">
          Why Thousands of Customers Choose Bigbl
        </h2>

        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Trusted by customers worldwide for genuine software licenses, secure
          payments, and instant digital delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <Card
            key={item.title}
            className="transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <CardContent className="p-6 text-center">
              <item.icon className={`w-10 h-10 mx-auto mb-4 ${item.color}`} />

              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>

              <p className="text-sm text-muted-foreground">
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
