"use client"

import { AddAndUpdateBookDialog } from "@/components/dialogs/AddAndUpdateBookDialog";
import { useRecordHandlers } from "@/components/handlers/record.handlers";
import HomePageSkeleton from "@/components/Loader/HomePageSkeleton";
import { UserRoute } from "@/components/Routes/Route";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetRecordsQuery } from "@/redux/api/record";
import { IRecord } from "@/types/IRecord";
import { formatCurrency } from "@/utils/common";
import { ArrowDownLeft, ArrowUpRight, BookOpen, ChevronRight, Plus, Trash2, Wallet } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <UserRoute>
      <HomeContent />
    </UserRoute>
  );
}

export function HomeContent() {
  const { data: records, isLoading } = useGetRecordsQuery({})
  const { handleDeleteRecord, deleteRecordLoading } = useRecordHandlers()

  if (isLoading) {
    return <HomePageSkeleton />;
  }

  const grandBalance = records.reduce(
    (sum: number, b: IRecord) => sum + (b.summary?.currentBalance ?? 0),
    0,
  );

  return (
    <UserRoute>
      <div className="min-h-screen bg-background">
        <main className="px-4 py-6">
          <div className="mb-6 rounded-xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">Net Balance (all books)</p>
            <p
              className={`mt-1 text-3xl font-bold ${grandBalance >= 0 ? "text-income" : "text-expense"
                }`}
            >
              {formatCurrency(grandBalance)}
            </p>
          </div>

          <div className="mb-3 flex items-center justify-between">
            {/* <div> */}
            <h2 className="text-lg font-semibold">Your Record Books ({records.length})</h2>
            {/* <span className="text-sm text-muted-foreground">
                {records.length} {records.length === 1 ? "book" : "books"}
              </span> */}
            {/* </div> */}

            <AddAndUpdateBookDialog />
          </div>

          {records.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16">
              <BookOpen className="mb-3 h-10 w-10 text-muted-foreground/50" />
              <p className="text-muted-foreground">No record books yet</p>
              <p className="mt-1 text-sm text-muted-foreground/70">
                Create a book like "House Expense" or "Salary" to get started
              </p>
              <div className="mt-4">
                <AddAndUpdateBookDialog />
              </div>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {records.map((book: IRecord) => {
                return (
                  <Card
                    key={book._id}
                    className="group relative overflow-hidden transition-shadow hover:shadow-md"
                  >
                    <Link
                      href={`/book/${book._id}`}
                      className="block"
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                              <Wallet className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground capitalize">
                                {book.title}
                              </h3>
                              <p className="text-xs text-muted-foreground">
                                {book.summary?.totalTransactions}{" "}
                                {book.summary?.totalTransactions === 1
                                  ? "transaction"
                                  : "transactions"}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 mr-5" />
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-2 border-t pt-4">
                          <div>
                            <p className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-muted-foreground">
                              <ArrowDownLeft className="h-3 w-3 text-income" />
                              In
                            </p>
                            <p className="mt-0.5 text-sm font-medium text-income">
                              {formatCurrency(book.summary?.totalCashIn ?? 0)}
                            </p>
                          </div>
                          <div>
                            <p className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-muted-foreground">
                              <ArrowUpRight className="h-3 w-3 text-expense" />
                              Out
                            </p>
                            <p className="mt-0.5 text-sm font-medium text-expense">
                              {formatCurrency(book.summary?.totalCashOut ?? 0)}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                              Balance
                            </p>
                            <p
                              className={`mt-0.5 text-sm font-semibold ${(book.summary?.currentBalance ?? 0) >= 0
                                ? "text-foreground"
                                : "text-expense"
                                }`}
                            >
                              {formatCurrency(book.summary?.currentBalance ?? 0)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-4 h-7 w-7 text-muted-foreground lg:opacity-0 hover:text-destructive group-hover:opacity-100"
                      onClick={() =>
                        handleDeleteRecord(book._id)
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete book</span>
                    </Button>
                  </Card>
                );
              })}
            </div>
          )}
        </main>
      </div >
    </UserRoute >
  );
}
