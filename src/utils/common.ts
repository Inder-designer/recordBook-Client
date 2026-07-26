import { IEntry } from "@/types/IEntry";
import { IRecordSummary, MemberRole } from "@/types/IRecord";

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-in", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const capitalizeWords = (text?: string) =>
  text
    ?.trim()
    .split(/\s+/)
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase()
    )
    .join(" ") ?? "";

export const updateSummary = (
  summary: IRecordSummary,
  entry: IEntry,
  multiplier: 1 | -1
) => {
  summary.totalTransactions += multiplier;

  if (entry.type === "cashIn") {
    summary.totalCashIn += Number(entry.amount) * multiplier;
    summary.currentBalance += Number(entry.amount) * multiplier;
  } else {
    summary.totalCashOut += Number(entry.amount) * multiplier;
    summary.currentBalance -= Number(entry.amount) * multiplier;
  }
};

export const hasRole = (
  role: MemberRole | undefined,
  ...allowedRoles: MemberRole[]
) => {
  return !!role && allowedRoles.includes(role);
};

export const isOwner = (role?: MemberRole) =>
  role === MemberRole.OWNER;

export const isAdmin = (role?: MemberRole) =>
  role === MemberRole.ADMIN;

export const isOwnerOrAdmin = (role?: MemberRole) =>
  hasRole(role, MemberRole.OWNER, MemberRole.ADMIN);

export const canManageEntries = (role?: MemberRole) =>
  hasRole(
    role,
    MemberRole.OWNER,
    MemberRole.ADMIN,
    MemberRole.EDITOR
  );

export const MEMBER_ROLE_LABEL: Record<MemberRole, string> = {
  [MemberRole.OWNER]: "Owner",
  [MemberRole.ADMIN]: "Admin",
  [MemberRole.EDITOR]: "Data Operator",
  [MemberRole.VIEWER]: "Viewer",
};

export const initialsGenerate = (fullName?: string): string => {
  if (!fullName) return "";
  const words = fullName.trim().split(/\s+/);

  if (words.length >= 2) {
    // Two or more words -> First letter of first and second word
    return (
      words[0].charAt(0) + words[1].charAt(0)
    ).toUpperCase();
  }
  return words[0].slice(0, 2).toUpperCase();
};

import {
  addDays,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
} from "date-fns";
import { DateRange } from "react-day-picker";

export const presets = [
  {
    label: "Today",
    getRange: (): DateRange => ({
      from: startOfDay(new Date()),
      to: endOfDay(new Date()),
    }),
  },
  {
    label: "Yesterday",
    getRange: (): DateRange => {
      const date = subDays(new Date(), 1);

      return {
        from: startOfDay(date),
        to: endOfDay(date),
      };
    },
  },
  {
    label: "This Week",
    getRange: (): DateRange => ({
      from: startOfWeek(new Date()),
      to: endOfWeek(new Date()),
    }),
  },
  // {
  //   label: "Last 7 Days",
  //   getRange: (): DateRange => ({
  //     from: startOfDay(subDays(new Date(), 6)),
  //     to: endOfDay(new Date()),
  //   }),
  // },
  {
    label: "This Month",
    getRange: (): DateRange => ({
      from: startOfMonth(new Date()),
      to: endOfMonth(new Date()),
    }),
  },
  {
    label: "Last Month",
    getRange: (): DateRange => {
      const lastMonth = subMonths(new Date(), 1);

      return {
        from: startOfMonth(lastMonth),
        to: endOfMonth(lastMonth),
      };
    },
  },
  // {
  //   label: "This Year",
  //   getRange: (): DateRange => ({
  //     from: startOfYear(new Date()),
  //     to: endOfYear(new Date()),
  //   }),
  // },
  {
    label: "Custom Range",
    custom: true,
  },
];