import { MainNav } from "./mainNav";
import StoreSwitcher from "./storeSwitcher";

import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

import { UserOptions } from "./user-options";
import { SessionProvider } from "next-auth/react";
import { useServerUser } from "@/hooks/use-server-user";

const Navbar = async () => {
  const user = await useServerUser();
  const userId = user?.id;

  if (!userId) redirect("/sign-in");
  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });
  return (
    <div className="fixed bg-background border-b h-12 flex items-center px-5 w-full ">
      <p className="font-serif text-2xl font-bold tracking-tighter ">OmniCMS</p>
      <div className=" flex-1 flex justify-end md:justify-start md:px-1">
        <MainNav storeData={stores} />
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden w-48 md:block">
          <StoreSwitcher items={stores} />
        </div>
        <SessionProvider>
          <UserOptions />
        </SessionProvider>
      </div>
    </div>
  );
};

export default Navbar;
