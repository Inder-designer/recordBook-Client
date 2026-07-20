"use client";
import { useState } from "react";
import {
    Copy,
    Eraser,
    Pencil,
    Settings,
    Trash2,
    UserPlus,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { IMember, IRecord } from "@/types/IRecord";
import { MembersDialog } from "../dialogs/MembersDialog";
// import { useCashBook, type RecordBook } from "@/hooks/use-cash-book";

type DialogKind = "rename" | "members" | "clear" | "delete" | null;

export function BookSettingsMenu({ record }: { record: IRecord }) {
    const router = useRouter();
    //   const {
    //     renameBook,
    //     duplicateBook,
    //     deleteBook,
    //     deleteAllTransactions,
    //     addMember,
    //     removeMember,
    //   } = useCashBook();

    const [open, setOpen] = useState<DialogKind>(null);
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

    const handleDeleteBook = () => {
        // deleteBook(record.id);
        toast.success("Book deleted");
        router.push("/");
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" aria-label="Book settings">
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
                    <DropdownMenuItem btn
                        onSelect={() => {
                            setName(record.title);
                            setOpen("rename");
                        }}
                    >
                        <Pencil className="mr-2 h-4 w-4" />
                        Rename book
                    </DropdownMenuItem>
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
                        onSelect={() => setOpen("delete")}
                        className="text-destructive focus:text-destructive"
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete book
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Rename */}
            <Dialog open={open === "rename"} onOpenChange={(v) => !v && setOpen(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Rename book</DialogTitle>
                    </DialogHeader>
                    <form id="rename-form" onSubmit={handleRename} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="book-name">Book name</Label>
                            <Input
                                id="book-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoFocus
                                required
                            />
                        </div>
                    </form>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" form="rename-form">
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Members */}
            <MembersDialog
                open={open === "members"}
                onOpenChange={(v) => !v && setOpen(null)}
                record={record}
            />

            {/* Clear entries */}
            <Dialog open={open === "clear"} onOpenChange={(v) => !v && setOpen(null)}>
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
            </Dialog>

            {/* Delete book */}
            <Dialog open={open === "delete"} onOpenChange={(v) => !v && setOpen(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete this book?</DialogTitle>
                        <DialogDescription>
                            <b>{record.title}</b> and all its transactions will be permanently
                            removed.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button variant="destructive" onClick={handleDeleteBook}>
                            Delete book
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}