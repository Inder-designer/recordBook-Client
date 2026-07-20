import { useState } from "react";
import { Label } from "../ui/label";
import { FormikInput } from "./FormikInput";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";

const PasswordField = ({ name, label, placeholder, required }: { name: string; label: string; placeholder: string; required: boolean }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <div className="col-span-2">
            <Label className="text-color2 !mb-1.5 inline-block" htmlFor={name}> {label} {required && "*"} </Label>
            <div className="relative">
                <FormikInput
                    name={name}
                    type={passwordVisible ? "text" : "password"}
                    placeholder={placeholder}
                />
                <div className="absolute inset-y-0 right-0 top-1/2 -translate-y-1/2 pr-4 flex items-center">
                    {passwordVisible ? (
                        <VisibilityOffOutlined className="!text-lg cursor-pointer"
                            onClick={() => setPasswordVisible(false)}
                        />
                    ) : (
                        <VisibilityOutlined className="!text-lg cursor-pointer"
                            onClick={() => setPasswordVisible(true)}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default PasswordField;