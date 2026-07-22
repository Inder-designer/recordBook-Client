import { ReactNode } from "react";

export interface TableColumn {
    key: string;
    label: ReactNode;
    align?: "left" | "center" | "right";
    className?: string;
}

export const entryTableColumns: TableColumn[] = [
    {
        key: "date",
        label: "Date",
        className: "pl-4",
    },
    {
        key: "details",
        label: "Details",
    },
    {
        key: "type",
        label: "Type",
    },
    {
        key: "category",
        label: "Category",
    },
    {
        key: "mode",
        label: "Mode",
    },
    {
        key: "amount",
        label: "Amount",
        align: "right",
    },
    {
        key: "balance",
        label: "Balance",
        align: "right",
    },
    {
        key: "actions",
        label: <span className="sr-only"> Actions </span>,
        className: "w-24",
    },
];