"use client"
import { FormikInput } from "@/components/CommanFields/FormikInput";
import { useUserHandlers } from "@/components/handlers/user.handlers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { nameChangeValidation, nameIntialvalues } from "@/formik/validations/auth.validation";
import { RootState } from "@/redux/store/store";
import { Form, Formik } from "formik";
import { ArrowLeft, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

type EditState = "name" | "email" | "number" | null
export default function page() {
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter()
    const { user } = useSelector((state: RootState) => state.auth);
    const { handleUpdateUser, isLoading } = useUserHandlers()
    const [edit, setEdit] = useState<EditState>(null)

    const handleEdit = () => {
        setEdit("name");

        requestAnimationFrame(() => {
            const input = inputRef.current;

            if (!input) return;

            input.focus();

            const length = input.value.length;

            input.setSelectionRange(length, length);
        });
    };
    const handleCancelEdit = () => {
        setEdit(null);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="py-5 flex gap-3 items-center">
                <button className="cursor-pointer" onClick={() => router.back()}><ArrowLeft /></button>
                <p className="font-medium text-xl">Your Profile Details</p>
            </div>
            <div className="border p-4 rounded-md">
                <div>
                    <Formik
                        initialValues={nameIntialvalues(user?.fullName)}
                        validationSchema={nameChangeValidation}
                        enableReinitialize
                        onSubmit={(values) => handleUpdateUser(values, () => setEdit(null))}
                    >
                        {({ resetForm }) => (
                            <Form>
                                <div className="mb-3">
                                    <Label className="text-color2 mb-1.5! inline-block">Name <span className="text-red-600">*</span></Label>
                                    <div className="relative">
                                        <Tooltip delayDuration={500}>
                                            <TooltipTrigger asChild>
                                                <FormikInput
                                                    ref={inputRef}
                                                    name="fullName"
                                                    required
                                                    className={`${edit != "name" && "opacity-100! cursor-default! pr-16 truncate"}`}
                                                    disabled={edit != "name"}
                                                />
                                            </TooltipTrigger>
                                            <TooltipContent side="bottom">
                                                <p className="break-all">{user?.fullName}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                        {edit != "name" && (
                                            <button
                                                className="absolute right-0 top-0 h-full px-3 border-l cursor-pointer"
                                                onClick={handleEdit}
                                            >
                                                <Pencil className="w-5 h-5 text-primary" />
                                            </button>
                                        )}
                                    </div>
                                    {edit === "name" && (
                                        <div className="mt-2 flex justify-end gap-4">
                                            <Button
                                                disabled={isLoading}
                                                variant={"outline"}
                                                onClick={() => { resetForm(); handleCancelEdit() }}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? "Updating..." : "Update"}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </Form>
                        )}

                    </Formik>
                </div>
                <div className="mt-5">
                    <Label className="mb-1.5 inline-block">
                        Email <span className="text-red-600">*</span>
                    </Label>

                    <Input
                        type="email"
                        value={user?.email ?? ""}
                        readOnly
                        disabled
                        className={`opacity-100! cursor-default! h-10`}
                    />
                </div>
            </div>
        </div>
    )
}
