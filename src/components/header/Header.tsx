import { BookOpen } from "lucide-react"
import { ProfileMenu } from "../dropdownMenu/ProfileMenu"
import { useRouter } from "next/navigation"

const Header = () => {
    const router = useRouter()
    return (
        <div className="border-b">
            <header className="max-w-350 mx-auto bg-card">
                <div className="mx-auto flex items-center justify-between gap-3 px-4 py-3.5 sm:py-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex h-8 sm:h-10 w-8 sm:w-10 items-center justify-center rounded-lg bg-primary">
                            <BookOpen className="h-3.5 sm:h-5 w-3.h-3.5 sm:w-5 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-foreground cursor-pointer" onClick={() => router.push("/")}>
                                Cash Book
                            </h1>
                            <p className="text-xs text-muted-foreground hidden sm:block">
                                Manage your record books
                            </p>
                        </div>
                    </div>
                    <ProfileMenu />
                </div>
            </header>
        </div>
    )
}

export default Header
