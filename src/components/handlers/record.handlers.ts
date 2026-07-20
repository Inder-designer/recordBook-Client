import { useAddMemberMutation, useCreateRecordMutation, useDeleteRecordMutation } from "@/redux/api/record"
import type { IRecordFormValues } from "@/formik/validations/record.validation"
import { toast } from "sonner"


export const useRecordHandlers = () => {
    const [createRecord, { isLoading: createRecordLoading }] = useCreateRecordMutation()
    const [deleteRecord, { isLoading: deleteRecordLoading }] = useDeleteRecordMutation()
    const [addMember, { isLoading: addMemberLoading }] = useAddMemberMutation()

    const handleCreateRecord = async (values: IRecordFormValues, onSuccess?: () => void) => {
        console.log(values);

        try {
            const res = await createRecord(values).unwrap()
            toast.success(
                res.message ||
                "Record created successfully"
            );
            onSuccess?.();
        } catch (error: any) {
            toast.error(
                error?.data?.message ||
                "Failed to create record"
            );
        }
    }

    const handleDeleteRecord = async (id: string) => {
        try {
            await deleteRecord(id).unwrap();
            toast.success(
                "Record delete successfully"
            );
        } catch (error: any) {
            toast.error(
                error?.data?.message ||
                "Failed to create record"
            );
        }
    }

    const handleAddMember = async (data: any, recordId: string, onSuccess?: () => void) => {
        try {
            const res = await addMember({ data, recordId }).unwrap()
            toast.success(
                res.message ||
                "Member added successfully"
            );
            onSuccess?.();
        } catch (error: any) {
            toast.error(
                error?.data?.message ||
                "Failed to create record"
            );
        }
    }

    return { handleCreateRecord, createRecordLoading, handleDeleteRecord, deleteRecordLoading, handleAddMember, addMemberLoading }
}