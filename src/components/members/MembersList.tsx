"use client";

import { Label } from "@/components/ui/label";
import { IMember } from "@/types/IRecord";
import { IUser } from "@/types/IUser";

import { Badge } from "../ui/badge";
import { MEMBER_ROLE_LABEL } from "@/utils/common";
import MemberMenu from "../dropdownMenu/MemberMenu";

interface MembersListProps {
    members: IMember[];
    currentUser: IUser | null;
    canManageMembers: boolean;

    onRemove: (member: IMember) => void;
    onChangeRole: (member: IMember) => void;
}

export default function MembersList({
    members,
    currentUser,
    canManageMembers,
    onRemove,
    onChangeRole,
}: MembersListProps) {
    return (
        <div className="space-y-2 border-t pt-4">
            <Label className="text-xs text-muted-foreground">
                Current members ({members.length})
            </Label>

            {members.length === 0 ? (
                <div className="rounded-md border border-dashed py-5 text-center text-sm text-muted-foreground">
                    No members yet
                </div>
            ) : (
                <ul className="divide-y rounded-md border">
                    {members.map((member) => {
                        const isCurrentUser = currentUser?._id === member.user._id;
                        const isOwner = member.role === 1;
                        return (
                            <li key={member.user._id} className="flex items-center justify-between px-3 py-2">
                                <div className="min-w-0 flex-1">
                                    <p className="truncate font-medium">
                                        {isCurrentUser ? "You" : member.user.fullName}
                                    </p>

                                    <p className="truncate text-xs text-muted-foreground">
                                        {member.user.email}
                                    </p>
                                </div>

                                <div className="ml-4 flex shrink-0 items-center gap-2">
                                    <Badge>
                                        {MEMBER_ROLE_LABEL[member.role]}
                                    </Badge>

                                    {!isCurrentUser &&
                                        !isOwner &&
                                        canManageMembers && (
                                            <MemberMenu
                                                member={member}
                                                onChangeRole={onChangeRole}
                                                onRemove={onRemove}
                                            />
                                        )}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    );
}