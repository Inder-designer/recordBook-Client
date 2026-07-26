import { IPagination } from "./common";
import { IRecordSummary } from "./IRecord";
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
    amount: string;
    balance: number;
    remark?: string;
    category?: string;
    paymentMethod: PaymentMethod;
    transactionDate: string;
    createdAt: string;
    updatedAt: string;
}

export interface IEntryFilters {
    page?: number;
    limit?: number;
    type?: "cashIn" | "cashOut";
    paymentMethod?: "cash" | "bank" | "upi" | "card" | "cheque" | "online";
    member?: string;
    startDate?: string;
    endDate?: string;
}

export interface GetEntriesParams {
    recordId: string;
    // filters?: IEntryFilters;
}

export interface GetEntriesResponse {
    data: IEntry[],
    message: string,
    meta: {
        pagination: IPagination
        summary: IRecordSummary
    }
}