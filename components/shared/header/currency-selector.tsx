"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleDollarSign } from "lucide-react";
import {
  currencies,
  currencyDisplayLabel,
  type CurrencyCode,
} from "@/lib/i18n/currencies";
import { useCurrency } from "@/lib/currency/client";
import { cn } from "@/lib/utils";

const CurrencySelector = ({ className }: { className?: string }) => {
  const { currency, setCurrency } = useCurrency();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "focus-visible:ring-0 focus-visible:ring-offset-0",
            className,
          )}
          aria-label="Select currency"
        >
          <CircleDollarSign className="h-4 w-4" />
          <span className="uppercase text-xs font-semibold">{currency}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Currency</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {currencies.map((c) => (
          <DropdownMenuCheckboxItem
            key={c.code}
            checked={currency === c.code}
            onSelect={() => setCurrency(c.code as CurrencyCode)}
          >
            <span className="mr-2 font-semibold">{c.code}</span>
            {currencyDisplayLabel(c.code)}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencySelector;