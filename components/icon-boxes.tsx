import { ShieldCheck, RefreshCcw, Zap, Headset } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const IconBoxes = () => {
  return (
    <div>
      <Card>
        <CardContent className="grid md:grid-cols-4 gap-4 p-4">
          <div className="space-y-2">
            <Zap className="w-6 h-6 text-yellow-500" />
            <div className="text-sm font-bold">Instant Delivery</div>
            <div className="text-sm text-muted-foreground">
              License key sent to your email within seconds
            </div>
          </div>
          <div className="space-y-2">
            <ShieldCheck className="w-6 h-6 text-green-500" />
            <div className="text-sm font-bold">Genuine Keys</div>
            <div className="text-sm text-muted-foreground">
              100% authentic, Microsoft-verified licenses
            </div>
          </div>
          <div className="space-y-2">
            <RefreshCcw className="w-6 h-6 text-blue-500" />
            <div className="text-sm font-bold">30-Day Guarantee</div>
            <div className="text-sm text-muted-foreground">
              Full refund or replacement if your key fails
            </div>
          </div>
          <div className="space-y-2">
            <Headset className="w-6 h-6 text-purple-500" />
            <div className="text-sm font-bold">24/7 Support</div>
            <div className="text-sm text-muted-foreground">
              Activation help available any time
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IconBoxes;
