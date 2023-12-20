import React, { ReactHTML } from "react";

  export default function MainLayout({
    children,
  }: {
    children: JSX.Element | JSX.Element[];
  }) {
    return (
      <div className="w-full flex items-center justify-center bg-white">
        <div className="xl:max-w-[75rem] md:w-[75%] w-full flex items-start mt-[4rem] mb-10">
         
          {children}
        </div>
      </div>
    );
  }
  
   
