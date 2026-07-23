import React from 'react'
import { Button } from '../ui/button'
import Popup from './Popup'
import { IMember } from '@/types/IRecord';
import { useRecordHandlers } from '../handlers/record.handlers';

interface WsDeletePopupProps {
    anchorEl: HTMLElement | null;
    open: boolean;
    onClose: () => void;
    member: IMember | null;
    recordId: string
}

export default function RemoveMemberPopup({ anchorEl, open, onClose, member, recordId }: WsDeletePopupProps) {
    const { handleRemoveMember, removeMemberLoading } = useRecordHandlers()
    const handleConfirm = () => {
        if (!member) return;

        handleRemoveMember(
            recordId,
            member.user._id,
            onClose
        );
    };
    return (
        <>
            <Popup
                placement="bottom-end"
                isOpen={open}
                onClose={onClose}
                anchorEl={anchorEl}
                maxWidth="350px"
                title={`Remove ${member?.user.fullName.toUpperCase()} from this record book?`}
                content={
                    <>
                        <p className="text-sm text-muted-foreground">
                            Are you sure?
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                            They will immediately lose access. You can invite them again later.
                        </p>
                        <div className="mt-2 flex justify-end gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={onClose}
                                disabled={removeMemberLoading}
                            >
                                Cancel
                            </Button>

                            <Button
                                size="sm"
                                variant="destructive"
                                disabled={removeMemberLoading}
                                onClick={handleConfirm}
                            >
                                {removeMemberLoading ? "Removing..." : "Remove"}
                            </Button>
                        </div>
                    </>
                }
            />
        </>
    )
}
