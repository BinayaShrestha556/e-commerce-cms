import prismadb from "@/lib/prismadb";
// import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {auth} from "@/auth"


export default async function SetupLayout({
    children
}:{children:React.ReactNode}){
    // const {userId}=auth()
    const session =await auth()
    const userId=session?.user?.id
    if(!userId){
        redirect("/sign-in");

    }
    const store = await prismadb.store.findFirst({
        where:{
            userId
        }
    })
    if(store){
        redirect(`/${store.id}`)
    }
    return(
        <>{children}</>
    )
}