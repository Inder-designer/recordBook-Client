import { toast } from "sonner"
import { useCreateEntryMutation, useDeleteEntryMutation } from "@/redux/api/entry"
import { IEntryFormValues } from "@/formik/validations/entry.validation"


export const useEntryHandlers = () => {
    const [createEntry, { isLoading: createEntryLoading }] = useCreateEntryMutation()
    const [deleteEntry, { isLoading: deleteEntryLoading }] = useDeleteEntryMutation()

    const handleCreateEntry = async (values: IEntryFormValues, recordId: string, onSuccess?: () => void) => {
        const now = new Date();
        const selectedDate = new Date(values.transactionDate);
        selectedDate.setHours(
            now.getHours(),
            now.getMinutes(),
            now.getSeconds(),
            now.getMilliseconds()
        );
        const data = {
            ...values,
            transactionDate: selectedDate.toISOString(),
        }
        try {
            const res = await createEntry({ data, recordId }).unwrap()
            onSuccess?.();
            toast.success(
                res.message ||
                "Entry created successfully"
            );
        } catch (error: any) {
            toast.error(
                error?.data?.message ||
                "Failed to create Entry"
            );
        }
    }

    const handleDeleteEntry = async (
        entryId: string,
        recordId: string,
        onSuccess?: () => void
    ) => {
        try {
            await deleteEntry({ recordId, entryId }).unwrap();
            onSuccess?.();
            toast.success(
                "Entry delete successfully"
            );
        } catch (error: any) {
            toast.error(
                error?.data?.message ||
                "Failed to create Entry"
            );
        }
    }

    return { handleCreateEntry, createEntryLoading, handleDeleteEntry, deleteEntryLoading }
}