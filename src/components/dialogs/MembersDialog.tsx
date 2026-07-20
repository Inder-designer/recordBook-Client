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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { IMember, IRecord } from "@/types/IRecord";
import { Form, Formik, useFormikContext } from "formik";
import { FormikInput } from "../CommanFields/FormikInput";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { isOwnerOrAdmin, MEMBER_ROLE_LABEL } from "@/utils/common";
import { Badge } from "../ui/badge";
import { emailValidation } from "@/formik/validations/Comman";
import { useFindUserQuery } from "@/redux/baseApi";
import { useDebounce } from "@/hooks/useDebounce";
import { IUser } from "@/types/IUser";
import { se } from "date-fns/locale";
import AddMember from "../AddMember/AddMember";

interface MembersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: IRecord;
  trigger?: ReactNode
}

export function MembersDialog({ open, onOpenChange, record, trigger }: MembersDialogProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  const [selectedUser, setSelectedUser] = useState<IUser | undefined>()
  type Step = "find-user" | "select-role";
  const [step, setStep] = useState<Step>("find-user");
  const members = record.members ?? [];
  const you = record.members.find((m) => m.user._id === user?._id)

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
              {isOwnerOrAdmin(you?.role) &&
                <div className="mb-4">
                  <Formik
                    initialValues={{ email: "" }}
                    validationSchema={emailValidation}
                    enableReinitialize
                    onSubmit={() => {
                      if (selectedUser) {
                        setStep("select-role");
                      }
                    }}
                  >
                    {() => (
                      <Form className="space-y-3">
                        <div className="grid gap-2 grid-cols-1 mb-3">
                          <div className="relative">
                            <FormikInput
                              label="Email"
                              name="email"
                              required
                            />

                            <FindUser onFound={setSelectedUser} />
                          </div>
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
                    {members.map((m: IMember) => {
                      console.log(isOwnerOrAdmin(you?.role));
                      return (
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
                              isOwnerOrAdmin(you?.role) && (
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
                      )
                    })}
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
}: {
  onFound: (user: IUser | undefined) => void;
}) {
  const { values, errors } = useFormikContext<{ email: string }>();

  const debouncedEmail = useDebounce(values.email, 500);
  const shouldSearch =
    debouncedEmail.length > 0 &&
    !errors.email &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(debouncedEmail);

  const {
    data: foundUser,
    isFetching,
    isError,
  } = useFindUserQuery(debouncedEmail, {
    skip: !shouldSearch,
  });
  useEffect(() => {
    onFound(foundUser);
  }, [foundUser, onFound]);

  return (
    <span className="absolute right-3 top-9">
      {isFetching && (
        <Loader
          type="spinner"
          classes="!w-4 !h-4 !border-[3px]"
        />
      )}

      {!isFetching && foundUser && (
        <Check className="h-4 w-4 text-green-600" />
      )}

      {!isFetching && isError && (
        <X className="h-4 w-4 text-red-600" />
      )}
    </span>
  );
}