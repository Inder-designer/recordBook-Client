import * as Yup from "yup";
// import { parsePhoneNumberFromString } from "libphonenumber-js";

export const emailValidation = Yup.string()
    .email("Invalid email")
    .required("Email is required");
export const passwordValidation = Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[@$!%*?&]/, "Must contain at least one special character");

// export const numberSchema = Yup.string()
//     .required("Phone number is required")
//     .test("is-valid-phone", "Invalid phone number", (value) => {
//         if (!value) return false;

//         const formattedValue = value.startsWith("+") ? value : `+${value}`;
//         const phoneNumber = parsePhoneNumberFromString(formattedValue);

//         return phoneNumber?.isValid() || false;
//     });