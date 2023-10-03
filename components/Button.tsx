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
          isLight ? "border border-white bg-[#5B8B6C] text-white" : "bg-white"
        } max-w-[13rem] text-black px-10 py-2 rounded-full font-semibold tracking-tight`}
      >
        {caption}
      </button>
    );
  }  
