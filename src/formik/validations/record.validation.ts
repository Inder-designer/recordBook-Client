import * as Yup from "yup";

export interface IRecordFormValues {
    title: string;
    description: string;
}

export const createRecordValidation =
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

export const recordInitialValues: IRecordFormValues = {
    title: "",
    description: ""
}

