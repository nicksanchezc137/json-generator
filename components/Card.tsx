import React from "react";

export default function Card({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="mt-7 py-4 text-secondary">
      <h3 className="font-bold text-[1.3rem]">{title}</h3>
      <p className="">{content}</p>
    </div>
  );
}
