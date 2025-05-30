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
    const { label,imageUrl } = body;
    if (!label) return new NextResponse("label is required", { status: 401 });
    if (!imageUrl) return new NextResponse("image url is required", { status: 401 });
    if (!params.storeId)
      return new NextResponse("label is required", { status: 400 });
    const storeByUserId=await prismadb.store.findFirst({
        where:{
            id:params.storeId,
            userId
        }
    })
    if(!storeByUserId){
        return new NextResponse("unauthorized",{status:403})
    }
    const billboard =  await prismadb.billboard.create({
     
      data:{
        label,imageUrl,storeId:params.storeId
      }
    })
    return NextResponse.json(billboard)
  } catch (error) {
    console.log("[BILLBOARD_POST]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
export async function GET(req:Request,{params}:{params:{storeId:string}}

){
    try {
        if(!params.storeId)
            return new NextResponse("Store id is required ",{status:400})
        const billboards=await prismadb.billboard.findMany({
            where:{
                storeId:params.storeId,
            }
        })
        return NextResponse.json(billboards);
    } catch (error) {
        console.log('[BILLBOARD_GET]',error);
        return new NextResponse('internal error',{status:500});
        
        
    }
}
