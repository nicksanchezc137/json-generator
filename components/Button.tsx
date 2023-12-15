import React, { MouseEventHandler } from "react";

  export default function Button({
    onButtonClick,
    caption,
    isLight,
    buttonClassName
  }: {
    onButtonClick: MouseEventHandler<HTMLButtonElement>;
    caption: string;
    isLight?: boolean;
    buttonClassName?:string;
  }) {
    return (
      <button
        onClick={onButtonClick}
        className={`${buttonClassName || ""} ${
          isLight ? "border border-white text-white" : "bg-blue"
        } max-w-[13rem] text-black text-white px-10 py-2 rounded-sm font-semibold tracking-tight`}
      >
        {caption}
      </button>
    );
  }  
