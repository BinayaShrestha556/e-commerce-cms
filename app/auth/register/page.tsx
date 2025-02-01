"use client"
import RegisterForm from "@/components/auth/login/register-form"
import { Suspense } from "react"

const Register=()=>{
    return(
        <div className="w-1/3">
           <Suspense fallback={<div>Loading...</div>}> <RegisterForm admin={true}/></Suspense>
        </div>
        )}
        export default Register