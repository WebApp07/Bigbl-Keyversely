"use client";

import { subjects } from "@/lib/constants";
import { contactSchema } from "@/lib/validators";
import { ContactFormData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: "" },
  });

  async function onSubmit(data: ContactFormData) {
    setLoading(true);
    setServerError(null);

    try {
      let attachmentUrl: string | null = null;
      if (data.file && data.file.size > 0) {
        const uploadData = new FormData();
        uploadData.append("file", data.file);
        const uploadRes = await fetch("/api/contact/upload", {
          method: "POST",
          body: uploadData,
        });
        if (!uploadRes.ok) throw new Error("File upload failed");
        const { url } = await uploadRes.json();
        attachmentUrl = url;
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          order: data.order ?? null,
          subject: data.subject,
          message: data.message,
          attachmentUrl,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message ?? "Failed to send message");

      setSubmitted(true);
      reset();
      setFileName(null);
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email us directly at support@keyversely.com",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-7">
      <div className="flex items-center justify-center gap-3 mb-2">
        <span className="h-px w-8 bg-border" />
        <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          Contact form
        </span>
        <span className="h-px w-8 bg-border" />
      </div>

      <h2 className="text-lg font-medium text-foreground text-center mb-1">
        Send us a message
      </h2>

      {!submitted && (
        <p className="text-muted-foreground text-center mb-8 max-w-md mx-auto">
          Fill in the details below and we&apos;ll get back to you as soon as
          possible.
        </p>
      )}

      {submitted ? (
        <div className="text-center py-8">
          <i
            className="ti ti-circle-check text-4xl text-emerald-500 block mb-3"
            aria-hidden="true"
          />
          <p className="font-medium text-foreground">
            Message sent successfully!
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            We&apos;ll get back to you within 30 minutes.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-xs font-medium text-muted-foreground"
              >
                Full name
              </label>
              <input
                {...register("name")}
                id="name"
                type="text"
                placeholder="John Smith"
                className="h-9 rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-xs font-medium text-muted-foreground"
              >
                Email address
              </label>
              <input
                {...register("email")}
                id="email"
                type="email"
                placeholder="john@example.com"
                className="h-9 rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Order Number */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="order"
                className="text-xs font-medium text-muted-foreground"
              >
                Order number{" "}
                <span className="text-muted-foreground/60 font-normal">
                  (optional)
                </span>
              </label>
              <input
                {...register("order")}
                id="order"
                type="text"
                placeholder="e.g. ORD-00123"
                className="h-9 rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="subject"
                className="text-xs font-medium text-muted-foreground"
              >
                Subject
              </label>
              <select
                {...register("subject")}
                id="subject"
                className="h-9 rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="" disabled>
                  Select a subject
                </option>
                {subjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.subject && (
                <p className="text-xs text-red-500">{errors.subject.message}</p>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="message"
              className="text-xs font-medium text-muted-foreground"
            >
              Message
            </label>
            <textarea
              {...register("message")}
              id="message"
              rows={4}
              placeholder="Describe your issue in detail — the more info you provide, the faster we can help."
              className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-y"
            />
            {errors.message && (
              <p className="text-xs text-red-500">{errors.message.message}</p>
            )}
          </div>

          {/* File Upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Attachment{" "}
              <span className="text-muted-foreground/60 font-normal">
                (optional — screenshot, error, etc.)
              </span>
            </label>
            <label
              htmlFor="file"
              className="flex flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-border bg-background p-5 text-center cursor-pointer hover:bg-accent/40 transition-colors"
            >
              <i
                className="ti ti-upload text-2xl text-muted-foreground"
                aria-hidden="true"
              />
              <span className="text-sm text-muted-foreground">
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  Click to upload
                </span>{" "}
                or drag and drop
              </span>
              <span className="text-xs text-muted-foreground/60">
                PNG, JPG, PDF up to 10MB
              </span>
              {fileName && (
                <span className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  {fileName}
                </span>
              )}
            </label>
            <input
              id="file"
              type="file"
              accept=".png,.jpg,.jpeg,.pdf"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setFileName(file?.name ?? null);
                setValue("file", file);
              }}
            />
          </div>

          {serverError && (
            <p className="text-xs text-red-500 text-center">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white text-sm font-medium h-10 transition-colors"
          >
            {loading ? (
              <>
                <i
                  className="ti ti-loader-2 animate-spin text-sm"
                  aria-hidden="true"
                />
                Sending...
              </>
            ) : (
              <>
                <i className="ti ti-send text-sm" aria-hidden="true" />
                Send message
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
