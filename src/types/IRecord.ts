import { IUser } from "./IUser";

export enum MemberRole {
    OWNER = 1,
    ADMIN = 2,
    EDITOR = 3,
    VIEWER = 4,
}

export interface IMember {
    user: IUser;
    role: MemberRole;
}

export interface IRecordSummary {
    totalCashIn: number;
    totalCashOut: number;
    currentBalance: number;
    totalTransactions: number;
}

export interface IRecord {
    _id: string;
    createdBy: IUser;
    title: string;
    description?: string;
    members: IMember[];
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    summary?: IRecordSummary;
}