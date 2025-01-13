"use client";

import Image from "next/image";
import { ModeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { CircleUser } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export const UserOptions = () => {
  const session = useSession();
  const image = session.data?.user.image;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClick = async () => {
    await signOut();
  };
  const params=useParams()
  return (
    <div className="flex items-center gap-2 z-50">
      <ModeToggle />
      <div className="relative">
        {image ? (
          <div
            onClick={() => setIsModalOpen(true)}
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
        {isModalOpen ? (
          <div className="absolute right-0 top-7">
            <div className=" flex flex-col p-3  bg-white/20 border rounded-lg">
            <Link href={`/${params.storeId}/settings`}>Settings</Link>
              <Button onClick={onClick}>signout</Button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
