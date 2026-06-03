"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

// Always 7 days from first load — deal never goes stale
const getTargetDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d;
};

const TARGET_DATE = getTargetDate();

const calculateTimeRemaining = (targetDate: Date) => {
  const diff = Math.max(Number(targetDate) - Number(new Date()), 0);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
};

const DealCountdown = () => {
  const [time, setTime] = useState<ReturnType<typeof calculateTimeRemaining>>();

  useEffect(() => {
    setTime(calculateTimeRemaining(TARGET_DATE));
    const interval = setInterval(() => {
      setTime(calculateTimeRemaining(TARGET_DATE));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return (
    <section className="relative rounded-2xl overflow-hidden border border-border bg-card my-12">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left — copy */}
        <div className="flex flex-col justify-center gap-6 p-8 lg:p-12">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-xs font-semibold px-3 py-1 rounded-full border border-yellow-500/20">
              <Zap className="w-3 h-3" />
              Limited Time Offer
            </span>
          </div>

          <div>
            <h3 className="text-3xl lg:text-4xl font-bold leading-tight">
              Up to <span className="text-primary">67% off</span>
              <br />
              Microsoft Licenses
            </h3>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              Genuine Windows &amp; Office keys at unbeatable prices. Instant
              email delivery, Microsoft-verified, with a 30-day replacement
              guarantee.
            </p>
          </div>

          {/* Countdown */}
          <ul className="grid grid-cols-4 gap-2">
            <StatBox label="Days" value={time.days} />
            <StatBox label="Hours" value={time.hours} />
            <StatBox label="Mins" value={time.minutes} />
            <StatBox label="Secs" value={time.seconds} />
          </ul>

          <div>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/search">Grab the Deal</Link>
            </Button>
          </div>
        </div>

        {/* Right — visual */}
        <div className="hidden md:flex items-center justify-center bg-muted/30 p-8">
          <div className="text-center space-y-3">
            {/* Windows + Office pill logos */}
            <div className="flex items-center justify-center gap-4">
              {["Windows 11", "Office 2021", "Office 365"].map((label) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center gap-2 bg-card border border-border rounded-xl p-4 w-28 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-center leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Delivered instantly · Genuine keys · Lifetime activation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className="flex flex-col items-center justify-center bg-muted/50 rounded-xl p-3 border border-border">
    <span className="text-2xl font-bold tabular-nums">
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-xs text-muted-foreground mt-0.5">{label}</span>
  </li>
);

export default DealCountdown;
