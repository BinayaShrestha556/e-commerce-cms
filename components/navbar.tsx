import { UserButton } from "@clerk/nextjs"
import { MainNav } from "./mainNav"
import StoreSwitcher from "./storeSwitcher"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import prismadb from "@/lib/prismadb"
import { ModeToggle } from "./theme-toggle"


const Navbar =async () => {
  const {userId}=auth()
  if(!userId) redirect("/sign-in")
  const stores=await prismadb.store.findMany({
where:{
  userId
}})
  return (
    <div className="border-b h-12 flex items-center px-5 ">
      <StoreSwitcher items={stores}/>
      <div>
      <MainNav/>
      </div>
      <div className=" flex items-center gap-x-3 ml-auto">
        <ModeToggle/>
        <UserButton />

      </div>
    </div>
  )
}

export default Navbar