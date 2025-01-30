"use client";
import { AlignJustify } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
interface SidebarProps {
  routes: {
    href: string;
    label: string;
    active: boolean;
  }[];
}

const Sidebar: React.FC<SidebarProps> = ({ routes }) => {
    const [open,setOpen]=useState(false)
    
  return (
    <div className="overflow-x-hidden">
      <Button variant="ghost" onClick={()=>setOpen(!open)} className="z-20">
        <AlignJustify  className="z-50"/>
      </Button>
      <div className={cn("absolute top-12 z-10 bottom-0  transition-all duration-200 backdrop-blur-sm  right-0 bg-foreground/40  border border-foreground/50 w-52 overflow-x-hidden",open?"w-52":"w-0")}>
      <div className="m-3 flex gap-1 flex-col">
        {
            routes.map((e)=>(
                
                <Link key={e.label} href={e.href} onClick={()=>{setOpen(!open)}} className={cn("hover:bg-background text-background hover:text-foreground rounded-lg hover:font-semibold  tracking-wide  px-2 py-3 ",e.active&&"bg-background text-foreground font-semibold")}>
                    {e.label}

                </Link>
            ))
        }

      </div>
      
      </div>
    </div>
  );
};

export default Sidebar;
