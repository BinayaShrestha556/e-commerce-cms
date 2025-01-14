import { getUserByEmail } from "@/data/user"
import { LoginSchema } from "@/schemas"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { signIn } from "@/auth"

export async function POST(
    req:Request,

){

try {
    const body =await req.json()
    const validatedField=LoginSchema.safeParse(body)
    if(!validatedField.success) return new NextResponse("provide email and password",{status:400})
        const {email,password}= validatedField.data

    const user = await getUserByEmail(email)
    if(!user) return new NextResponse("No user for this email",{status:400})
    if(!user.password) return new NextResponse("User email is used in another way of registration",{status:500})
    const correrctPassword=bcrypt.compareSync(password,user.password)
    if(!correrctPassword) return new NextResponse("Passwrd is not correct.",{status:400})
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
          });
          console.log(result)
          return new NextResponse("login successful",{status:200})
    
} catch (error) {
    console.log(error)
    return  NextResponse.json(error)
}
}