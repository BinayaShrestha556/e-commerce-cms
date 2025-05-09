import { useServerUser } from "@/hooks/use-server-user";
import prismadb from "@/lib/prismadb";

import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
      const user =await useServerUser();
       const userId=user?.id
    if (!userId) return new NextResponse("unauthenticated", { status: 401 });
    const body = await req.json();
    const { name,value } = body;
    if (!name) return new NextResponse("name is required", { status: 401 });
    if (!value) return new NextResponse("value url is required", { status: 401 });
    if (!params.storeId)
      return new NextResponse("store id is required", { status: 400 });
    const storeByUserId=await prismadb.store.findFirst({
        where:{
            id:params.storeId,
            userId
        }
    })
    if(!storeByUserId){
        return new NextResponse("unauthorized",{status:403})
    }
    const color =  await prismadb.color.create({
     
      data:{
        name,value,storeId:params.storeId
      }
    })
    return NextResponse.json(color)
  } catch (error) {
    console.log("[colors_POST]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
export async function GET(req:Request,{params}:{params:{storeId:string}}

){
    try {
        if(!params.storeId)
            return new NextResponse("Store id is required ",{status:400})
        const colors=await prismadb.color.findMany({
            where:{
                storeId:params.storeId,
            }
        })
        return NextResponse.json(colors);
    } catch (error) {
        console.log('[colors_GET]',error);
        return new NextResponse('internal error',{status:500});
        
    }
}
