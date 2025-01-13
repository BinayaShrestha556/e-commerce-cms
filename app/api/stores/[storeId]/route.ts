import { useServerUser } from "@/hooks/use-server-user";
import prismadb from "@/lib/prismadb";

import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const user =await useServerUser();
    const userId=user?.id
    if (!userId) return new NextResponse("unauthenticated", { status: 401 });
    const body = await req.json();
    const { name } = body;
    if (!name) return new NextResponse("unauthenticated", { status: 401 });
    if (!params.storeId)
      return new NextResponse("store id is missing", { status: 400 });
    const store =  await prismadb.store.updateMany({
      where:{
        id:params.storeId,
        userId
      },
      data:{
        name
      }
    })
    return NextResponse.json(store)
  } catch (error) {
    console.log("[STORE_PATCH]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const user =await useServerUser();
    const userId=user?.id
    if (!userId) return new NextResponse("unauthenticated", { status: 401 });

    if (!params.storeId)
      return new NextResponse("store id is missing", { status: 400 });
    const store =  await prismadb.store.deleteMany({
      where:{
        id:params.storeId,
        userId
      }
    })
    return NextResponse.json(store)
  } catch (error) {
    console.log("[STORE_DELETE]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
