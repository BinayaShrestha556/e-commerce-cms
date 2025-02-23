"use server"

import { sendEmail } from "@/lib/mail"

interface Values{
    email:string,
    comment:string
}
export const submit=async (values:Values)=>{
    try {
        await sendEmail(values.email,values.comment)
        return "success"
    } catch (error) {
        console.log(error)

        return "failed"
    }

}