import { IRecord, MemberRole } from "@/types/IRecord";
import { useCurrentMember } from "./useCurrentMember";
import { canManageEntries, isOwnerOrAdmin } from "@/utils/common";

export function useRecordPermissions(record?: IRecord) {
    const { user, member } = useCurrentMember(record);

    return {
        user,
        member,
        canEditBook: isOwnerOrAdmin(member?.role),
        canManageMembers: isOwnerOrAdmin(member?.role),
        canAddEntry: canManageEntries(member?.role),
        canManageEntries: isOwnerOrAdmin(member?.role),
        isOwner: member?.role === MemberRole.OWNER,
    };
}