import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request,

){
    try {
        const session=await auth()
        const userId=session?.user.id
        const body=await req.json();
        const {name}=body
        if(!userId) return new NextResponse("unauthorized",{status:401})
        if(!name) return new NextResponse('name is required',{status:400})
        const store = await prismadb.store.create({
    data:{
        name,userId
    }})
        return NextResponse.json(store)
    } catch (error) {
        console.log('[stores_post]',error);
        return new NextResponse("Internal error",{status:500})
    }
}