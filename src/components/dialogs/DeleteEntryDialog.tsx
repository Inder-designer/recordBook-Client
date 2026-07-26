"use client";

import { AlertTriangle, X, Trash2 } from "lucide-react";
import { ReactNode } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IEntry } from "@/types/IEntry";
import { formatCurrency, formatDate } from "@/utils/common";

interface ConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    trigger?: ReactNode;
    loading?: boolean;
    onConfirm: () => void;
    entry: IEntry
}
export function DeleteEntryDialog({
    open,
    onOpenChange,
    trigger,
    loading,
    onConfirm,
    entry,
    title = "Delete Entry",
}: ConfirmDialogProps) {
    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                if (!loading) {
                    onOpenChange(value);
                }
            }}
        >
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                {/* Warning */}
                <div className="flex gap-4 rounded-lg border border-orange-300 bg-orange-50 p-4">
                    <AlertTriangle className="mt-0.5 h-6 w-6 text-orange-600" />

                    <div>
                        <p className="font-medium text-orange-700">
                            Once deleted, this entry cannot be restored.
                        </p>

                        <p className="text-orange-700">
                            Are you sure you want to delete it?
                        </p>
                    </div>
                </div>

                {/* Review */}
                <div>
                    <h3 className="mb-3 font-semibold">
                        Review Details
                    </h3>

                    <div className="rounded-lg border p-5">
                        <div className="grid grid-cols-4 gap-6">
                            <div>
                                <p className="text-sm text-muted-foreground">Type</p>

                                <Badge
                                    className={
                                        entry.type === "cashIn"
                                            ? "border-income/30 bg-income-bg text-income"
                                            : "border-expense/30 bg-expense-bg text-expense"
                                    }
                                >
                                    {entry.type === "cashIn"
                                        ? "Cash In"
                                        : "Cash Out"}
                                </Badge>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Amount
                                </p>

                                <p className="font-semibold">
                                    {formatCurrency(Number(entry.amount))}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Date
                                </p>

                                <p>
                                    {formatDate(entry.transactionDate)}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground capitalize">
                                    Mode
                                </p>

                                <p>{entry.paymentMethod}</p>
                            </div>
                        </div>

                        {entry.category && (
                            <div className="mt-5">
                                <p className="text-sm text-muted-foreground">
                                    Category
                                </p>

                                <p>{entry.category}</p>
                            </div>
                        )}

                        {entry.remark && (
                            <div className="mt-5">
                                <p className="text-sm text-muted-foreground">
                                    Remark
                                </p>

                                <p>{entry.remark}</p>
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            className="min-w-40"
                            disabled={loading}
                        >
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button
                        variant="destructive"
                        className="min-w-40"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />

                        {loading
                            ? "Deleting..."
                            : "Yes, Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}