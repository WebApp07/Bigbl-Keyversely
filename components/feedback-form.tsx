"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { commonTags, moodOptions } from "@/lib/constants";

const feedbackSchema = z.object({
  mood: z.enum(["great", "good", "okay", "bad", "terrible"]),
  rating: z.number().int().min(1).max(5),
  tags: z.array(z.string()).optional(),
  message: z.string().max(500).optional(),
});

export default function FeedbackForm() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: { rating: 5, tags: [] },
  });

  const selectedMood = watch("mood");

  const onSubmit = async (data: FeedbackFormData) => {
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, tags: selectedTags }),
      });

      if (res.ok) {
        setSubmitted(true);
        reset();
        setSelectedTags([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-7">
      <h3 className="font-semibold text-lg text-foreground mb-1">
        How was your experience?
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        Your feedback helps us improve Keyversely
      </p>

      {submitted ? (
        <div className="text-center py-8">
          <i className="ti ti-circle-check text-5xl text-emerald-500 mb-4" />
          <p className="font-medium text-lg">Thank you!</p>
          <p className="text-muted-foreground mt-2">
            Your feedback has been received.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 text-blue-600 hover:underline text-sm"
          >
            Give more feedback
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Mood Selection */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              How do you feel?
            </label>
            <div className="grid grid-cols-5 gap-2">
              {moodOptions.map(({ value, label, color }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setValue("mood", value as any)}
                  className={`p-3 rounded-xl border text-center transition-all hover:scale-105 ${
                    selectedMood === value
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                      : "border-border hover:border-blue-200"
                  }`}
                >
                  <div className={`text-2xl mb-1 ${color}`}>
                    {label.split(" ")[0]}
                  </div>
                  <div className="text-xs">{label.split(" ")[1]}</div>
                </button>
              ))}
            </div>
            {errors.mood && (
              <p className="text-red-500 text-xs mt-1">{errors.mood.message}</p>
            )}
          </div>

          {/* Rating */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Rating (1-5)
            </label>
            <input
              type="range"
              min="1"
              max="5"
              {...register("rating", { valueAsNumber: true })}
              className="w-full accent-blue-600"
            />
            <div className="text-center text-sm font-medium mt-1">
              {watch("rating")} / 5
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              What should we improve?
            </label>
            <div className="flex flex-wrap gap-2">
              {commonTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    if (selectedTags.includes(tag)) {
                      setSelectedTags(selectedTags.filter((t) => t !== tag));
                    } else {
                      setSelectedTags([...selectedTags, tag]);
                    }
                  }}
                  className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${
                    selectedTags.includes(tag)
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-border hover:bg-accent"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="text-sm font-medium text-foreground mb-2 block"
            >
              Additional comments (optional)
            </label>
            <textarea
              {...register("message")}
              id="message"
              rows={3}
              placeholder="Anything else you'd like us to know?"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm resize-y min-h-[100px]"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-medium rounded-lg transition-colors"
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      )}
    </div>
  );
}
