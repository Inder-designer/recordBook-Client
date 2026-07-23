import { useGetEntriesQuery } from '@/redux/api/entry';
import { IEntry, IEntryFilters } from '@/types/IEntry';
import { IRecord, IRecordSummary } from '@/types/IRecord';
import React, { useMemo, useState } from 'react'

export interface EntryWithBalance extends IEntry {
    balance: number;
}
export default function useEntries(recordId?: string) {
    const [filters, setFilters] = useState<IEntryFilters>({
        page: 1,
        limit: 20,
    });
    const {
        data,
        isLoading,
        isFetching,
        refetch,
    } = useGetEntriesQuery({
        recordId: recordId!,
        filters,
    }, {
        skip: !recordId,
    });

    const entries = data?.data ?? []

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

    const summary = data?.meta.summary;
    // const summary = useMemo<IRecordSummary>(() => {
    //     return entries.reduce<IRecordSummary>(
    //         (acc, entry) => {
    //             if (entry.type === "cashIn") {
    //                 acc.totalCashIn += entry.amount;
    //                 acc.currentBalance += entry.amount;
    //             } else {
    //                 acc.totalCashOut += entry.amount;
    //                 acc.currentBalance -= entry.amount;
    //             }

    //             acc.totalTransactions++;

    //             return acc;
    //         },
    //         {
    //             totalCashIn: 0,
    //             totalCashOut: 0,
    //             currentBalance: 0,
    //             totalTransactions: 0,
    //         }
    //     );
    // }, [entries])
    const updateFilters = (value: Partial<IEntryFilters>) => {
        setFilters((prev) => ({
            ...prev,
            ...value,
            page: 1,
        }));
    };

    return {
        entries,
        entriesWithBalance,
        summary,
        pagination: data?.meta?.pagination,
        isLoading,
        isFetching,
        refetch,
        filters,
        updateFilters
    }
}
