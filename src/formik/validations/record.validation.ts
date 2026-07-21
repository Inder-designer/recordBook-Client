import { IRecord } from "@/types/IRecord";
import * as Yup from "yup";
import { emailValidation } from "./Comman";

export interface IRecordFormValues {
    title: string;
    description: string;
}

export const recordValidation =
    Yup.object().shape({
        title: Yup
            .string()
            .trim()
            .required("Title is required")
            .min(
                3,
                "Title must be at least 3 characters"
            )
            .max(
                100,
                "Title cannot exceed 100 characters"
            ),
        description: Yup.string()
            .trim()
            .max(
                500,
                "Description cannot exceed 500 characters"
            )
    })

export const recordInitialValues = (
    data?: Partial<IRecord>
): IRecordFormValues => ({
    title: data?.title ?? "",
    description: data?.description ?? "",
});

export const addMemberValidation =
    Yup.object().shape({
        email: emailValidation
    })

