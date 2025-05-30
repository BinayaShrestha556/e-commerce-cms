"use server"
import bcryptjs from "bcryptjs"
import { RegisterSchema } from "@/schemas"
import {sendVerificationEmail} from "@/lib/mail"
import {  z } from "zod"
import db from "@/lib/prismadb"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"

export const register=async(value:z.infer<typeof RegisterSchema>)=>{
console.log("hello")
    const validatedFields=RegisterSchema.safeParse(value)
    if(!validatedFields.success){
        return {error:"invalid fields"}
    }
    const {email,password, name,role}=validatedFields.data
    const hashedPassword =await bcryptjs.hash(password,10)
    const existingUser=await getUserByEmail(email)
    if(existingUser) return {error:"email already in use"}
    await db.user.create({
        data:{
            name,email,password:hashedPassword,role
        }
    })
    const verificationToken=await generateVerificationToken(email)
    await sendVerificationEmail(verificationToken.email,verificationToken.token)
    return {success:"email sent"}
}