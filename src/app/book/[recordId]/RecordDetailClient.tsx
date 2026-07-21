"use client"
import { BookSettingsMenu } from "@/components/bookSettingsMenu/BookSettingsMenu"
import { Button } from "@/components/ui/button"
import { useGetRecordByIdQuery } from "@/redux/api/record"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import EntriesList from "./entriesList"
import Loader from "@/components/Loader/Loader"

interface Props {
  recordId: string;
}

export default function RecordDetailClient({
  recordId,
}: Props) {
  const {
    data: record,
    isLoading,
    error,
  } = useGetRecordByIdQuery(recordId);
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Record not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>;
  }
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="flex items-center justify-between gap-3 px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground capitalize">
                {record?.title}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {record && <BookSettingsMenu record={record} />}
          </div>
        </div>
      </header>

      <main className="py-4 md:py-6 min-h-[calc(100vh-69px)] bg-black/2 md:bg-transparent">
        {record && <EntriesList record={record} />}
      </main>
    </div>
  )
}