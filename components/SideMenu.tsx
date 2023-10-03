import React, { useEffect, useState } from "react";
  import { Menu } from "../types/general.types";
  import Link from "next/link";
  import { useRouter } from "next/router";
  
  export default function SideMenu({ menus }: { menus: Menu[] }) {
    const [currentRoute, setCurrentRoute] = useState("");
    const router = useRouter();
    useEffect(() => {
      if (router.isReady) {
        setCurrentRoute(router.pathname);
      }
    }, []);
    return (
      <ul className="top-[15%] left-[8%] absolute">
        {menus.map(({ destination, label }, i) => (
          <li key={`${i}-${label}`}>
            <Link
              href={destination}
              className={`font-bold  text-[1.5rem] ${
                currentRoute == destination ? "text-white" : "text-[#A3BEAE]"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
    
