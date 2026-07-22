import { Wallet } from 'lucide-react'

interface EntryEmptyStateProps {
    canAddEntry: boolean,
    title: string
}

export default function EntryEmptyState({ title, canAddEntry }: EntryEmptyStateProps) {
    return (
        <div className="px-4">
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-white py-16">
                <Wallet className="mb-3 h-10 w-10 text-gray-600" />
                <p className="text-gray-600 text-lg">No entries added Yet!</p>
                {canAddEntry && (
                    <p className="mt-2 text-sm text-gray-500">
                        Add your first entry to {title}
                    </p>
                )}
            </div>
        </div>
    )
}
