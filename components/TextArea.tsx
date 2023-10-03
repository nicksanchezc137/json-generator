import React from "react";
  type TextareaProps = {
    onTextareaChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    textareaPlaceholder?: string;
    textareaName?: string;
    textareaType?: string;
    textareaClassName?: string;
    textareaLabel?: string;
    textareaId?: string | number;
    labelClassName?: string;
    textareaContainerClassName?: string;
    textareaRequired?: boolean;
    textareaValue?: string | number;
  };
  export default function Textarea({
    onTextareaChange,
    textareaPlaceholder,
    textareaName,
    textareaType,
    textareaClassName,
    textareaLabel,
    textareaId,
    labelClassName,
    textareaContainerClassName,
    textareaRequired,
    textareaValue,
    ...props
  }: TextareaProps) {
    return (
      <div className={textareaContainerClassName}>
        <label className={`text-white ${labelClassName || ""}`}>
          {textareaLabel || ""}
          {textareaRequired ? "*" : ""}
        </label>
        <textarea
          onChange={onTextareaChange}
          placeholder={textareaPlaceholder}
          name={textareaName}
          rows={5}
          className={`${textareaClassName} ${
            textareaType == "submit"
              ? "max-w-[13rem] bg-white text-black px-10 py-2 rounded-full font-semibold tracking-tight"
              : "border border-[#A3BEAE] outline-none bg-[#5B8B6C] text-white placeholder-[#A3BEAE]"
          }`}
          value={textareaValue}
          {...props}
        />
      </div>
    );
  }
  

