import { ChevronDown, ChevronRight, LogOut, Settings } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useLogoutMutation } from "@/redux/baseApi";
import { useRouter } from "next/navigation";

export function ProfileMenu() {
    const router = useRouter()
    const { user } = useSelector((state: RootState) => state.auth);
    const [logOut] = useLogoutMutation()
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div
                        className="flex cursor-pointer items-center gap-2 rounded-lg border border-transparent px-3 py-2 transition-all duration-200 hover:border-border hover:bg-muted"
                    >
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                            {user?.initials}
                        </div>

                        <div className="flex flex-col">
                            <span className="max-w-40 truncate text-sm font-medium capitalize">
                                {user?.fullName}
                            </span>
                            {/* <span className="text-xs text-muted-foreground">
                                {user?.email}
                            </span> */}
                        </div>

                        <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60 p-0">
                    <DropdownMenuItem btn onSelect={() => router.push("/profile")}>
                        <div
                            className="flex cursor-pointer items-center gap-3 rounded-lg border border-transparent"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                                {user?.initials}
                            </div>

                            <div className="flex flex-col">
                                <span className="max-w-40 truncate text-sm font-medium capitalize">
                                    {user?.fullName}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {user?.email}
                                </span>
                                <span className="text-[13px] text-blue-600 font-medium mt-0.5">
                                    Your Profile <ChevronRight className="inline-block w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="mt-0 mb-2" />
                    <DropdownMenuItem btn onClick={async () => await logOut({}).unwrap()}>
                        <div className="flex gap-1 py-1 opacity-80 hover:opacity-100 w-full">
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Logout</span>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="mb-0 mt-2" />
                </DropdownMenuContent>
            </DropdownMenu >
        </>
    )
}