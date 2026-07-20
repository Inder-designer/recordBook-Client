'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetMeQuery } from '@/redux/baseApi';
import { clearUser, setLoading, setUser } from '@/redux/Slices/AuthSlice';
import Loader from '../Loader/Loader';

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const dispatch = useDispatch();

    const {
        data: user,
        isLoading,
        isSuccess,
        isError,
    } = useGetMeQuery(undefined);

    useEffect(() => {
        dispatch(setLoading(true));
    }, [dispatch]);

    useEffect(() => {
        if (isSuccess) {
            dispatch(setUser(user));
        }

        if (isError) {
            dispatch(clearUser());
        }
    }, [isSuccess, isError, user, dispatch]);

    if (isLoading) {
        return <Loader />;
    }

    return <>{children}</>;
}