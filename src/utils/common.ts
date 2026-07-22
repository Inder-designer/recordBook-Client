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
    summary.totalCashIn += entry.amount * multiplier;
    summary.currentBalance += entry.amount * multiplier;
  } else {
    summary.totalCashOut += entry.amount * multiplier;
    summary.currentBalance -= entry.amount * multiplier;
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
  [MemberRole.EDITOR]: "Editor",
  [MemberRole.VIEWER]: "Viewer",
};