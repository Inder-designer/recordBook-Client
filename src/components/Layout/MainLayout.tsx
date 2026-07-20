"use client"
import { usePathname } from "next/navigation";
import Header from "../header/Header";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isHomePage = pathname === "/";
    // const { isLoading } = use();

    // if (isLoading) return <Loader />;
    return (
        <div className="relative max-w-300 w-full mx-auto">
            {isHomePage && <Header />}
            <div className={``}>{children}</div>
        </div>
    );
}