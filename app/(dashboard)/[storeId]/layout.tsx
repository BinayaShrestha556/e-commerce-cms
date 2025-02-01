import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import LogoutButton from "@/components/auth/logout-button";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
    const session=await auth()

    const userId= session?.user.id
    const role=session?.user.role
    if(role=="USER") return <div className="h-full w-full flex items-center justify-center "> <p>Already logged in as user, to log in as an admin you need to create an account </p> <LogoutButton/></div>
    if(!userId){
        redirect('/sign-in')
    }
    const store= await prismadb.store.findFirst({
        where:{
            id:params.storeId,
            userId
        }

    })
    if( !store){
        redirect("/");

    }
    return(
        <div className="lg:w-[95%] m-auto">
        <Navbar/>
        {children}
        </div>
    )
}
