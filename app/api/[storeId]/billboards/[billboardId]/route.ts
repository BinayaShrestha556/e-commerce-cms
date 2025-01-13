import { useServerUser } from "@/hooks/use-server-user";
import prismadb from "@/lib/prismadb";

import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: {storeId:string, billboardId: string } }
  ) {
    try {
    
  
      if (!params.billboardId)
        return new NextResponse("store id is missing", { status: 400 });
      const billboard =  await prismadb.billboard.findUnique({
        where:{
          id:params.billboardId,
          
        }
      })
      return NextResponse.json(billboard)
    } catch (error) {
      console.log("[BILLBOARD_GET]", error);
      return new NextResponse("internal error", { status: 500 });
    }
  }
  

export async function PATCH(
  req: Request,
  { params }: { params: { storeId:string;billboardId: string } }
) {
  try {
       const user =await useServerUser();
        const userId=user?.id
    if (!userId) return new NextResponse("unauthenticated", { status: 401 });
    const body = await req.json();
    const { label } = body;
    if (!label) return new NextResponse("label is required", { status: 401 });
    const {imageUrl}=body
    if (!imageUrl) return new NextResponse("image url is required", { status: 401 });
    const storeByUserId=await prismadb.store.findFirst({
        where:{
            id:params.storeId,
            userId
        }
    })
    if(!storeByUserId){
        return new NextResponse("unauthorized",{status:403})
    }
    if (!params.billboardId)
      return new NextResponse("billboard id is missing", { status: 400 });
    const billboard =  await prismadb.billboard.updateMany({
      where:{
        id:params.billboardId,
        
      },
      data:{
        label,
        imageUrl
      }
    })
    return NextResponse.json(billboard)
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: {storeId:string, billboardId: string } }
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

    if (!params.billboardId)
      return new NextResponse("store id is missing", { status: 400 });
    const billboard =  await prismadb.billboard.deleteMany({
      where:{
        id:params.billboardId,
        
      }
    })
    return NextResponse.json(billboard)
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
