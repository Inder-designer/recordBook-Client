import { useAddMemberMutation, useCreateRecordMutation, useDeleteRecordMutation, useUpdateRecordMutation } from "@/redux/api/record"
import type { IRecordFormValues } from "@/formik/validations/record.validation"
import { toast } from "sonner"
import { showConfirmDialog, showLoadingDialog } from "../dialogs/Comman"
import Swal from "sweetalert2"


export const useRecordHandlers = () => {
    const [createRecord, { isLoading: createRecordLoading }] = useCreateRecordMutation()
    const [updateRecord, { isLoading: updateRecordLoading }] = useUpdateRecordMutation()
    const [deleteRecord, { isLoading: deleteRecordLoading }] = useDeleteRecordMutation()
    const [addMember, { isLoading: addMemberLoading }] = useAddMemberMutation()

    const handleSaveRecord = async ({
        values,
        recordId,
        onSuccess,
    }: {
        values: IRecordFormValues;
        recordId?: string;
        onSuccess?: () => void;
    }) => {
        try {
            const res = recordId
                ? await updateRecord({ values, recordId }).unwrap()
                : await createRecord(values).unwrap();

            toast.success(
                res.message ??
                (recordId
                    ? "Record updated successfully"
                    : "Record created successfully")
            );

            onSuccess?.();
        } catch (error: any) {
            toast.error(
                error?.data?.message ??
                (recordId
                    ? "Failed to update record"
                    : "Failed to create record")
            );
        }
    };

    const handleDeleteRecord = async (id: string) => {
        try {
            const confirmed = await showConfirmDialog(
                `Are you sure? You will lose all entries of this book permanently.`,
                "This action cannot be undone. All entry will be permanently deleted.",
                {
                    confirmButtonText: "Yes, Delete",
                    cancelButtonText: "Cancel",
                    icon: "warning"
                }
            );
            if (!confirmed) return;
            showLoadingDialog("Deleting...");
            await deleteRecord(id).unwrap();
            Swal.close();
            toast.success(
                "Record deleted successfully"
            );
        } catch (error: any) {
            toast.error(
                error?.data?.message ||
                "Failed to delete record"
            )
            Swal.close();
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
                "Failed to add member"
            );
        }
    }

    return {
        handleSaveRecord,
        handleDeleteRecord,
        handleAddMember,

        isloading: createRecordLoading || updateRecordLoading,
        deleteRecordLoading,
        addMemberLoading
    }
}