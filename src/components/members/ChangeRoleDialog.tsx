"use client";

import { useState } from "react";

import {
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


import { IMember } from "@/types/IRecord";
import { useRecordHandlers } from "../handlers/record.handlers";
import MemberRoleSelector from "./MemberRoleSelector";
import { initialsGenerate, MEMBER_ROLE_LABEL } from "@/utils/common";

interface Props {
    member: IMember;
    recordId: string;

    onBack: () => void;
    onSuccess: () => void;
}

export default function ChangeRoleDialog({
    member,
    recordId,
    onBack,
    onSuccess,
}: Props) {
    const [role, setRole] = useState(member.role);

    const {
        handleUpdateMemberRole,
        updateMemberRoleLoading,
    } = useRecordHandlers();

    return (
        <>
            <DialogHeader>
                <DialogTitle>
                    Change Member Role
                </DialogTitle>
            </DialogHeader>

            <div className="mt-4">
                <div className="border rounded p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="bg-gray-400 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg">
                            {initialsGenerate(member.user?.fullName)}
                        </span>
                        <div>
                            <p className="text-lg font-medium capitalize">{member.user?.fullName}</p>
                            <p className="">{member.user?.email}</p>
                        </div>
                    </div>

                    <Badge>
                        Current: {MEMBER_ROLE_LABEL[member.role]}
                    </Badge>
                </div>

                <div className="mt-5">
                    <MemberRoleSelector
                        role={role}
                        onChange={setRole}
                    />
                </div>

                <div className="mt-5 flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={onBack}
                    >
                        Cancel
                    </Button>

                    <Button
                        disabled={
                            role === member.role
                            // updateMemberRoleLoading
                        }
                        onClick={() =>
                            handleUpdateMemberRole(
                                recordId,
                                member.user._id,
                                role,
                                onSuccess
                            )
                        }
                    >
                        {updateMemberRoleLoading
                            ? "Updating..."
                            : "Update Role"}
                    </Button>
                </div>
            </div >
        </>
    );
}