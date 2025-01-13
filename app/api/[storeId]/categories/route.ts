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
    const {name,billboardId } = body;
    if (!name) return new NextResponse("name is required", { status: 401 });
    if (!billboardId) return new NextResponse("billbaord id  is required", { status: 401 });
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
    const category =  await prismadb.category.create({
     
      data:{
        name,billboardId,storeId:params.storeId
      }
    })
    return NextResponse.json(category)
  } catch (error) {
    console.log("[CATEGORY_POST]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
export async function GET(req:Request,{params}:{params:{storeId:string}}

){
    try {
        if(!params.storeId)
            return new NextResponse("Store id is required ",{status:400})
        const categories=await prismadb.category.findMany({
            where:{
                storeId:params.storeId,
            }
        })
        return NextResponse.json(categories);
    } catch (error) {
        console.log('[CATEGORY_GET]',error);
        return new NextResponse('internal error',{status:500});
        
    }
}
