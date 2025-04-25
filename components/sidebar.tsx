"use client";
import { AlignJustify } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Store } from "@prisma/client";
import StoreSwitcher from "./storeSwitcher";
interface SidebarProps {
  routes: {
    href: string;
    label: string;
    active: boolean;
  }[];
  storeData: Store[];
}

const Sidebar: React.FC<SidebarProps> = ({ routes, storeData }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-x-hidden ">
      <Button variant="ghost" onClick={() => setOpen(!open)} className="z-20">
        <AlignJustify className="z-50" />
      </Button>
      <div
        className={cn(
          "fixed top-12 z-50 bottom-0  transition-all duration-200 backdrop-blur-md  right-0 bg-background/50 border-l  overflow-x-hidden",
          open ? "w-52" : "w-0"
        )}
      >
        <div className="p-3">
          <StoreSwitcher items={storeData} />
        </div>
        <div className="my-3 mt-0 flex  flex-col">
          {routes.map((e) => (
            <Link
              key={e.label}
              href={e.href}
              onClick={() => {
                setOpen(!open);
              }}
              className={cn(
                "hover:bg-card duration-200 text-foreground text-sm font-medium transition-all hover:text-foreground hover:font-bold  tracking-wide  px-4 py-3.5 ",
                e.active && "bg-card text-foreground font-bold"
              )}
            >
              {e.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
