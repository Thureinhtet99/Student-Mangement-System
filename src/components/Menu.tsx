"use client";

import Image from "next/image";
import Link from "next/link";
import { menuItems } from "../data/menuItems";
import { role } from "@/lib/data";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const Menu = () => {
  const pathname = usePathname();

  return (
    <div className="mt-4 text-sm space-y-1">
      {menuItems.map((item) => (
        <Accordion
          key={item.title}
          type="single"
          collapsible
          className="border-none"
          defaultValue={item.title}
        >
          <AccordionItem value={item.title} className="border-none px-1">
            <AccordionTrigger className="hidden lg:flex py-2 px-2 text-muted-foreground font-medium text-xs hover:no-underline">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="pb-0 pt-1">
              <div className="flex flex-col space-y-1">
                {item.items.map((i) => {
                  if (i.visible.includes(role)) {
                    return (
                      <Button
                        key={i.label}
                        variant="ghost"
                        size="sm"
                        asChild
                        className={cn(
                          "justify-center lg:justify-start h-10 px-2 py-5 font-normal",
                          pathname === i.href
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <Link href={i.href}>
                          <Image
                            src={i.icon}
                            alt={i.label}
                            width={20}
                            height={20}
                            className="mr-0 lg:mr-2"
                          />
                          <span className="hidden lg:inline-block">
                            {i.label}
                          </span>
                        </Link>
                      </Button>
                    );
                  }
                  return null;
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default Menu;