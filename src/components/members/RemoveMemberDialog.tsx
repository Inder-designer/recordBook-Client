"use client";

import ConfirmationDialog from "@/components/dialogs/ConfirmationDialog";
import { useRecordHandlers } from "@/components/handlers/record.handlers";
import { IMember } from "@/types/IRecord";

interface RemoveMemberDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;

    member: IMember | null;
    recordId: string;
}

export default function RemoveMemberDialog({
    open,
    onOpenChange,
    member,
    recordId,
}: RemoveMemberDialogProps) {
    const {
        handleRemoveMember,
        removeMemberLoading,
    } = useRecordHandlers();

    const handleConfirm = () => {
        if (!member) return;

        handleRemoveMember(
            recordId,
            member.user._id,
            () => onOpenChange(false)
        );
    };

    return (
        <ConfirmationDialog
            open={open}
            onOpenChange={onOpenChange}
            title="Remove Member"
            description={
                <>
                    Remove{" "}
                    <span className="font-medium text-foreground">
                        {member?.user.fullName}
                    </span>{" "}
                    from this record book?
                    <br />
                    <span className="text-xs text-muted-foreground">
                        They will immediately lose access. You can invite them again later.
                    </span>
                </>
            }
            confirmText="Remove"
            cancelText="Cancel"
            loading={removeMemberLoading}
            destructive
            onConfirm={handleConfirm}
        />
    );
}