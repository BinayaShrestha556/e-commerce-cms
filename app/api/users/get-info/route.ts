import { useServerUser } from "@/hooks/use-server-user";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req:NextApiRequest,res:NextApiResponse){
    
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
        // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        // res.setHeader('Access-Control-Allow-Credentials', 'true');
     
        const user=await useServerUser()
        if(user) return NextResponse.json(user)
        return NextResponse.json({loggedIn:false})
}