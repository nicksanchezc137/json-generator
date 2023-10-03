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
      <label className={`text-white ${labelClassName || ""}`}>
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
            ? "max-w-[13rem] bg-white text-black px-10 py-2 rounded-full font-semibold tracking-tight"
            : inputType == "checkbox"
            ? "border-b border-[#A3BEAE] outline-none bg-[#5B8B6C] text-white placeholder-[#A3BEAE]"
            : "border-b border-[#A3BEAE] outline-none bg-[#5B8B6C] text-white placeholder-[#A3BEAE]"
        }`}
        {...props}
      />
    </div>
  );
}
