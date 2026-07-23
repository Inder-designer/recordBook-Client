import { useEffect, useState, type ReactNode } from "react";
import { Check, UserPlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { IMember, IRecord } from "@/types/IRecord";
import { Form, Formik, useFormikContext } from "formik";
import { FormikInput } from "../CommanFields/FormikInput";
import Loader from "../Loader/Loader";
import { MEMBER_ROLE_LABEL } from "@/utils/common";
import { Badge } from "../ui/badge";
import { useFindUserQuery } from "@/redux/baseApi";
import { useDebounce } from "@/hooks/useDebounce";
import { IUser } from "@/types/IUser";
import { useRecordPermissions } from "@/hooks/useRecordPermissions";
import { addMemberValidation } from "@/formik/validations/record.validation";
import RemoveMemberPopup from "../popup/RemoveMemberPopup";
import MemberMenu from "../dropdownMenu/MemberMenu";
import ConfirmationDialog from "./ConfirmationDialog";
import { useRecordHandlers } from "../handlers/record.handlers";
import RemoveMemberDialog from "../members/RemoveMemberDialog";
import AddMemberForm from "../members/AddMemberForm";
import AddMember from "../members/AddMember";
import MembersList from "../members/MembersList";
import ChangeRoleDialog from "../members/ChangeRoleDialog";

interface MembersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: IRecord;
  trigger?: ReactNode
}
type MemberDialog =
  | {
    type: "remove";
    member: IMember;
  }
  | {
    type: "change-role";
    member: IMember;
  }
  | null;
type Step = "find-user" | "select-role";

export function MembersDialog({ open, onOpenChange, record, trigger }: MembersDialogProps) {
  const { user, canManageMembers } = useRecordPermissions(record)
  const [selectedUser, setSelectedUser] = useState<IUser | undefined>()
  const [step, setStep] = useState<Step>("find-user");
  const members = record.members ?? [];

  const [dialog, setDialog] =
    useState<MemberDialog>(null);

  const handleClose = (open: boolean) => {
    if (!open) {
      setStep("find-user");
      setSelectedUser(undefined);
      setDialog(null)
    }

    onOpenChange(open);
  };
  return (
    <Dialog
      open={open}
      onOpenChange={handleClose}
    >
      <DialogContent>
        {dialog?.type === "change-role" ? (
          <ChangeRoleDialog
            member={dialog.member}
            recordId={record._id}
            onBack={() => setDialog(null)}
            onSuccess={() => setDialog(null)}
          />
        ) : (step === "find-user" ?
          <>
            <DialogHeader>
              <DialogTitle>Members of {record.title} book</DialogTitle>
              <DialogDescription>
                Add teammates who share this record.
              </DialogDescription>
            </DialogHeader>

            {canManageMembers && (
              <AddMemberForm
                members={members}
                onNext={(user) => {
                  setSelectedUser(user);
                  setStep("select-role");
                }}
              />
            )}
            <MembersList
              members={members}
              currentUser={user}
              canManageMembers={
                canManageMembers
              }
              onRemove={(member) =>
                setDialog({
                  type: "remove",
                  member,
                })
              }
              onChangeRole={(member) =>
                setDialog({
                  type: "change-role",
                  member,
                })
              }
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>

          </>
          :
          <AddMember
            user={selectedUser}
            recordId={record._id}
            onBack={() => setStep("find-user")}
            onSuccess={() => {
              setSelectedUser(undefined);
              setStep("find-user");
              // onOpenChange(false);
            }}
          />
        )
        }

        <RemoveMemberDialog
          open={dialog?.type === "remove"}
          member={
            dialog?.type === "remove"
              ? dialog.member
              : null
          }
          recordId={record._id}
          onOpenChange={(open) => {
            if (!open) {
              setDialog(null);
            }
          }}
        />
      </DialogContent>
    </Dialog >
  );
}
