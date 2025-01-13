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

 
  } catch (error) {
    console.log("[orders_POST]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
export async function GET(req:Request,{params}:{params:{storeId:string}}

){
    try {
        if(!params.storeId)
            return new NextResponse("Store id is required ",{status:400})
        const orders=await prismadb.order.findMany({
            where:{
                storeId:params.storeId,
            }
        })
        return NextResponse.json(orders);
    } catch (error) {
        console.log('[orders_GET]',error);
        return new NextResponse('internal error',{status:500});
        
    }
}
