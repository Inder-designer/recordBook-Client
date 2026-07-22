import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { IEntry } from '@/types/IEntry';
import { formatCurrency, formatDate } from '@/utils/common';
import { Badge } from '../ui/badge';
import { IUser } from '@/types/IUser';
import { Button } from '../ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { entryTableColumns, TableColumn } from '@/constants/entryTableColumns';
import clsx from 'clsx';

interface EntryDesktopListProps {
    entries: IEntry[];
    user: IUser | null;
    canManageEntries: boolean;
    onEdit: (tx: IEntry) => void;
    onDelete: (tx: IEntry) => void;
}

export default function EntryDesktopTable({ entries, user, canManageEntries, onEdit, onDelete }: EntryDesktopListProps) {
    return (
        <div className="px-4 hidden md:block">
            <div className="rounded-lg border relative">
                <Table>
                    <TableHeader className="sticky top-0 z-10">
                        <TableRow>
                            {entryTableColumns.map((column: TableColumn) => (
                                <TableHead
                                    key={column.key}
                                    className={clsx(
                                        column.align === "right" && "text-right",
                                        column.align === "center" && "text-center",
                                        column.className
                                    )}
                                >
                                    {column.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {entries?.map((tx: IEntry) => {
                            const isCashIn = tx.type === "cashIn";
                            return (
                                <TableRow key={tx._id}>
                                    <TableCell className="whitespace-nowrap text-muted-foreground pl-4">
                                        {formatDate(tx.transactionDate)}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <p className='max-w-sm whitespace-normal wrap-break-word'>{tx.remark || "--"}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            by {tx.createdBy._id === user?._id ? "You" : tx.createdBy.fullName}

                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={
                                                isCashIn
                                                    ? "border-income/30 bg-income-bg text-income"
                                                    : "border-expense/30 bg-expense-bg text-expense"
                                            }
                                        >
                                            {isCashIn ? "Cash In" : "Cash Out"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-medium">{tx.category}</TableCell>
                                    <TableCell className="font-medium capitalize">{tx.paymentMethod}</TableCell>
                                    <TableCell
                                        className={`whitespace-nowrap text-right font-medium ${isCashIn ? "text-income" : "text-expense"
                                            }`}
                                    >
                                        {isCashIn ? "+" : "-"}
                                        {formatCurrency(tx.amount)}

                                    </TableCell>
                                    <TableCell className="whitespace-nowrap text-right font-semibold">
                                        {formatCurrency(tx.balance)}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap pr-4 text-right">
                                        {canManageEntries && (
                                            <>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                    onClick={() => onEdit(tx)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                    <span className="sr-only">Delete</span>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                    onClick={() => onDelete(tx)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">Delete</span>
                                                </Button>
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
