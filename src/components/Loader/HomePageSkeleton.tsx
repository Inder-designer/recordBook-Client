export default function HomePageSkeleton() {
    return (
        <div className="max-w-350 w-full mx-auto bg-background animate-pulse">

            <main className="px-4 py-6">
                {/* Balance Card */}
                <div className="mb-6 rounded-xl border bg-card p-5">
                    <div className="h-4 w-40 rounded bg-gray-300" />
                    <div className="mt-3 h-10 w-48 rounded bg-gray-300" />
                </div>

                {/* Section Header */}
                <div className="mb-4 flex items-center justify-between">
                    <div className="h-6 w-40 rounded bg-gray-300" />
                    <div className="h-4 w-16 rounded bg-gray-300" />
                </div>

                {/* Book Cards */}
                <div className="grid gap-3 sm:grid-cols-2">
                    {[...Array(4)].map((_, index) => (
                        <div
                            key={index}
                            className="rounded-xl border bg-card p-5"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex gap-3">
                                    <div className="h-11 w-11 rounded-lg bg-gray-300" />

                                    <div>
                                        <div className="h-4 w-32 rounded bg-gray-300" />
                                        <div className="mt-2 h-3 w-20 rounded bg-gray-300" />
                                    </div>
                                </div>

                                <div className="h-5 w-5 rounded bg-gray-300" />
                            </div>

                            <div className="mt-4 border-t pt-4">
                                <div className="grid grid-cols-3 gap-2">
                                    <div>
                                        <div className="h-3 w-10 rounded bg-gray-300" />
                                        <div className="mt-2 h-4 w-16 rounded bg-gray-300" />
                                    </div>

                                    <div>
                                        <div className="h-3 w-10 rounded bg-gray-300" />
                                        <div className="mt-2 h-4 w-16 rounded bg-gray-300" />
                                    </div>

                                    <div>
                                        <div className="h-3 w-14 rounded bg-gray-300" />
                                        <div className="mt-2 h-4 w-16 rounded bg-gray-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}