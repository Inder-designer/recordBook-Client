"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function TransactionsTableSkeleton() {
    return (
        <div className="overflow-hidden rounded-xl border">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-muted/50">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <th
                                    key={index}
                                    className="px-4 py-3 text-left"
                                >
                                    <Skeleton className="h-4 w-20" />
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {Array.from({ length: 5 }).map((_, row) => (
                            <tr key={row}>
                                <td className="px-4 py-4">
                                    <Skeleton className="h-4 w-24" />
                                </td>

                                <td className="px-4 py-4">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="mt-2 h-3 w-24" />
                                </td>

                                <td className="px-4 py-4">
                                    <Skeleton className="h-6 w-20 rounded-full" />
                                </td>

                                <td className="px-4 py-4">
                                    <Skeleton className="h-4 w-20" />
                                </td>

                                <td className="px-4 py-4">
                                    <Skeleton className="h-4 w-16" />
                                </td>

                                <td className="px-4 py-4 text-right">
                                    <Skeleton className="ml-auto h-4 w-24" />
                                </td>

                                <td className="px-4 py-4 text-right">
                                    <Skeleton className="ml-auto h-4 w-24" />
                                </td>

                                <td className="px-4 py-4 text-right">
                                    <Skeleton className="ml-auto h-8 w-8 rounded-md" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}