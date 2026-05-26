"use client";

import { productDefaultValues } from "@/lib/constants";
import { insertProductSchema, updateProductSchema } from "@/lib/validators";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

import slugify from "slugify";
import { createProduct, updateProduct } from "@/lib/actions/product.actions";
import { toast } from "sonner";

const ProductForm = ({
  type,
  product,
  productId,
}: {
  type: "create" | "update";
  product?: Product;
  productId?: string;
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof insertProductSchema>>({
    resolver:
      type === "update"
        ? zodResolver(updateProductSchema)
        : zodResolver(insertProductSchema),
    defaultValues:
      product && type === "update" ? product : productDefaultValues,
  });

  const onSubmit: SubmitHandler<z.infer<typeof insertProductSchema>> = async (
    values,
  ) => {
    // On Create
    if (type === "create") {
      const res = await createProduct(values);
      console.log("Response:", res); // Add this

      if (!res.success) {
        toast.error(res.message || "Failed to create product");
      } else {
        toast.success(res.message || "Product created successfully");
      }
      router.push("/admin/products");
    }
    // On Update
    if (type === "update") {
      if (!productId) {
        router.push("/admin/products");
        return;
      }
      const res = await updateProduct({ ...values, id: productId });

      if (!res.success) {
        toast.error(res.message || "Failed to update product");
      } else {
        toast.success(res.message || "Product updated successfully");
      }
      router.push("/admin/products");
    }
  };

  return (
    <Form {...form}>
      <form
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div className="flex flex-col md:flex-row gap-5">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Slug */}

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Enter slug" {...field} />
                    <Button
                      type="button"
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 mt-2"
                      onClick={() => {
                        form.setValue(
                          "slug",
                          slugify(form.getValues("name"), { lower: true }),
                        );
                      }}
                    >
                      Generate
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Brand */}
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder="Enter brand" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Stock */}
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product stock" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="upload-field flex-col md:flex-row gap-5">
          {/* Images */}
        </div>
        <div className="upload-field">{/* isFeatured */}</div>
        <div>
          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter product description"
                    className="resize-none min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Features */}
          <FormField
            control={form.control}
            name="features"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Features</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={`Enter product features (one per line)`}
                    className="resize-none min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* FAQs */}
          <FormField
            control={form.control}
            name="faqs"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Faqs</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={`Enter frequently asked questions`}
                    className="resize-none min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          {/* Submit*/}
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="button col-span-2 w-full"
          >
            {form.formState.isSubmitting
              ? type === "create"
                ? "Creating..."
                : "Updating..."
              : type === "create"
                ? "Create Product"
                : "Update Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
