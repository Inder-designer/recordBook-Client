import { useMemo } from "react";

import { useFindUserQuery } from "@/redux/baseApi";
import { useDebounce } from "@/hooks/useDebounce";

import { IMember } from "@/types/IRecord";
import { IUser } from "@/types/IUser";

interface UseMemberSearchProps {
    email: string;
    members: IMember[];
}

export function useMemberSearch({
    email,
    members,
}: UseMemberSearchProps) {
    const debouncedEmail = useDebounce(email.trim(), 500);

    const shouldSearch = useMemo(
        () =>
            debouncedEmail.length > 0 &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(debouncedEmail),
        [debouncedEmail]
    );

    const {
        data,
        isFetching,
        isError,
        error,
    } = useFindUserQuery(debouncedEmail, {
        skip: !shouldSearch,
    });

    const user: IUser | undefined =
        isFetching || isError ? undefined : data;

    const alreadyMember = useMemo(
        () =>
            !!user &&
            members.some(
                (member) => member.user._id === user._id
            ),
        [members, user]
    );

    const memberError = useMemo(() => {
        if (!shouldSearch) return undefined;

        if (
            isError &&
            error &&
            "data" in error &&
            (error.data as any)?.message === "User not found"
        ) {
            return "User not found.";
        }

        if (alreadyMember) {
            return "This user is already a member.";
        }

        return undefined;
    }, [
        shouldSearch,
        isError,
        error,
        alreadyMember,
    ]);

    return {
        user:
            memberError || isFetching
                ? undefined
                : user,

        isSearching: isFetching,

        alreadyMember,

        memberError,

        shouldSearch,
    };
}