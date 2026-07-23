"use client";

import { Form, useFormikContext } from "formik";
import { Check, UserPlus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FormikInput } from "@/components/CommanFields/FormikInput";

import Loader from "@/components/Loader/Loader";

import { useMemberSearch } from "@/hooks/useMemberSearch";

import { IMember } from "@/types/IRecord";
import { IUser } from "@/types/IUser";

interface Props {
    members: IMember[];
    onNext: (user: IUser) => void;
}

export default function AddMemberFormFields({
    members,
    onNext,
}: Props) {
    const { values, errors } =
        useFormikContext<{ email: string }>();

    const {
        user,
        memberError,
        isSearching,
    } = useMemberSearch({
        email: values.email,
        members,
    });

    return (
        <Form
            onSubmit={(e) => {
                e.preventDefault();

                if (user) {
                    onNext(user);
                }
            }}
            className="space-y-3"
        >
            <div className="grid gap-2">
                <div className="relative">
                    <FormikInput
                        label="Email"
                        name="email"
                        required
                    />

                    <span className="absolute right-3 top-9">
                        {isSearching && (
                            <Loader
                                type="spinner"
                                classes="!h-4 !w-4 !border-[3px]"
                            />
                        )}

                        {!isSearching && user && (
                            <Check className="h-4 w-4 text-green-600" />
                        )}

                        {!isSearching &&
                            memberError && (
                                <X className="h-4 w-4 text-red-600" />
                            )}
                    </span>
                </div>

                {memberError &&
                    !errors.email && (
                        <p className="text-xs text-red-500">
                            {memberError}
                        </p>
                    )}

                {user && (
                    <span className="text-xs font-medium italic text-green-600 capitalize">
                        Record-Book user found! {user.fullName}
                    </span>
                )}
            </div>

            <div className="flex justify-end">
                <Button
                    type="submit"
                    size="sm"
                    disabled={!user}
                >
                    <UserPlus className="mr-1 h-4 w-4" />
                    Add Member
                </Button>
            </div>
        </Form>
    );
}