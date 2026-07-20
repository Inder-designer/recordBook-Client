import * as Yup from "yup";
import { emailValidation, passwordValidation } from "./Comman";

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

