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
    const { entries, entriesWithBalance, summary, isLoading } = useEntries(record._id)

    const [dialog, setDialog] = useState<DialogState>(null);

    if (isLoading) {
        return <TransactionsTableSkeleton />;
    }

    const handleEdit = (entry: IEntry) =>
        setDialog({ type: "edit", entry });

    const handleDelete = (entry: IEntry) =>
        setDialog({ type: "delete", entry });

    return (
        <div>
            <EntrySummary summary={summary} />
            <EntryHeader
                total={summary.totalTransactions}
                canAddEntry={canAddEntry}
                recordId={record._id}
            />
            <div>


                {!entries.length ? (
                    <EntryEmptyState
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