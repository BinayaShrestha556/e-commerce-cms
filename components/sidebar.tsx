"use client";
import { AlignJustify } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Store } from "@prisma/client";
import StoreSwitcher from "./storeSwitcher";
import { useParams, usePathname } from "next/navigation";
interface SidebarProps {
  storeData: Store[];
}

const Sidebar: React.FC<SidebarProps> = ({ storeData }) => {
  const pathname = usePathname();
  const param = useParams();
  const routes = [
    {
      href: `/${param.storeId}`,
      label: "Home",
      active: pathname === `/${param.storeId}`,
    },

    {
      href: `/${param.storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/${param.storeId}/billboards`,
    },
    {
      href: `/${param.storeId}/categories`,
      label: "Categories",
      active: pathname === `/${param.storeId}/categories`,
    },
    {
      href: `/${param.storeId}/sizes`,
      label: "Sizes",
      active: pathname === `/${param.storeId}/sizes`,
    },
    {
      href: `/${param.storeId}/colors`,
      label: "Colors",
      active: pathname === `/${param.storeId}/colors`,
    },
    {
      href: `/${param.storeId}/products`,
      label: "Products",
      active: pathname === `/${param.storeId}/products`,
    },
    {
      href: `/${param.storeId}/orders`,
      label: "Orders",
      active: pathname === `/${param.storeId}/orders`,
    },
    {
      href: `/${param.storeId}/api`,
      label: "Api",
      active: pathname === `/${param.storeId}/api`,
    },
  ];
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
      document.body.style.position = "fixed"; // Prevents jump on iOS
      document.body.style.width = "100%"; // Maintains width when fixed
    } else {
      document.body.style.overflow = ""; // Reset to default
      document.body.style.position = ""; // Reset
      document.body.style.width = ""; // Reset
    }

    // Cleanup function: important for when the component unmounts
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [open]);
  return (
    <div className="overflow-x-hidden ">
      <Button variant="ghost" onClick={() => setOpen(!open)} className="z-20">
        <AlignJustify className="z-50" />
      </Button>
      <div
        className={cn(
          "absolute  w-screen h-screen flex justify-end top-12 z-[1000] bottom-0  transition-all duration-200  right-0 border-l  overflow-x-hidden",
          open ? "w-screen" : "w-0"
        )}
      >
        <div
          className="absolute inset-0 z-40"
          onClick={() => setOpen(false)}
        ></div>
        {/*   this is just for the overlay or underlay idk when clicked makes the sidebar close */}
        <div
          className="w-56 bg-secondary z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-3">
            <StoreSwitcher items={storeData} />
          </div>
          <div className="my-3 mt-0 flex  flex-col">
            {routes.map((e) => (
              <Link
                key={e.label}
                href={e.href}
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
    </div>
  );
};

export default Sidebar;
