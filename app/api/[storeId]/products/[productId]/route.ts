import { useServerUser } from "@/hooks/use-server-user";
import prismadb from "@/lib/prismadb";

import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    if (!params.productId)
      return new NextResponse("store id is missing", { status: 400 });
    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
      const user =await useServerUser();
       const userId=user?.id
    if (!userId) return new NextResponse("unauthenticated", { status: 401 });
    const body = await req.json();
    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
    } = body;

    if (!name) return new NextResponse("name is required", { status: 401 });
    if (!price) return new NextResponse("price is required", { status: 401 });
    if (!categoryId)
      return new NextResponse("categoryId is required", { status: 401 });
    if (!sizeId) return new NextResponse("sizeId is required", { status: 401 });
    if (!colorId)
      return new NextResponse("colorId is required", { status: 401 });
    if (!images || !images.length) {
      return new NextResponse("images are required ", { status: 400 });
    }
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!storeByUserId) {
      return new NextResponse("unauthorized", { status: 403 });
    }
    if (!params.productId)
      return new NextResponse("product id is missing", { status: 400 });
    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        isArchived,
        isFeatured,
        categoryId,
        colorId,
        sizeId,
        storeId: params.storeId,
        images: {
          deleteMany: {},
        },
      },
    });
    const product=await prismadb.product.update({
      where:{
        id:params.productId
      },
      data:{
        images:{
          createMany:{
            data:[
              ...images.map((image:{url:string})=>image)
            ]
          }
        }
      }
    })
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const user =await useServerUser();
    const userId=user?.id
    if (!userId) return new NextResponse("unauthenticated", { status: 401 });
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!storeByUserId) {
      return new NextResponse("unauthorized", { status: 403 });
    }

    if (!params.productId)
      return new NextResponse("store id is missing", { status: 400 });
    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
