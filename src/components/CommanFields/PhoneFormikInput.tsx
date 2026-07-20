import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useField, useFormikContext } from "formik";

interface PhoneFormikInputProps {
    name: string;
    label?: string;
    placeholder?: string;
    labelClass?: string;
    className?: string;
    defaultCountry?: string;
    required?: boolean;
    description?: string;
    disabled?: boolean;
}

const PhoneFormikInput: React.FC<PhoneFormikInputProps> = ({
    name,
    label,
    placeholder,
    defaultCountry = "in",
    labelClass,
    required = false,
    description,
    disabled = false,
    className = ""
}) => {
    const [field, meta,] = useField(name);
    const { setFieldValue } = useFormikContext();
    const hasError = meta.touched && meta.error;

    return (
        // <div className="space-y-2">
        <PhoneInput
            inputStyle={{
                width: "100%",
                border: "none",
                height: "40px"
            }}
            buttonStyle= {{
                paddingLeft: "8px",
                border: "none"
            }}
            inputClass={className}
            containerStyle={{ width: "100%" }}
            country={defaultCountry}
            placeholder={placeholder || "Enter phone number"}
            value={field.value}
            disabled={disabled}
            onChange={(value: string | undefined) => {
                if (value === "+" || value === "" || (value && /^\d{1,3}$/.test(value))) {
                    setFieldValue(name, "");
                } else {
                    setFieldValue(name, value?.startsWith("+") ? value : `+${value}`);
                }
            }}
        />
        // </div>
    );
};

export default PhoneFormikInput;
