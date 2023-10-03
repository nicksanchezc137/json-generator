import React from "react";

export default function Card({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="w-1/2 mt-7 px-4">
      <h3 className="font-bold text-[1.3rem] text-secondary">{title}</h3>
      <p className="">{content}</p>
    </div>
  );
}
