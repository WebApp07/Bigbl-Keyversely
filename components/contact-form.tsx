"use client";

import { subjects } from "@/lib/constants";
import { contactSchema } from "@/lib/validators";
import { ContactFormData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useI18n } from "@/lib/i18n/client";

export default function ContactForm() {
  const { t } = useI18n();
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
          : "Something went wrong. Please try again or email us directly at support@getkeyversely.com",
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
          {t("contact.contactForm")}
        </span>
        <span className="h-px w-8 bg-border" />
      </div>

      <h2 className="text-lg font-medium text-foreground text-center mb-1">
        {t("contact.sendMessage")}
      </h2>

      {!submitted && (
        <p className="text-muted-foreground text-center mb-8 max-w-md mx-auto">
          {t("contact.formDescription")}
        </p>
      )}

      {submitted ? (
        <div className="text-center py-8">
          <i
            className="ti ti-circle-check text-4xl text-emerald-500 block mb-3"
            aria-hidden="true"
          />
          <p className="font-medium text-foreground">
            {t("contact.sentSuccess")}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {t("contact.sentDescription")}
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            {t("contact.sendAnother")}
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
                {t("contact.fullName")}
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
                {t("contact.emailAddress")}
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
                {t("contact.orderNumber")}{" "}
                <span className="text-muted-foreground/60 font-normal">
                  {t("contact.optional")}
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
{t("contact.subject")}
              </label>
              <select
                {...register("subject")}
                id="subject"
                className="h-9 rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="" disabled>
                  {t("contact.selectSubject")}
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
              {t("contact.message")}
            </label>
            <textarea
              {...register("message")}
              id="message"
              rows={4}
              placeholder={t("contact.messagePlaceholder")}
              className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-y"
            />
            {errors.message && (
              <p className="text-xs text-red-500">{errors.message.message}</p>
            )}
          </div>

          {/* File Upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              {t("contact.attachment")}{" "}
              <span className="text-muted-foreground/60 font-normal">
                {t("contact.attachmentHint")}
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
                  {t("contact.clickToUpload")}
                </span>{" "}
                {t("contact.orDragDrop")}
              </span>
              <span className="text-xs text-muted-foreground/60">
                {t("contact.fileTypes")}
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
                {t("contact.sending")}
              </>
            ) : (
              <>
                <i className="ti ti-send text-sm" aria-hidden="true" />
                {t("contact.sendMessageButton")}
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
