import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UseFormRegisterReturn } from "react-hook-form";
import { HTMLInputTypeAttribute } from "react";

interface FormFieldProps extends React.ComponentProps<"input"> {
  label: string;
  id: string;
  register?: UseFormRegisterReturn;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  error?: string;
}

export default function FormField({
  label,
  id,
  placeholder,
  register,
  error,
  type = "text",
  ...props
}: FormFieldProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>

      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register}
        {...props}
        className=""
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
