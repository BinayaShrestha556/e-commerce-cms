import { signIn } from "@/auth";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
    const body=await req.json()
    signIn("google",{
        redirectTo:body.redirectUrl,
        redirect:body.redirect,
        
    })
}