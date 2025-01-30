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
    const {orderItems,address,phone}=body
    const {storeId}=params
   const order= await prismadb.order.create({
      data:{
        userId,
        storeId,
        address,
        phone,
        isPaid:true
      }


    })
    const items=orderItems.map((e:any)=>({
      userId,
        orderId:order.id,
        productId:e.productId,
        sizeId:e.sizeId,
        numberOfItem:e.numberOfItem


    }))
    await prismadb.orderItems.createMany({
        data:items
    })
    
 return new NextResponse("success",{status:200})
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
