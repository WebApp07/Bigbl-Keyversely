import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { Prisma } from "@prisma/client";
import { formatCurrency as formatCurrencyWith } from "@/lib/currency/format";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Type for values that can be formatted
type FormattableValue = number | string | null | undefined | Prisma.Decimal;

// Helper to convert any format to number
function toNumber(value: FormattableValue): number | null {
  if (value === null || value === undefined) return null;
  if (value instanceof Prisma.Decimal) return value.toNumber();
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value);
  return null;
}

// Convert Prisma object into a regular JS object
export function convertToPlainObject(value: unknown) {
  return JSON.parse(
    JSON.stringify(value, (_, v) =>
      v instanceof Prisma.Decimal ? v.toString() : v,
    ),
  );
}

// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}

// Format errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any) {
  if (error.name === "ZodError") {
    const fieldErrors = Object.keys(error.errors).map(
      (field) => error.errors[field].message,
    );

    return fieldErrors.join(". ");
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    const field = error.meta?.target ? error.meta.target[0] : "Field";

    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  } else {
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }
}

// Round number to 2 decimal places
export function round2(value: number | string | Prisma.Decimal) {
  const num = toNumber(value);
  if (num === null)
    throw new Error("Value is not a number or string or Decimal");
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

// Format currency (base currency / en-US by default — used by admin & email,
// where stored amounts are always displayed in the canonical base currency).
export function formatCurrency(amount: FormattableValue) {
  return formatCurrencyWith(amount);
}

// Format Number
const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");

export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number);
}

// Shorten UUID
export function formatId(id: string) {
  return `..${id.substring(id.length - 6)}`;
}

// Format date and times
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    year: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    year: "numeric",
    day: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDateTime = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions,
  );

  const formattedDate = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions,
  );

  const formattedTime = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions,
  );

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

// Form pagination links
export function formUrlQuery({
  params,
  key,
  value,
}: {
  params: string;
  key: string;
  value: string | null;
}) {
  const query = qs.parse(params);

  query[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query,
    },
    {
      skipNull: true,
    },
  );
}
