import { UserRoute } from "@/components/Routes/Route";
import RecordDetailClient from "./RecordDetailClient";

export default async function RecordDetailPage({
    params,
}: {
    params: Promise<{ recordId: string }>;
}) {
    const { recordId } = await params;

    return (
        <UserRoute>
            <RecordDetailClient recordId={recordId} />
        </UserRoute>
    );
}