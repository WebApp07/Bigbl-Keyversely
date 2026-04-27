"use client";

import { shippingAddressSchema } from "@/lib/validators";
import { ShippingAddress } from "@/types";
import { useRouter } from "next/navigation";
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { shippingAddressDefaultValues } from "@/lib/constants";
import { useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Loader, ShieldCheck, Zap, Undo2 } from "lucide-react";
import { updateUserAddress } from "@/lib/actions/user.actions";
import { toast } from "sonner";

const countries = [
  { code: "US", name: "United States" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "GB", name: "United Kingdom" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "OTHER", name: "Other" },
];

// 📌 This is the magic — clears input on first click
const ClearableInput = ({
  field,
  placeholder,
  type = "text",
}: {
  field: any;
  placeholder: string;
  type?: string;
}) => {
  const handleFocus = () => {
    if (field.value === "") {
      field.onChange(""); // keep it empty when focused from blank
    }
  };

  return (
    <Input
      type={type}
      placeholder={placeholder}
      className="h-11"
      {...field}
      onFocus={handleFocus}
      // When field is empty, show nothing (not even default value)
      value={field.value || ""}
    />
  );
};

const ShippingAddressForm = ({ address }: { address: ShippingAddress }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address || shippingAddressDefaultValues,
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<z.infer<typeof shippingAddressSchema>> = async (
    values: z.infer<typeof shippingAddressSchema>,
  ) => {
    startTransition(async () => {
      const res = await updateUserAddress(values);

      if (res.success) {
        toast.success("Address saved", {
          description: res.message || "Your shipping address has been saved.",
          duration: 4000,
        });
        router.push("/payment-method");
      } else {
        toast.error("Couldn't save address", {
          description: res.message || "Please try again.",
          duration: 5000,
        });
      }
    });
  };

  return (
    <div className="max-w-md mx-auto py-8 px-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Checkout</h1>
        <p className="text-lg font-semibold text-muted-foreground">
          Enter your details
        </p>
      </div>

      <Form {...form}>
        <form
          method="post"
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof shippingAddressSchema>,
                "fullName"
              >;
            }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Full name</FormLabel>
                <FormControl>
                  <ClearableInput field={field} placeholder="John Doe" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof shippingAddressSchema>,
                "email"
              >;
            }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Email address
                </FormLabel>
                <FormControl>
                  <ClearableInput
                    field={field}
                    type="email"
                    placeholder="you@example.com"
                  />
                </FormControl>
                <p className="text-xs text-muted-foreground mt-1">
                  Your download link will be sent here.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Country */}
          <FormField
            control={form.control}
            name="country"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof shippingAddressSchema>,
                "country"
              >;
            }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Country</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Required for tax calculation.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <ArrowRight className="w-4 h-4 mr-2" />
                Continue to Payment
              </>
            )}
          </Button>
        </form>
      </Form>

      {/* Trust signals */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-green-600" />
          <span>Secure 256-bit SSL encrypted checkout</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Zap className="h-4 w-4 text-yellow-500" />
          <span>Instant access after payment</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Undo2 className="h-4 w-4 text-blue-500" />
          <span>30-day money-back guarantee</span>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddressForm;
