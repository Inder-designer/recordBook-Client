"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthTabs() {
  const pathname = usePathname();
  console.log(pathname, pathname === "/auth/login");
  

  return (
    <div className="bg-gray-100 rounded-lg p-1 flex mb-8">
      <Link
        href="/auth/login"
        className={`w-1/2 text-center font-semibold py-1 rounded-md ${
          pathname === "/auth/login"
            ? "bg-white shadow"
            : "text-gray-500"
        }`}
      >
        Sign in
      </Link>

      <Link
        href="/auth/signup"
        className={`w-1/2 text-center font-semibold py-1 rounded-md ${
          pathname === "/auth/signup"
            ? "bg-white shadow"
            : "text-gray-500"
        }`}
      >
        Sign up
      </Link>
    </div>
  );
}