import { IEntry } from "@/types/IEntry";
import { Separator } from "../ui/separator";
import { IUser } from "@/types/IUser";
import { formatCurrency, formatDate } from "@/utils/common";
import { Button } from "../ui/button";
import { Edit, Trash2 } from "lucide-react";

interface EntryMobileListProps {
    entries: IEntry[];
    user: IUser | null;
    canManageEntries: boolean;
    onEdit: (tx: IEntry) => void;
    onDelete: (tx: IEntry) => void;
}


export default function EntryMobileList({ entries, user, canManageEntries, onEdit, onDelete }: EntryMobileListProps) {
    return (

        <div className="flex flex-col gap-2 md:hidden">
            {entries?.map((tx: IEntry) => (
                <div key={tx._id} className="bg-white p-3">
                    <div className="flex justify-between gap-10">
                        <div className="text-xs flex flex-col justify-center">
                            {!tx.paymentMethod && !tx.category && !tx.remark ?
                                "-"
                                : (
                                    <>
                                        <div className="flex gap-2">
                                            {
                                                tx.paymentMethod &&
                                                <span className="tracking-wider rounded capitalize font-medium inline-block px-3 py-1 bg-purple-100 text-purple-500">{tx.paymentMethod}</span>
                                            }
                                            {tx.category &&
                                                <span className="rounded capitalize font-medium inline-block px-3 py-1 text-indigo-500 bg-indigo-100">{tx.category}</span>
                                            }
                                        </div>
                                        {tx.remark &&
                                            <p className="mt-1.5 text-gray-700 text-xs sm:text-sm">{tx.remark}</p>
                                        }
                                    </>
                                )
                            }
                        </div>
                        <div className="shrink-0 flex flex-col gap-1 text-right tracking-wide">
                            <span className={`font-medium ${tx.type === "cashIn" ? "text-income" : "text-expense"}`}>
                                {formatCurrency(tx.amount)}
                            </span>
                            <span className={`text-xs sm:text-sm text-muted-foreground`}>
                                Balance: {formatCurrency(tx.balance)}
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center gap-10 border-t pt-2.5 mt-2.5">
                        <div className="flex items-end gap-2">
                            <p
                                className={`flex-1 truncate text-xs sm:text-sm font-medium ${tx.createdBy._id === user?._id
                                    ? "text-indigo-600"
                                    : "text-emerald-600"
                                    }`}
                            >
                                Entry by {tx.createdBy._id === user?._id ? "You" : tx.createdBy.fullName}
                            </p>
                            <Separator orientation="vertical" />
                            <p className="shrink-0 text-xs text-muted-foreground">
                                {formatDate(tx.transactionDate)}
                            </p>
                        </div>

                        {canManageEntries && (
                            <div className="flex items-center gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => onEdit(tx)}
                                >
                                    <Edit className="h-4 w-4" />
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onDelete(tx)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
