import { useGetEntriesQuery } from '@/redux/api/entry';
import { IEntry } from '@/types/IEntry';
import { IRecord, IRecordSummary } from '@/types/IRecord';
import React, { useMemo } from 'react'

export interface EntryWithBalance extends IEntry {
    balance: number;
}
export default function useEntries(recordId?: string) {
    const {
        data: entries = [],
        isLoading,
        isFetching,
        refetch,
    } = useGetEntriesQuery(recordId ?? "", {
        skip: !recordId,
    });

    const entriesWithBalance = useMemo<EntryWithBalance[]>(() => {
        return [...(entries)]
            .sort(
                (a, b) =>
                    new Date(a.transactionDate).getTime() -
                    new Date(b.transactionDate).getTime()
            )
            .reduce((acc: EntryWithBalance[], entry: IEntry) => {
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

    }, [entries]);

    const summary = useMemo<IRecordSummary>(() => {
        return entries.reduce<IRecordSummary>(
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
    }, [entries])

    return {
        entries,
        entriesWithBalance,
        summary,
        isLoading,
        isFetching,
        refetch,
    }
}
