"use client"
import LoginForm from "@/components/auth/login/login-form"
import { Suspense } from "react"

const Login=()=>{
    return(
        <div className="w-1/3">
            <Suspense fallback={<div>Loading...</div>}>
            <LoginForm admin={true}/></Suspense>
        </div>
        )}
        export default Login