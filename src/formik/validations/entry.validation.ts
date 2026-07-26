import { IEntry } from "@/types/IEntry";
import * as Yup from "yup";

export interface IEntryFormValues {
    type: "cashIn" | "cashOut";
    amount: string;
    remark: string;
    category: string;
    paymentMethod: "cash" | "bank" | "upi" | "card" | "cheque";
    transactionDate: string;
}

export const createEntryValidation = Yup.object({
    type: Yup.string()
        .oneOf(["cashIn", "cashOut"])
        .required("Transaction type is required"),

    amount: Yup.string()
        .matches(
            /^[0-9.+\-*/%]+$/,
            "Only numbers, decimal point and +, -, *, /, % are allowed"
        )
        .required("Amount is required"),

    remark: Yup.string()
        .trim()
        .max(150, "Remark cannot exceed 150 characters"),

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
const formatLocalDate = (date: string | Date) => {
    const d = new Date(date);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

export const entryInitialValues = (
    type: "cashIn" | "cashOut",
    entry?: Partial<IEntry>
): IEntryFormValues => ({
    type: entry?.type ?? type,
    amount: entry?.amount?.toString() ?? "",
    remark: entry?.remark ?? "",
    category: entry?.category ?? "",
    paymentMethod: entry?.paymentMethod ?? "cash",
    transactionDate: entry?.transactionDate
        ? formatLocalDate(entry.transactionDate)
        : localDate,
});

