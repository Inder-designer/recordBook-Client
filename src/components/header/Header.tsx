import { BookOpen } from "lucide-react"
// import { AddBookDialog } from "../dialogs/AddBookDialog"
import { ProfileMenu } from "../dropdownMenu/ProfileMenu"

const Header = () => {
    return (
        <header className="border-b bg-card">
            <div className="mx-auto flex items-center justify-between gap-3 px-4 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                        <BookOpen className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-foreground">
                            Cash Book
                        </h1>
                        <p className="text-xs text-muted-foreground">
                            Manage your record books
                        </p>
                    </div>
                </div>
                {/* <AddBookDialog /> */}
                <ProfileMenu/>
            </div>
        </header>
    )
}

export default Header
