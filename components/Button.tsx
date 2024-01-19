import React, { MouseEventHandler } from "react";

export default function Button({
  onButtonClick,
  caption,
  isLight,
  buttonClassName,
  loading
}: {
  onButtonClick: MouseEventHandler<HTMLButtonElement>;
  caption: string;
  isLight?: boolean;
  buttonClassName?: string;
  loading?: boolean;
}) {
  return (
    <button
      onClick={!loading?onButtonClick:()=>{}}
      className={`${buttonClassName || ""} ${
        isLight ? "border border-white text-white" : !loading?"bg-blue":"bg-light-blue"
      } max-w-[13rem] text-black text-white px-10 py-2 rounded-sm font-semibold tracking-tight relative`}
    >
      {loading? (
        <i className="fa fa-circle-o-notch fa-spin absolute right-[1rem] top-[30%]"></i>
      ) : null}
      {caption}
    </button>
  );
}
