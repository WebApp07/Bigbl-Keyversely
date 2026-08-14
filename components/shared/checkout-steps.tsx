import { cn } from "@/lib/utils";
import React from "react";
import { getT } from "@/lib/i18n/server";

const CheckoutSteps = async ({ current = 0 }) => {
  const t = await getT();
  const steps = [
    t("checkout.stepLogin"),
    t("checkout.stepShipping"),
    t("checkout.stepPayment"),
    t("checkout.stepPlaceOrder"),
  ];
  return (
    <div className="flex-between flex-col md:flex-row space-x-2 space-y-2 mb-10">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div
            className={cn(
              "p-2 w-56 rounded-full text-center text-sm",
              index === current ? "bg-secondary" : "",
            )}
          >
            {step}
          </div>
          {step !== t("checkout.stepPlaceOrder") && (
            <hr className="w-16 border-t border-gray-300 mx-2" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CheckoutSteps;