import { useServerUser } from "@/hooks/use-server-user";
import prismadb from "@/lib/prismadb";

import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: {storeId:string, categoryId: string } }
  ) {
    try {
    
  
      if (!params.categoryId)
        return new NextResponse("store id is missing", { status: 400 });
      const category =  await prismadb.category.findUnique({
        where:{
          id:params.categoryId,
          
        },
        include:{
          billboard:true,
        }
      })
      return NextResponse.json(category)
    } catch (error) {
      console.log("[category_GET]", error);
      return new NextResponse("internal error", { status: 500 });
    }
  }
  

export async function PATCH(
  req: Request,
  { params }: { params: { storeId:string;categoryId: string } }
) {
  try {
      const user =await useServerUser();
       const userId=user?.id
    if (!userId) return new NextResponse("unauthenticated", { status: 401 });
    const body = await req.json();
    const { name,billboardId } = body;
    if (!name) return new NextResponse("name is required", { status: 401 });

    if (!billboardId) return new NextResponse("billboardId is required", { status: 401 });
    const storeByUserId=await prismadb.store.findFirst({
        where:{
            id:params.storeId,
            userId
        }
    })
    if(!storeByUserId){
        return new NextResponse("unauthorized",{status:403})
    }
    if (!params.categoryId)
      return new NextResponse("category id is missing", { status: 400 });
    const category =  await prismadb.category.updateMany({
      where:{
        id:params.categoryId,
        
      },
      data:{
      name,
      billboardId
      }
    })
    return NextResponse.json(category)
  } catch (error) {
    console.log("[category_PATCH]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: {storeId:string, categoryId: string } }
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

    if (!params.categoryId)
      return new NextResponse("store id is missing", { status: 400 });
    const category =  await prismadb.category.deleteMany({
      where:{
        id:params.categoryId,
        
      }
    })
    return NextResponse.json(category)
  } catch (error) {
    console.log("[category_DELETE]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
