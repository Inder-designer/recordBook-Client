"use client"
import { usePathname } from "next/navigation";
import Header from "../header/Header";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const showHeader = [
        "/",
        "/profile"
    ];
    const isHomePage = showHeader.includes(pathname || "");
    // const { isLoading } = use();

    // if (isLoading) return <Loader />;
    return (
        <div className="relative w-full mx-auto">
            <Header />
            <div className={`max-w-350 mx-auto`}>{children}</div>
        </div>
    );
}