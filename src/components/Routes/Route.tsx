'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { RootState } from '@/redux/store/store';
import Loader from '../Loader/Loader';

export const UserRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(`/auth/login`);
    }
  }, [isLoading, isAuthenticated, pathname, router]);

  if (isLoading) return <Loader />;

  if (!isAuthenticated) return null;

  return <>{children}</>;
};

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const from = searchParams.get("from");
      router.replace(from || "/");
    }
  }, [isLoading, isAuthenticated, router, searchParams]);

  if (isLoading) return <Loader />;
  if (isAuthenticated) return null;

  return <>{children}</>;
};

export default function PageTransitionLoader({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  // Track navigation changes
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [pathname]);

  if (loading) return <Loader />;

  return <>{children}</>;
}
