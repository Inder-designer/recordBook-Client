import { AddAndEditEntryDialog } from '../dialogs/AddAndEditEntryDialog'

interface EntryHeaderProps {
    total: number,
    canAddEntry: boolean,
    recordId: string
}

export default function EntryHeader({ total, canAddEntry, recordId }: EntryHeaderProps) {
    return (
        <div>
            <div className="px-4 flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">
                    Entries <span className="text-base">({total})</span>
                </h2>
                {canAddEntry && (
                    <div className="flex gap-2">
                        <AddAndEditEntryDialog recordId={recordId} type="cashIn" />
                        <AddAndEditEntryDialog recordId={recordId} type="cashOut" />
                    </div>
                )}
            </div>
        </div>
    )
}
