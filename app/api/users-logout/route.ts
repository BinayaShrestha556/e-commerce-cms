import { signOut } from "@/auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(){
    
        await signOut({redirect:false})
        
        return NextResponse.json({message:"logged out"},{status:200})
}