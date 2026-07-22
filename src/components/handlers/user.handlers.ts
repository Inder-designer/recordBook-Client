import { useUpdateUserMutation } from "@/redux/baseApi";
import { toast } from "sonner";

export const useUserHandlers = () => {
    const [updateUser, { isLoading }] = useUpdateUserMutation()

    const handleUpdateUser = async (values: { fullName: string }, onSuccess: () => void) => {
        try {
            await updateUser(values).unwrap();
            toast.success("Name updated successfully!");
            onSuccess()
        } catch (error: any) {
            toast.error(error?.data?.message || "Name update failed. Please try again.");
        }
    }

    return { handleUpdateUser, isLoading };
}