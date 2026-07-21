import { IEntry } from "@/types/IEntry";
import * as Yup from "yup";

export interface IEntryFormValues {
    type: "cashIn" | "cashOut";
    amount: number;
    remark: string;
    category: string;
    paymentMethod: "cash" | "bank" | "upi" | "card" | "cheque";
    transactionDate: string;
}

export const createEntryValidation = Yup.object({
    type: Yup.string()
        .oneOf(["cashIn", "cashOut"])
        .required("Transaction type is required"),

    amount: Yup.number()
        .typeError("Amount must be a number")
        .positive("Amount must be greater than 0")
        .required("Amount is required"),

    remark: Yup.string()
        .trim()
        .max(200, "Remark cannot exceed 200 characters"),

    category: Yup.string()
        .trim()
        .max(50, "Category cannot exceed 50 characters"),

    paymentMethod: Yup.string()
        .oneOf(["cash", "bank", "upi", "card", "cheque", "online"]),

    transactionDate: Yup.date()
        .required("Transaction date is required"),
});

const today = new Date();

const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
)
    .toISOString()
    .split("T")[0];

export const entryInitialValues = (
    type: "cashIn" | "cashOut",
    entry?: Partial<IEntry>
): IEntryFormValues => ({
    type: entry?.type ?? type,
    amount: entry?.amount ?? 0,
    remark: entry?.remark ?? "",
    category: entry?.category ?? "",
    paymentMethod: entry?.paymentMethod ?? "cash",
    transactionDate: entry?.transactionDate
        ? new Date(entry.transactionDate).toISOString().split("T")[0]
        : localDate,
});

