

import LoginForm from "@/components/auth/login/login-form"
import { Suspense } from "react"


const page=()=>{
 
    return(
        <div>
            <Suspense fallback={<div>Loading...</div>}><LoginForm admin={false} /></Suspense>
           

        </div>
    )
}
export default page