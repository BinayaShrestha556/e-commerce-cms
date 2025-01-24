import RegisterForm from "@/components/auth/login/register-form"
import Link from "next/link"

const page=()=>{
    return(
        <div>
            <RegisterForm admin={false}/>
            <Link href="/auth/users/login">Already have an account</Link>
        </div>
    )
}
export default page