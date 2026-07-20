import { useLoginMutation } from "@/redux/baseApi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const useAuthHandlers = () => {
    const router = useRouter();
    const [login, { isLoading }] = useLoginMutation()

    const handleLogin = async (values: { email: string, password: string }) => {
        try {
            const response = await login(values).unwrap();
            toast.success("Login successful!");
            router.replace("/");
            console.log("Login successful:", response);
        } catch (error: any) {
            toast.error(error?.data?.message || "Login failed. Please try again.");
            // Handle login error, e.g., show error message
        }
    }

    return { handleLogin, isLoading: isLoading };
}