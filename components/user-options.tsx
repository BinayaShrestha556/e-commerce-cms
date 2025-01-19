"use client";

import Image from "next/image";
import { ModeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { CircleUser, Settings } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command";
import { useRouter } from "next/navigation";

export const UserOptions = () => {
  const session = useSession();
  const router=useRouter()
  
  const image = session.data?.user.image;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClick = async () => {
    await signOut();
  };
  const params=useParams()
  return (
    <div className="flex items-center gap-2 z-50">
      <ModeToggle />
      <Popover open={isModalOpen} onOpenChange={setIsModalOpen}  >
        <PopoverTrigger asChild>

      <div className="relative">
        {image ? (
          <div
          
          className="relative z-50 rounded-full overflow-hidden h-8 w-8 cursor-pointer"
          >
            <Image src={image} alt="" fill className="object-cover z-50" />
          </div>
        ) : (
          <CircleUser
          className="cursor-pointer z-50"
          onClick={() => setIsModalOpen((e) => !e)}
          />
        )}
      </div>
        </PopoverTrigger>
        <PopoverContent  className="flex flex-col w-52 gap-3">
        <Button variant="ghost" onClick={()=>router.push(`/${params.storeId}/settings`)} className="justify-start flex items-center gap-2 py-2 rounded-md shadow-sm text-sm  px-3.5 hover:bg-background"> <span><Settings/></span>Settings</Button>
        <Button onClick={()=>signOut()}>sign out</Button>
        </PopoverContent>
</Popover>
    </div>
  );
};
