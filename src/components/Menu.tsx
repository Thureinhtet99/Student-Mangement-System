"use client";

import Image from "next/image";
import Link from "next/link";
import { menuItems } from "../data/menuItems";
import { role } from "@/lib/data";
import { usePathname } from "next/navigation";

const Menu = () => {
  // usePathname
  const pathname = usePathname();

  return (
    <>
      <div className="mt-2 text-sm">
        {menuItems.map((item) => (
          <div key={item.title} className="flex flex-col gap-2">
            <span className="hidden lg:block text-gray-400 font-light my-4">
              {item.title}
            </span>
            {item.items.map((i) => {
              if (i.visible.includes(role)) {
                return (
                  <Link
                    key={i.label}
                    href={i.href}
                    className={`flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-fourthColor 
                      ${pathname === i.href ? "bg-thirdColor" : ""}`}
                  >
                    <Image src={i.icon} alt={i.label} width={20} height={20} />
                    <span className="hidden lg:block">{i.label}</span>
                  </Link>
                );
              }
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default Menu;
