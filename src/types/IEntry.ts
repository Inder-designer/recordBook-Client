import { IUser } from "./IUser";

export type EntryType =
    | "cashIn"
    | "cashOut";

export type PaymentMethod =
    | "cash"
    | "bank"
    | "upi"
    | "card"
    | "cheque";

export interface IEntry {
    _id: string;
    recordId: string;
    createdBy: IUser;
    type: EntryType;
    amount: number;
    balance: number;
    remark?: string;
    category?: string;
    paymentMethod: PaymentMethod;
    transactionDate: string;
    createdAt: string;
    updatedAt: string;
}