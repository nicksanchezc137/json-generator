import Link from "next/link";
  import React, { useEffect, useState } from "react";
  import { handleRequest } from "../utils/api.utils";
  
  export default function Tile({
    name,
    controllerName,
  }: {
    name: string;
    controllerName: string;
  }) {
    type GenericObject = { [key: string]: any };
    const [count, setCount] = useState<number>(0);
    useEffect(() => {
      handleRequest(`/${controllerName}`, "GET", {}).then((resp: any) => {
        setCount(resp.length);
      });
    }, []);
    return (
      <Link href={`/${controllerName}/`} legacyBehavior>
        <div className="bg-indigo-600 w-[10rem] h-[10rem] rounded-md flex items-center justify-center flex-col cursor-pointer">
          <span className="text-white font-bold text-[1.5rem]">{name}</span>
          <span className="text-white font-bold text-[1.2rem]">{count}</span>
        </div>
      </Link>
    );
  }
   
