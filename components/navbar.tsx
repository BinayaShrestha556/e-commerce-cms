import { MainNav } from "./mainNav";
import StoreSwitcher from "./storeSwitcher";

import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

import { UserOptions } from "./user-options";
import { SessionProvider } from "next-auth/react";
import { useServerUser } from "@/hooks/use-server-user";
import Sidebar from "./sidebar";

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
    <SessionProvider>
      <div className="sticky z-50 bg-background border-b h-12 justify-between flex items-center px-5 w-full lg:w-[95%] mx-auto ">
        <h1 className="font-bold text-2xl">OmniCMS</h1>
        <div className="flex-1 flex justify-start">
          {" "}
          <MainNav storeData={stores} />
        </div>
        <div className="flex items-center gap-2">
          <StoreSwitcher items={stores} className="hidden md:block" />
          <UserOptions />
        </div>
        <div className="md:hidden ">
          <Sidebar storeData={stores} />
        </div>
      </div>
    </SessionProvider>
  );
};

export default Navbar;
