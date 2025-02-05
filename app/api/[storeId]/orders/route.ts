import prismadb from "@/lib/prismadb";
import { OrderItems } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = await req.json();
    const { orderItems, address, phone, email } = body;
    if (!orderItems || !address || !phone || !email)
      return new NextResponse("not enough info ", { status: 400 });
    const { storeId } = params;
    const order = await prismadb.order.create({
      data: {
        email,
        storeId,
        address,
        isPaid: true,
        phone,
      },
    });
    const items = orderItems.map((e: OrderItems) => ({
      orderId: order.id,
      productId: e.productId,
      sizeId: e.sizeId,
      numberOfItem: e.numberOfItem,
    }));
    await prismadb.orderItems.createMany({
      data: items,
    });
   

    return new NextResponse("success", { status: 200 });
  } catch (error) {
    console.log("[orders_POST]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId)
      return new NextResponse("Store id is required ", { status: 400 });
    const orders = await prismadb.order.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.log("[orders_GET]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
