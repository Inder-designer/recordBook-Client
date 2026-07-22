"use client";

import { AddAndEditTransactionDialog } from "@/components/dialogs/AddAndEditTransactionDialog";
import { DeleteEntryDialog } from "@/components/dialogs/DeleteEntryDialog";
import { IEntry } from "@/types/IEntry";
import { useEntryHandlers } from "../handlers/entry.handlers";

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

interface EntryDialogsProps {
    dialog: DialogState;
    recordId: string;
    onClose: () => void;
}

export default function EntryDialogs({
    dialog,
    recordId,
    onClose,
}: EntryDialogsProps) {
    const { handleDeleteEntry, deleteEntryLoading } = useEntryHandlers()
    if (!dialog) return null;

    if (dialog.type === "edit") {
        return (
            <AddAndEditTransactionDialog
                open
                onOpenChange={(open) => {
                    if (!open) {
                        onClose();
                    }
                }}
                entry={dialog.entry}
                recordId={recordId}
                type={dialog.entry.type}
            />
        );
    }

    return (
        <>
            <DeleteEntryDialog
                open
                onOpenChange={onClose}
                loading={deleteEntryLoading}
                entry={dialog.entry}
                onConfirm={() =>
                    handleDeleteEntry(
                        dialog.entry._id,
                        recordId,
                        onClose
                    )
                }
            />
        </>
    );
}