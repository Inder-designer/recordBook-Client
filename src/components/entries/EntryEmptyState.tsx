import { Wallet } from 'lucide-react'

interface EntryEmptyStateProps {
    isFilter: boolean;
    canAddEntry: boolean,
    title: string
}

export default function EntryEmptyState({ isFilter, title, canAddEntry }: EntryEmptyStateProps) {
    return (
        <div className="px-4">
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-white py-16">
                <Wallet className="mb-3 h-10 w-10 text-gray-600" />
                <p className="text-gray-600 text-lg">{isFilter ? "No entries found" : "No entries added Yet!"}</p>
                {canAddEntry && (
                    <p className="mt-2 text-sm text-gray-500">
                        {isFilter ? "Try changing the filters to find entries." : `Add your first entry to ${title}`}
                    </p>
                )}
            </div>
        </div>
    )
}
