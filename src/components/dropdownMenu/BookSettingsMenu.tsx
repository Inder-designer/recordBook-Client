"use client";
import { useState } from "react";
import {
    Copy,
    Eraser,
    Pencil,
    Settings,
    Trash2,
    Users,
    X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { IRecord } from "@/types/IRecord";
import { MembersDialog } from "../dialogs/MembersDialog";
import { useRecordHandlers } from "../handlers/record.handlers";
import { AddAndUpdateBookDialog } from "../dialogs/AddAndUpdateBookDialog";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useRecordPermissions } from "@/hooks/useRecordPermissions";

type DialogKind = "rename" | "members" | "clear" | null;

export function BookSettingsMenu({ record }: { record: IRecord }) {
    const { user } = useSelector((state: RootState) => state.auth);
    const you = record.members.find((m) => m.user._id === user?._id)
    const { canEditBook } = useRecordPermissions(record)
    const { handleDeleteRecord } = useRecordHandlers()

    const [open, setOpen] = useState<DialogKind>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [name, setName] = useState(record.title);

    const handleRename = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        // renameBook(record.id, name);
        toast.success("Book renamed");
        setOpen(null);
    };

    const handleDuplicate = () => {
        // const newId = duplicateBook(record.id);
        toast.success("Book duplicated");
        // if (newId) router.push(`/books/${newId}`)
    };

    const handleClearAll = () => {
        // deleteAllTransactions(record.id);
        toast.success("All entries deleted");
        setOpen(null);
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Book settings">
                        <Settings className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Book settings</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem btn onSelect={() => setOpen("members")}>
                        <Users className="mr-2 h-4 w-4" />
                        Members
                    </DropdownMenuItem>
                    {canEditBook &&
                        <DropdownMenuItem btn
                            onSelect={() => setIsEditOpen(true)}
                        >
                            <Pencil className="mr-2 h-4 w-4" />
                            Rename book
                        </DropdownMenuItem>
                    }
                    <DropdownMenuItem btn onSelect={handleDuplicate}>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate this book
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem btn
                        onSelect={() => setOpen("clear")}
                        className="text-destructive focus:text-destructive"
                    >
                        <Eraser className="mr-2 h-4 w-4" />
                        Delete all entries
                    </DropdownMenuItem>
                    <DropdownMenuItem btn
                        onSelect={() => handleDeleteRecord(record._id)}
                        className="text-destructive focus:text-destructive"
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete book
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu >

            {/* Rename */}
            {isEditOpen &&
                < AddAndUpdateBookDialog
                    open={isEditOpen}
                    onOpenChange={setIsEditOpen}
                    record={record}
                />
            }

            {/* Members */}
            < MembersDialog
                open={open === "members"
                }
                onOpenChange={(v) => !v && setOpen(null)}
                record={record}
            />

            {/* Clear entries */}
            < Dialog open={open === "clear"} onOpenChange={(v) => !v && setOpen(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete all entries?</DialogTitle>
                        <DialogDescription>
                            This removes every transaction in <b>{record.title}</b>. The book
                            itself stays. This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button variant="destructive" onClick={handleClearAll}>
                            Delete entries
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog >
        </>
    );
}