import { signOut } from "@/auth";

import {  NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
            const headers = {
                    "Access-Control-Allow-Origin": req.headers.get("origin") || "*", // Allow the requesting origin
                    "Access-Control-Allow-Methods": "POST, OPTIONS", // Allow POST and OPTIONS methods
                    "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allow necessary headers
                    "Access-Control-Allow-Credentials": "true", // Allow credentials
                  };
            await signOut({redirect:false})
            
            return NextResponse.json({message:"logged out"},{status:200,headers})
    } catch (error) {
        return NextResponse.json("Something ernt wrong",{status:500})
        
    }
}