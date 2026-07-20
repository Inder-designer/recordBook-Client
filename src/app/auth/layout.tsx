import { PublicRoute } from '@/components/Routes/Route'
import AuthTabs from '@/components/Tabs/AuthTabs'
import { Button } from '@/components/ui/button'
// import { AuthProvider } from '@/Context/Auth'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function layout({
  children,
}: {
  children: React.ReactNode
}) {

  // async function handleGoogle() {
  //   setBusy(true);
  //   const result = await lovable.auth.signInWithOAuth("google", {
  //     redirect_uri: window.location.origin,
  //   });
  //   if (result.error) {
  //     setBusy(false);
  //     toast.error(result.error.message ?? "Google sign-in failed");
  //     return;
  //   }
  //   if (result.redirected) return;
  //   navigate({ to: "/" });
  // }
  return (
    <div>
      <PublicRoute>
        <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
          <div className="w-full max-w-md">

            {/* Logo */}
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Cash Book</h1>
                <p className="text-xs text-muted-foreground">
                  Manage your record books
                </p>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">

              {/* Navigation */}
              <AuthTabs />

              {children}

              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  or
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
              // onClick={handleGoogle}
              // disabled={busy}
              >
                <GoogleIcon className="mr-2 h-4 w-4" />
                Continue with Google
              </Button>
            </div>
          </div>
        </main>
      </PublicRoute>
    </div>
  )
}

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.2 1.4-1.7 4.2-5.5 4.2-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 3.4 14.7 2.4 12 2.4 6.7 2.4 2.5 6.7 2.5 12s4.2 9.6 9.5 9.6c5.5 0 9.1-3.9 9.1-9.3 0-.6-.1-1.1-.2-1.6H12z"
      />
    </svg>
  );
}