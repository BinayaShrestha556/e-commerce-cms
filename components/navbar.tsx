
import { MainNav } from "./mainNav"
import StoreSwitcher from "./storeSwitcher"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import prismadb from "@/lib/prismadb"
import { ModeToggle } from "./theme-toggle"
import { CircleUser } from "lucide-react"
import Image from "next/image"
import { UserOptions } from "./user-options"
import { SessionProvider } from "next-auth/react"


const Navbar =async () => {
  const session= await auth()
  const userId=session?.user.id
  const image=session?.user.image
  
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
      <SessionProvider><UserOptions/></SessionProvider>
    </div>
  )
}

export default Navbar