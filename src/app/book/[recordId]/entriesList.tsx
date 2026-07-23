"use client"
import EntryDesktopTable from "@/components/entries/EntryDesktopTable";
import EntryDialogs from "@/components/entries/EntryDialogs";
import EntryEmptyState from "@/components/entries/EntryEmptyState";
import EntryHeader from "@/components/entries/EntryHeader";
import EntryMobileList from "@/components/entries/EntryMobileList";
import EntrySummary from "@/components/entries/EntrySummary";
import TransactionsTableSkeleton from "@/components/Loader/TransactionsTableSkeleton";
import useEntries from "@/hooks/useEntries";
import { useRecordPermissions } from "@/hooks/useRecordPermissions";
import { IEntry } from "@/types/IEntry";
import { IRecord } from "@/types/IRecord";
import { useState } from "react";
import EntryFilters from "./EntryFilters";
import Loader from "@/components/Loader/Loader";

interface Props {
    record: IRecord;
}
type DialogState =
    | {
        type: "edit";
        entry: IEntry;
    }
    | {
        type: "delete";
        entry: IEntry;
    }
    | null;

export default function EntriesList({
    record,
}: Props) {
    const { user, canManageEntries, canAddEntry } = useRecordPermissions(record);
    const { entries, entriesWithBalance, summary, isLoading, isFetching, filters, updateFilters } = useEntries(record._id)

    const [dialog, setDialog] = useState<DialogState>(null);

    if (isLoading) {
        return <TransactionsTableSkeleton />;
    }

    const handleEdit = (entry: IEntry) =>
        setDialog({ type: "edit", entry });

    const handleDelete = (entry: IEntry) =>
        setDialog({ type: "delete", entry });
    const isFilter = !!(filters.type || filters.paymentMethod || filters.member || filters.startDate || filters.endDate)

    return (
        <div>
            <>
                <EntryFilters
                    isFilter={isFilter}
                    filters={filters}
                    onChange={(filters) =>
                        updateFilters({
                            ...filters,
                            page: 1, // Reset pagination whenever filters change
                        })
                    }
                    members={record.members}
                />;
            </>
            {summary &&
                <EntrySummary summary={summary} />
            }
            <EntryHeader
                total={summary?.totalTransactions ?? 0}
                canAddEntry={canAddEntry}
                recordId={record._id}
            />
            <div>


                {(isLoading || isFetching) ? (
                    <div className="flexCenter pt-6">
                        <Loader type="bar" />
                    </div>
                ) : !entries.length ? (
                    <EntryEmptyState
                        isFilter={isFilter}
                        title={record.title}
                        canAddEntry={canAddEntry}
                    />
                ) : (
                    <>
                        <EntryMobileList
                            entries={entriesWithBalance}
                            user={user}
                            canManageEntries={canManageEntries}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                        <EntryDesktopTable
                            entries={entriesWithBalance}
                            user={user}
                            canManageEntries={canManageEntries}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </>
                )}
            </div>
            <EntryDialogs
                dialog={dialog}
                recordId={record._id}
                onClose={() => setDialog(null)}
            />
        </div >
    )
}