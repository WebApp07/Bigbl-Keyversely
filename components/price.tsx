"use client";

import { useCurrency } from "@/lib/currency/client";
import { cn } from "@/lib/utils";
import type { FormattableAmount } from "@/lib/currency/format";

/**
 * Reusable price display. The `value` is expected to be in the base (stored)
 * currency; it is converted to the user's active currency using the cached
 * exchange rates provided by the server. Use this everywhere a store price is
 * shown so currency handling is never duplicated in pages/components.
 */
export default function Price({
  value,
  className,
}: {
  value: FormattableAmount;
  className?: string;
}) {
  const { format } = useCurrency();
  return <span className={cn("whitespace-nowrap", className)}>{format(value)}</span>;
}