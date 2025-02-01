import { useServerUser } from "@/hooks/use-server-user";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
        // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        // res.setHeader('Access-Control-Allow-Credentials', 'true');
     
        const headers = {
                "Access-Control-Allow-Origin": req.headers.get("origin") || "*", // Allow the requesting origin
                "Access-Control-Allow-Methods": "POST, OPTIONS", // Allow POST and OPTIONS methods
                "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allow necessary headers
                "Access-Control-Allow-Credentials": "true", // Allow credentials
              };
        const user=await useServerUser()
        if(user) return NextResponse.json(user,{headers})
        return NextResponse.json({loggedIn:false},{headers})
}