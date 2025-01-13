import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
    const session=await auth()
    const userId= session?.user.id
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
