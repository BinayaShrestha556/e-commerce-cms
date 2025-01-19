import { RegisterSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export async function POST(req:NextRequest){
        const body=await req.json()
        const validatedFields=RegisterSchema.safeParse(body)
        if(!validatedFields.success){
            return {error:"invalid fields"}
        }
        const {email,password, name}=validatedFields.data
        const hashedPassword =await bcryptjs.hash(password,10)
        const existingUser=await getUserByEmail(email)
        if(existingUser) return  new NextResponse("User already exists.",{status:401})
        await db.user.create({
            data:{
                name,email,password:hashedPassword,role:"USER"
            }
        })
        const verificationToken=await generateVerificationToken(email)
        await sendVerificationEmail(verificationToken.email,verificationToken.token)
        return new NextResponse("Email Sent",{status:200})

} 