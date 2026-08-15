"use client";

import { cn } from "@/lib/utils";
import { useCurrency } from "@/lib/currency/client";

/**
 * Styled product price: renders the currency symbol / cents in a smaller
 * superscript style while the integer part stays large. Uses Intl parts so
 * symbol placement stays correct for every currency/locale.
 */
const ProductPrice = ({
  value,
  className,
}: {
  value: number | string;
  className?: string;
}) => {
  const { formatParts } = useCurrency();
  const parts = formatParts(value);

  if (!parts) return <p className={cn("text-2xl", className)}>NaN</p>;

  return (
    <p className={cn("text-2xl", className)}>
      {parts.map((part, index) => {
        const small =
          part.type === "currency" || part.type === "fraction";
        return (
          <span
            key={index}
            className={small ? "text-sm align-super" : undefined}
          >
            {part.value}
          </span>
        );
      })}
    </p>
  );
};

export default ProductPrice;