import React from "react";
type InputProps = {
  onInputChange?: React.ChangeEventHandler<HTMLInputElement>;
  inputPlaceholder?: string;
  inputName?: string;
  inputType?: string;
  inputClassName?: string;
  inputLabel?: string;
  inputId?: string | number;
  labelClassName?: string;
  inputContainerClassName?: string;
  inputRequired?: boolean;
  inputValue?: string | number;
  checked?:boolean;
  submitValue?:string;
};
export default function Input({
  onInputChange,
  inputPlaceholder,
  inputName,
  inputType,
  inputClassName,
  inputLabel,
  inputId,
  labelClassName,
  inputContainerClassName,
  inputRequired,
  inputValue,
  checked,
  submitValue,
  ...props
}: InputProps) {
  return (
    <div className={inputContainerClassName}>
      <label className={`text-secondary ${labelClassName || ""}`}>
        {inputLabel || ""}
        {inputRequired ? "*" : ""}
      </label>
      <input
        onChange={onInputChange}
        placeholder={inputPlaceholder}
        name={inputName}
        checked={checked}
        type={inputType}
        value = {submitValue || inputValue}
        className={`${inputClassName} ${
          inputType == "submit"
            ? "max-w-[13rem] bg-blue text-white px-10 py-2 rounded-sm font-semibold tracking-tight"
            : inputType == "checkbox"
            ? "border rounded-sm border-secondary outline-none  text-white placeholder-gray absolute left-0 mt-[.2rem] transform scale-200"
            : "border rounded-sm border-secondary outline-none  text-secondary placeholder-gray"
        }`}
        {...props}
      />
    </div>
  );
}
