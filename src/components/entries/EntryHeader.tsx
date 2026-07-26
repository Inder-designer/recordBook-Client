import { Minus, Plus } from 'lucide-react'
import { AddAndEditEntryDialog } from '../dialogs/AddAndEditEntryDialog'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react';

interface EntryHeaderProps {
    total: number,
    canAddEntry: boolean,
    recordId: string
}

export default function EntryHeader({ total, canAddEntry, recordId }: EntryHeaderProps) {
    const [dialogType, setDialogType] = useState<"cashIn" | "cashOut">("cashIn");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore when typing in an input, textarea, or select
            const target = e.target as HTMLElement;

            const isDialogOpen =
                open || !!document.querySelector("[role='dialog']");
            console.log(isDialogOpen);


            if (
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.tagName === "SELECT" ||
                target.isContentEditable
            ) {
                return;
            }

            if (e.key === "+") {
                e.preventDefault();
                setDialogType("cashIn");
                if (!isDialogOpen) {
                    setOpen(true);
                }
            }

            if (e.key === "-") {
                e.preventDefault();
                setDialogType("cashOut");
                if (!isDialogOpen) {
                    setOpen(true);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
    return (
        <div>
            <div className="px-4 flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">
                    Entries <span className="text-base">({total})</span>
                </h2>
                {canAddEntry && (
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant="default" onClick={() => {
                                setDialogType("cashIn");
                                setOpen(true);
                            }}
                        >
                            <Plus className="h-4 w-4" />
                            Cash In
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                                setDialogType("cashOut");
                                setOpen(true);
                            }}

                        >
                            <Minus className="h-4 w-4" />
                            Cash Out
                        </Button>
                    </div>
                )}
            </div>
            <AddAndEditEntryDialog
                open={open}
                onOpenChange={setOpen}
                type={dialogType}
                recordId={recordId}
            />
        </div>
    )
}
