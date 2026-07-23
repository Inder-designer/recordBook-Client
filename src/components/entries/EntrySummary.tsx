import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { ArrowDownLeft, ArrowUpRight, Wallet } from 'lucide-react'
import { formatCurrency } from '@/utils/common'
import { IRecordSummary } from '@/types/IRecord'

export default function EntrySummary({ summary }: { summary: IRecordSummary }) {
    return (
        <div className="px-4">
            <div className="mb-6 border rounded bg-white md:hidden">
                <div className="flex items-center justify-between font-medium px-3 py-2">
                    <span>Net Balance</span>
                    <span>{formatCurrency(summary.currentBalance)}</span>
                </div>
                <div className="text-sm font-medium border-t flex flex-col gap-2 px-3 py-2">
                    <div className="flex items-center justify-between">
                        <span className="text-black/70">Total In (+)</span>
                        <span className="text-income">{formatCurrency(summary.totalCashIn)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-black/70">Total Out (-)</span>
                        <span className="text-expense">{formatCurrency(summary.totalCashOut)}</span>
                    </div>
                </div>
            </div>
            <div className="mb-6 hidden md:grid gap-4 sm:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2! p-4">
                        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <ArrowDownLeft className="h-4 w-4 text-income" />
                            Total Cash In
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='p-4 pt-0'>
                        <p className="text-2xl font-bold text-income">
                            {formatCurrency(summary.totalCashIn)}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2! p-4">
                        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <ArrowUpRight className="h-4 w-4 text-expense" />
                            Total Cash Out
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='p-4 pt-0'>
                        <p className="text-2xl font-bold text-expense">
                            {formatCurrency(summary.totalCashOut)}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2! p-4">
                        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <Wallet className="h-4 w-4 text-primary" />
                            Net Balance
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='p-4 pt-0'>
                        <p
                            className={`text-2xl font-bold ${(summary.currentBalance >= 0) ? "text-income" : "text-expense"
                                }`}
                        >
                            {formatCurrency(summary.currentBalance)}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
