import * as Yup from "yup";
import { emailValidation, passwordValidation } from "./Comman";
import { capitalizeWords } from "@/utils/common";

export const loginValidation = () =>
    Yup.object().shape({
        email: emailValidation,
        password: Yup.string()
            .required("Password is required")
    })

export const signupValidation = () =>
    Yup.object().shape({
        email: emailValidation,
        password: passwordValidation
    })

export const authIntialvalues = {
    email: "",
    password: ""
}

export const nameChangeValidation =
    Yup.object().shape({
        fullName: Yup.string()
            .required("Name is required").max(100, "Name must be at most 100 characters long").trim()
    })

export const nameIntialvalues = (fullName?: string) => ({
    fullName: capitalizeWords(fullName) || "",
})

