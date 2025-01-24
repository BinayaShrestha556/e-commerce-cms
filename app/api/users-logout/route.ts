import { signOut } from "@/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextApiRequest,res:NextApiResponse){
    
        await signOut({redirect:false})
        
        return NextResponse.json({message:"logged out"},{status:200})
}