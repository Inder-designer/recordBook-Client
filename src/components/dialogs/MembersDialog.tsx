import { useEffect, useState, type ReactNode } from "react";
import { BookPlus, Check, UserPlus, X } from "lucide-react";
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
import AddMember from "../AddMember/AddMember";
import { useRecordPermissions } from "@/hooks/useRecordPermissions";
import { addMemberValidation } from "@/formik/validations/record.validation";

interface MembersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: IRecord;
  trigger?: ReactNode
}

export function MembersDialog({ open, onOpenChange, record, trigger }: MembersDialogProps) {
  const { user, canManageMembers } = useRecordPermissions(record)
  const [selectedUser, setSelectedUser] = useState<IUser | undefined>()
  const [memberError, setMemberError] = useState<string>();
  type Step = "find-user" | "select-role";
  const [step, setStep] = useState<Step>("find-user");
  const members = record.members ?? [];

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          setStep("find-user");
          setSelectedUser(undefined);
        }

        onOpenChange(value);
      }}
    >
      <DialogContent>
        {step === "find-user" ?
          <div>
            <DialogHeader>
              <DialogTitle>Members of {record.title} book</DialogTitle>
              <DialogDescription>
                Add teammates who share this record.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4">
              {canManageMembers &&
                <div className="mb-4">
                  <Formik
                    initialValues={{ email: "" }}
                    validationSchema={addMemberValidation}
                    enableReinitialize
                    onSubmit={() => {
                      if (selectedUser) {
                        setStep("select-role");
                      }
                    }}
                  >
                    {({ errors }) => (
                      <Form className="space-y-3">
                        <div className="grid gap-2 grid-cols-1 mb-3">
                          <div className="relative">
                            <FormikInput
                              label="Email"
                              name="email"
                              required
                            />

                            <FindUser
                              onFound={setSelectedUser}
                              members={members}
                              onAlreadyMember={setMemberError}
                            />
                          </div>
                          {(memberError && !errors.email) && (
                            <p className="text-xs text-red-500">
                              {memberError}
                            </p>
                          )}
                          {selectedUser &&
                            <span className="text-xs text-green-600 font-medium capitalize italic">Record-Book user found! {selectedUser?.fullName}.</span>
                          }
                        </div>
                        <div className="flex justify-end">
                          <Button type="submit" size="sm" disabled={!selectedUser}>
                            <UserPlus className="mr-1 h-4 w-4" />
                            Add Member
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              }

              <div className="space-y-2 border-t border-gray-300 pt-4">
                <Label className="text-xs text-muted-foreground">
                  Current members ({members.length})
                </Label>
                {members.length === 0 ? (
                  <p className="rounded-md border border-dashed py-4 text-center text-sm text-muted-foreground">
                    No members yet
                  </p>
                ) : (
                  <ul className="divide-y rounded-md border">
                    {members.map((m: IMember) => (
                      <li
                        key={m.user._id}
                        className="flex items-center justify-between px-3 py-2 text-sm"
                      >
                        <div>
                          <p className="font-medium">
                            {user?._id === m.user._id ? "You" : m.user.fullName}
                          </p>
                          {m.user.email && (
                            <p className="text-xs text-muted-foreground">{m.user.email}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge>{MEMBER_ROLE_LABEL[m.role]}</Badge>
                          {(user?._id != m.user._id || m.role != 1) &&
                            canManageMembers && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                              //   onClick={() => removeMember(record.id, m.id)}
                              >
                                <>
                                  <X className="h-4 w-4" />
                                  <span className="sr-only">Remove</span>
                                </>
                              </Button>
                            )
                          }
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </div>
          </div>
          :
          <AddMember
            user={selectedUser}
            recordId={record._id}
            onBack={() => setStep("find-user")}
            onSuccess={() => {
              setSelectedUser(undefined);
              setStep("find-user");
              onOpenChange(false); // Close dialog
            }}
          />
        }
      </DialogContent>
    </Dialog >
  );
}

function FindUser({
  onFound,
  members,
  onAlreadyMember,
}: {
  onFound: (user: IUser | undefined) => void, members: IMember[], onAlreadyMember: (message?: string) => void;
}) {
  const { values, errors } =
    useFormikContext<{ email: string }>();

  const debouncedEmail = useDebounce(values.email, 500);
  const shouldSearch =
    debouncedEmail.length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(debouncedEmail);

  const {
    data: foundUser,
    isFetching,
    isError,
    error
  } = useFindUserQuery(debouncedEmail, {
    skip: !shouldSearch,
  });

  const user: IUser | undefined =
    isFetching || isError ? undefined : foundUser;
  const alreadyMember =
    !!user &&
    members.some((m) => m.user._id === user._id);

  useEffect(() => {
    if (isFetching) {
      onAlreadyMember(undefined);
      onFound(undefined);
      return;
    }
    if (isError && error && 'data' in error && (error.data as any)?.message === "User not found") {
      onFound(undefined);
      onAlreadyMember("User not found!");
      return;
    }

    if (!user) {
      onAlreadyMember(undefined);
      onFound(undefined);
      return;
    }

    if (alreadyMember) {
      onFound(undefined);
      onAlreadyMember("This user is already a member.");
      return;
    }

    onAlreadyMember(undefined);
    onFound(user);
    console.log(errors);

  }, [
    isFetching,
    user,
    alreadyMember,
    onFound,
    onAlreadyMember,
  ]);

  return (
    <span className="absolute right-3 top-9">
      {isFetching && (
        <Loader
          type="spinner"
          classes="!w-4 !h-4 !border-[3px]"
        />
      )}

      {!isFetching && user && !alreadyMember && (
        <Check className="h-4 w-4 text-green-600" />
      )}

      {!isFetching && (isError || alreadyMember) && (
        <X className="h-4 w-4 text-red-600" />
      )}
    </span>
  );
}