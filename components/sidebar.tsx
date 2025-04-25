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
    <div className="overflow-x-hidden">
      <Button variant="ghost" onClick={() => setOpen(!open)} className="z-20">
        <AlignJustify className="z-50" />
      </Button>
      <div
        className={cn(
          "absolute top-12 z-10 bottom-0  transition-all duration-200 backdrop-blur-md  right-0 bg-background/50 border-l  overflow-x-hidden",
          open ? "w-52" : "w-0"
        )}
      >
        <div className="p-2">
          <StoreSwitcher items={storeData} />
        </div>
        <div className="m-3 flex gap-1 flex-col">
          {routes.map((e) => (
            <Link
              key={e.label}
              href={e.href}
              onClick={() => {
                setOpen(!open);
              }}
              className={cn(
                "hover:bg-card duration-200 text-foreground text-sm font-medium transition-all hover:text-foreground rounded-lg hover:font-bold  tracking-wide  px-2 py-3 ",
                e.active && "bg-background text-foreground font-bold"
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
