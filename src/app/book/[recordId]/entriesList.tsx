"use client"
import { AddTransactionDialog } from "@/components/dialogs/AddTransactionDialog";
import { DeleteEntryDialog } from "@/components/dialogs/DeleteEntryDialog";
import { useEntryHandlers } from "@/components/handlers/entry.handlers";
import TransactionsTableSkeleton from "@/components/Loader/TransactionsTableSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetEntriesQuery } from "@/redux/api/entry";
import { RootState } from "@/redux/store/store";
import { IEntry } from "@/types/IEntry";
import { IRecord, IRecordSummary } from "@/types/IRecord";
import { formatCurrency, formatDate } from "@/utils/common";
import TableBody from "@mui/material/TableBody";
import { ArrowDownLeft, ArrowUpRight, Trash2, Wallet } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

interface EntriesListProps {
    record: IRecord;
}

export default function EntriesList({
    record,
}: EntriesListProps) {
    const { user } = useSelector((state: RootState) => state.auth);
    const { data: entries = [], isLoading } =
        useGetEntriesQuery(record?._id ?? "", {
            skip: !record?._id,
        });
    const { handleDeleteEntry, deleteEntryLoading } = useEntryHandlers()
    const [selectedEntry, setSelectedEntry] = useState<IEntry | null>(null);

    if (isLoading) {
        return <TransactionsTableSkeleton />;
    }

    const entriesWithBalance = [...(entries || [])]
        .sort(
            (a, b) =>
                new Date(a.transactionDate).getTime() -
                new Date(b.transactionDate).getTime()
        )
        .reduce((acc: any[], entry: IEntry) => {
            const previousBalance =
                acc.length > 0 ? acc[acc.length - 1].balance : 0;

            const balance =
                entry.type === "cashIn"
                    ? previousBalance + entry.amount
                    : previousBalance - entry.amount;

            acc.push({
                ...entry,
                balance,
            });

            return acc;
        }, [])
        .reverse();

    const summary = entries.reduce<IRecordSummary>(
        (acc, entry) => {
            if (entry.type === "cashIn") {
                acc.totalCashIn += entry.amount;
                acc.currentBalance += entry.amount;
            } else {
                acc.totalCashOut += entry.amount;
                acc.currentBalance -= entry.amount;
            }

            acc.totalTransactions++;

            return acc;
        },
        {
            totalCashIn: 0,
            totalCashOut: 0,
            currentBalance: 0,
            totalTransactions: 0,
        }
    );

    return (
        <div>
            <div className="mb-6 grid gap-4 sm:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <ArrowDownLeft className="h-4 w-4 text-income" />
                            Total Cash In
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-income">
                            {formatCurrency(summary.totalCashIn)}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <ArrowUpRight className="h-4 w-4 text-expense" />
                            Total Cash Out
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-expense">
                            {formatCurrency(summary.totalCashOut)}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <Wallet className="h-4 w-4 text-primary" />
                            Balance
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p
                            className={`text-2xl font-bold ${(summary.currentBalance >= 0) ? "text-income" : "text-expense"
                                }`}
                        >
                            {formatCurrency(summary.currentBalance)}
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div>
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold">
                        Transactions <span className="text-base">({summary.totalTransactions})</span>
                    </h2>
                    <div className="flex gap-2">
                        <AddTransactionDialog recordId={record?._id} type="cashIn" />
                        <AddTransactionDialog recordId={record?._id} type="cashOut" />
                    </div>
                </div>

                {!entries.length ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16">
                        <Wallet className="mb-3 h-10 w-10 text-muted-foreground/50" />
                        <p className="text-muted-foreground">No transactions yet</p>
                        <p className="mt-1 text-sm text-muted-foreground/70">
                            Add your first entry to {record.title}
                        </p>
                        <div className="mt-4 flex gap-2">
                            <AddTransactionDialog recordId={record?._id} type="cashIn" />
                            <AddTransactionDialog recordId={record?._id} type="cashOut" />
                        </div>
                    </div>
                ) : (
                    // <></>
                    <div className="rounded-lg border relative">
                        <Table>
                            <TableHeader className="sticky top-0 z-10">
                                <TableRow>
                                    <TableHead className="text-left font-medium text-muted-foreground pl-4">Date</TableHead>
                                    <TableHead className="text-left font-medium text-muted-foreground">Details</TableHead>
                                    <TableHead className="text-left font-medium text-muted-foreground">Type</TableHead>
                                    <TableHead className="text-left font-medium text-muted-foreground">Category</TableHead>
                                    <TableHead className="text-left font-medium text-muted-foreground">Mode</TableHead>
                                    <TableHead className="text-right font-medium text-muted-foreground">Amount</TableHead>
                                    <TableHead className="text-right font-medium text-muted-foreground">Balance</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {entriesWithBalance?.map((tx: IEntry) => (
                                    <TableRow key={tx._id}>
                                        <TableCell className="whitespace-nowrap text-muted-foreground pl-4">
                                            {formatDate(tx.transactionDate)}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {tx.remark || "--"}
                                            <p className="text-xs text-gray-500 mt-1">
                                                by {tx.createdBy._id === user?._id ? "You" : tx.createdBy.fullName}

                                            </p>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={
                                                    tx.type === "cashIn"
                                                        ? "border-income/30 bg-income-bg text-income"
                                                        : "border-expense/30 bg-expense-bg text-expense"
                                                }
                                            >
                                                {tx.type === "cashIn" ? "Cash In" : "Cash Out"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-medium">{tx.category}</TableCell>
                                        <TableCell className="font-medium capitalize">{tx.paymentMethod}</TableCell>
                                        <TableCell
                                            className={`whitespace-nowrap text-right font-medium ${tx.type === "cashIn" ? "text-income" : "text-expense"
                                                }`}
                                        >
                                            {tx.type === "cashIn" ? "+" : "-"}
                                            {formatCurrency(tx.amount)}

                                        </TableCell>
                                        <TableCell className="whitespace-nowrap text-right font-semibold">
                                            {formatCurrency(tx.balance)}
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap pr-4 text-right">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                onClick={() => setSelectedEntry(tx)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">Delete</span>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
                {selectedEntry && (
                    <DeleteEntryDialog
                        open
                        onOpenChange={(open) => {
                            if (!open) setSelectedEntry(null);
                        }}
                        loading={deleteEntryLoading}
                        entry={selectedEntry}
                        onConfirm={() =>
                            handleDeleteEntry(
                                selectedEntry._id,
                                record._id,
                                () => setSelectedEntry(null)
                            )
                        }
                    />
                )}
            </div>
        </div >
    )
}