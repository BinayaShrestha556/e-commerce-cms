import RegisterForm from "@/components/auth/login/register-form"
import Link from "next/link"
import { Suspense } from "react"

const page=()=>{
    return(
        <div>
            <Suspense fallback={<div>Loading...</div>}><RegisterForm admin={false}/></Suspense>
            <Link href="/auth/users/login">Already have an account</Link>
        </div>
    )
}
export default page