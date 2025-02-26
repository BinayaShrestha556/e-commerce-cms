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
    const { name,price,categoryId,colorId,size,images,isFeatured,isArchived } = body;
    if (!name) return new NextResponse("name is required", { status: 401 });
    if (!price) return new NextResponse("price is required", { status: 401 });
    if (!categoryId) return new NextResponse("categoryId is required", { status: 401 });

    if (!colorId) return new NextResponse("colorId is required", { status: 401 });
    if(!images||!images.length){
      return new NextResponse("images are required ",{status:400})
    }
    if(!size||!size.length){
      return new NextResponse("sizes are required ",{status:400})
    }
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
    const product =  await prismadb.product.create({
     
      data:{
        name,price,isArchived,isFeatured,categoryId,colorId,storeId:params.storeId,images:{
          createMany:{
            data:[
              ...images.map((images:{url:string})=>images)
            ]
          }
        },size:{
          connect:size
        }
      }
    })
    return NextResponse.json(product)
  } catch (error) {
    console.log("[PRODUCT_POST]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
export async function GET(req:Request,{params}:{params:{storeId:string}}

){
    try {
      const {searchParams}=new URL(req.url)
      const categoryId=searchParams.get("categoryId")||undefined
      const colorId=searchParams.get("colorId")||undefined
      const sizeId=searchParams.get("sizeId")||undefined
      const isFeatured=searchParams.get("isFeatured")


        if(!params.storeId)
            return new NextResponse("Store id is required ",{status:400})
        const products=await prismadb.product.findMany({
            where:{
                storeId:params.storeId,
                categoryId,
                colorId,
                size:{some:{id:sizeId}},
                isFeatured:isFeatured?true:undefined,
                
                isArchived:false
            },
            include:{
              images:true,
              category:true,
              color:true,
              size:true

            },
            orderBy:{
              createdAt:"desc"
            }
        })
        return NextResponse.json(products);
    } catch (error) {
        console.log('[BILLBOARD_GET]',error);
        return new NextResponse('internal error',{status:500});
        
    }
}
