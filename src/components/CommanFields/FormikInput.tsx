import React from "react";
import { useField } from "formik";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import PhoneFormikInput from "./PhoneFormikInput";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface FormikInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  description?: string;
  options?: { label: React.ReactNode; value: string }[];
  step?: number;
  required?: boolean;
  disabled?: boolean;
  min?: string | number;
  rows?: number;
  country?: string;
  zipcode?: boolean;
  [key: string]: unknown;
}
export const FormikInput: React.FC<FormikInputProps> = ({
  name,
  label,
  placeholder,
  type = "text",
  className,
  description,
  options,
  step,
  required,
  min,
  disabled,
  rows,
  country,
  zipcode = false,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && meta.error;

  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <Textarea
            id={name}
            placeholder={placeholder}
            className={`${hasError ? "border-red-500" : ""} !focus-visible:ring-0 !ring-0 !focus:border-primary focus-visible:border-primary ${className}`}
            rows={rows}
            {...field}
            {...props}
            disabled={disabled}
          />
        );

      case "select":
        return (
          <Select
            value={field.value}
            onValueChange={(value) => {
              helpers.setValue(value);
              helpers.setTouched(true);
            }}
            disabled={disabled}
          >
            <SelectTrigger
              className={`w-full h-10 ${hasError ? "border-red-500" : ""
                } ${className}`}
            >
              <SelectValue
                placeholder={
                  placeholder
                    ? `Select ${placeholder}`
                    : `Select ${label}`
                }
              />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {options?.map((option) => (
                  <SelectItem
                    key={String(option.value)}
                    value={String(option.value)}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={(checked) => {
                helpers.setValue(checked === true);
                // helpers.setTouched(true);
                // helpers
              }}
              {...props}
              disabled={disabled}
            />
            {
              label && (
                <Label
                  htmlFor={name}
                  className="text-sm font-normal cursor-pointer"
                >
                  {label}
                </Label>
              )
            }
          </div>
        );

      case "number":
        return (
          <Input
            id={name}
            type="number"
            step={step || 1}
            min={min}
            placeholder={placeholder || "0"}
            className={`${hasError ? "border-red-500" : ""} !focus-visible:ring-0 !ring-0 !focus:border-primary focus-visible:border-primary h-10 ${className}`
            }
            {...field}
            {...props}
            disabled={disabled}
          />
        );

      case "file":
        return (
          <>
            <input
              type="file"
              id={name}
              name={name}
              disabled={disabled}
              className="w-full px-4 rounded-lg border py-1.5 h-10"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const file: File | undefined = event.currentTarget.files?.[0];
                helpers.setValue(file);
                // helpers.setTouched(true, true);
              }}
            />
          </>
        );

      case "phone":
        return (
          <PhoneFormikInput
            name={name}
            // label={label}
            placeholder={placeholder}
            className={className}
            required={required}
            description={description}
            disabled={disabled}
          />
        );

      default:
        return (
          <Input
            id={name}
            type={type}
            disabled={disabled}
            placeholder={type === "date" && !field.value ? "" : placeholder}
            min={type === "date" ? min : undefined}
            className={`${hasError ? "border-red-500" : ""} !focus-visible:ring-0 ring-0! !focus:border-primary focus-visible:border-primary h-10 ${className}`}
            {...field}
            {...props}
          />
        );
    }
  };

  return (
    <div className="space-y-2" >
      {label && type !== "checkbox" && type !== "radio" && <Label className="text-color2 mb-1.5! inline-block" htmlFor={name}> {label} <span className="text-red-600">{required && "*"}</span> </Label>}
      {renderInput()}
      {description && <p className="text-xs text-gray-500" > {description} </p>}
      {hasError && <p className="text-xs text-red-500" > {meta.error} </p>}
    </div>
  );
};