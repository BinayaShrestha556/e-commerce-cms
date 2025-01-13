
import { MainNav } from "./mainNav"
import StoreSwitcher from "./storeSwitcher"

import { redirect } from "next/navigation"
import prismadb from "@/lib/prismadb"

import { UserOptions } from "./user-options"
import { SessionProvider } from "next-auth/react"
import { useServerUser } from "@/hooks/use-server-user"


const Navbar =async () => {
   const user =await useServerUser();
    const userId=user?.id

  
  if(!userId) redirect("/sign-in")
  const stores=await prismadb.store.findMany({
where:{
  userId
}})
  return (
    <div className="border-b h-12 flex items-center px-5 w-full">
      <StoreSwitcher items={stores}/>
      <div className=" flex-1 flex justify-end md:justify-start pr-2">
      <MainNav/>
      </div>
      <div >
      <SessionProvider><UserOptions/></SessionProvider></div>
    </div>
  )
}

export default Navbar