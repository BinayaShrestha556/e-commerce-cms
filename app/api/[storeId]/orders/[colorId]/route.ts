import { useServerUser } from "@/hooks/use-server-user";
import prismadb from "@/lib/prismadb";

import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: {storeId:string, colorId: string } }
  ) {
    try {
    
  
      if (!params.colorId)
        return new NextResponse("store id is missing", { status: 400 });
      const color =  await prismadb.color.findUnique({
        where:{
          id:params.colorId,
          
        }
      })
      return NextResponse.json(color)
    } catch (error) {
      console.log("[BILLBOARD_GET]", error);
      return new NextResponse("internal error", { status: 500 });
    }
  }
  

export async function PATCH(
  req: Request,
  { params }: { params: { storeId:string;colorId: string } }
) {
  try {
       const user =await useServerUser();
        const userId=user?.id
    if (!userId) return new NextResponse("unauthenticated", { status: 401 });
    const body = await req.json();
    const { name } = body;
    if (!name) return new NextResponse("name is required", { status: 401 });
    const {value}=body
    if (!value) return new NextResponse("value is required", { status: 401 });
    const storeByUserId=await prismadb.store.findFirst({
        where:{
            id:params.storeId,
            userId
        }
    })
    if(!storeByUserId){
        return new NextResponse("unauthorized",{status:403})
    }
    if (!params.colorId)
      return new NextResponse("color id is missing", { status: 400 });
    const color =  await prismadb.color.updateMany({
      where:{
        id:params.colorId,
        
      },
      data:{
        name,value
      }
    })
    return NextResponse.json(color)
  } catch (error) {
    console.log("[color_PATCH]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: {storeId:string, colorId: string } }
) {
  try {
    const user =await useServerUser();
    const userId=user?.id
    if (!userId) return new NextResponse("unauthenticated", { status: 401 });
    const storeByUserId=await prismadb.store.findFirst({
        where:{
            id:params.storeId,
            userId
        }
    })
    if(!storeByUserId){
        return new NextResponse("unauthorized",{status:403})
    }

    if (!params.colorId)
      return new NextResponse("store id is missing", { status: 400 });
    const color =  await prismadb.color.deleteMany({
      where:{
        id:params.colorId,
        
      }
    })
    return NextResponse.json(color)
  } catch (error) {
    console.log("[color_DELETE]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
