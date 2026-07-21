import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { IRecord } from "@/types/IRecord";

export function useCurrentMember(record?: IRecord) {
    const { user } = useSelector((state: RootState) => state.auth);

    const member = useMemo(
        () => record?.members.find((m) => m.user._id === user?._id),
        [record, user?._id]
    );

    return {
        user,
        member,
    };
}