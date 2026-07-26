import { useGetEntriesQuery } from '@/redux/api/entry';
import { IEntry, IEntryFilters } from '@/types/IEntry';
import { IRecord, IRecordSummary } from '@/types/IRecord';
import React, { useEffect, useMemo, useState } from 'react'

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
    } = useGetEntriesQuery(
        recordId!,
        {
            skip: !recordId,
        });

    const entries = data?.data ?? []
    const updateFilters = (value: Partial<IEntryFilters>) => {
        setFilters((prev) => ({
            ...prev,
            ...value,
            page: 1,
        }));
    };


    const filteredEntries = useMemo(() => {
        return entries.filter((entry) => {
            if (filters.type && entry.type !== filters.type) return false;

            if (
                filters.paymentMethod &&
                entry.paymentMethod !== filters.paymentMethod
            )
                return false;

            if (
                filters.member &&
                entry.createdBy._id !== filters.member
            )
                return false;

            if (filters.startDate) {
                if (
                    new Date(entry.transactionDate) <
                    new Date(filters.startDate)
                )
                    return false;
            }

            if (filters.endDate) {
                if (
                    new Date(entry.transactionDate) >
                    new Date(filters.endDate)
                )
                    return false;
            }

            return true;
        });
    }, [entries, filters])

    const entriesWithBalance = useMemo<EntryWithBalance[]>(() => {
        return [...(filteredEntries)]
            .sort(
                (a, b) =>
                    new Date(a.transactionDate).getTime() -
                    new Date(b.transactionDate).getTime()
            )
            .reduce((acc: EntryWithBalance[], entry: IEntry) => {
                const previousBalance =
                    acc.length > 0 ? acc[acc.length - 1].balance : 0;
                const amount = Number(entry.amount);

                const balance =
                    entry.type === "cashIn"
                        ? previousBalance + amount
                        : previousBalance - amount;

                acc.push({
                    ...entry,
                    balance,
                });

                return acc;
            }, [])
            .reverse();

    }, [filteredEntries]);

    const summary = useMemo<IRecordSummary>(() => {
        return filteredEntries.reduce<IRecordSummary>(
            (acc, entry) => {
                const amount = Number(entry.amount);
                if (entry.type === "cashIn") {
                    acc.totalCashIn += amount;
                    acc.currentBalance += amount;
                } else {
                    acc.totalCashOut += amount;
                    acc.currentBalance -= amount;
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
    }, [filteredEntries])

    return {
        entries: filteredEntries,
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
