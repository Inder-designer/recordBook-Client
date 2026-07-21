import { toast } from "sonner"
import { useCreateEntryMutation, useDeleteEntryMutation, useEditEntryMutation } from "@/redux/api/entry"
import { IEntryFormValues } from "@/formik/validations/entry.validation"


export const useEntryHandlers = () => {
    const [createEntry, { isLoading: createEntryLoading }] = useCreateEntryMutation()
    const [editEntry, { isLoading: editEntryLoading }] = useEditEntryMutation()
    const [deleteEntry, { isLoading: deleteEntryLoading }] = useDeleteEntryMutation()

    const prepareEntryData = (values: IEntryFormValues) => {
        const now = new Date();
        const selectedDate = new Date(values.transactionDate);

        selectedDate.setHours(
            now.getHours(),
            now.getMinutes(),
            now.getSeconds(),
            now.getMilliseconds()
        );

        return {
            ...values,
            transactionDate: selectedDate.toISOString(),
        };
    };

    const handleSaveEntry = async ({
        values,
        recordId,
        entryId,
        onSuccess,
    }: {
        values: IEntryFormValues;
        recordId: string;
        entryId?: string;
        onSuccess?: () => void;
    }) => {
        const data = prepareEntryData(values);

        try {
            const res = entryId
                ? await editEntry({ data, recordId, entryId }).unwrap()
                : await createEntry({ data, recordId }).unwrap();

            onSuccess?.();

            toast.success(
                res.message ??
                (entryId
                    ? "Entry updated successfully"
                    : "Entry created successfully")
            );
        } catch (error: any) {
            toast.error(
                error?.data?.message ??
                (entryId
                    ? "Failed to update entry"
                    : "Failed to create entry")
            );
        }
    };

    const handleDeleteEntry = async (
        entryId: string,
        recordId: string,
        onSuccess?: () => void
    ) => {
        try {
            await deleteEntry({ recordId, entryId }).unwrap();
            onSuccess?.();
            toast.success(
                "Entry deleted successfully"
            );
        } catch (error: any) {
            toast.error(
                error?.data?.message ||
                "Failed to delete Entry"
            );
        }
    }

    return {
        handleSaveEntry, isLoading: createEntryLoading || editEntryLoading, handleDeleteEntry, deleteEntryLoading
    }
}