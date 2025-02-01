"use client"
import { login } from '@/server-actions/login'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import FormAlertMessage from '@/components/ui/form-message'
import { Input } from '@/components/ui/input'
import { LoginSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState, useTransition } from 'react'
import {useForm} from "react-hook-form"
import * as z from 'zod'
import { Social } from './socials'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const LoginForm = ({admin}:{admin:boolean}) => {
    const [pending,setTransition]=useTransition()
    const params=useSearchParams()
    const urlError=params.get("error")==="OAuthAccountNotLinked"?"This email is already in use with another provider!":""
    const [error,setErr]=useState<string|undefined>("")
    const [success,setSuccess]=useState<string|undefined>("")
    const form = useForm<z.infer<typeof LoginSchema>>({

        resolver:zodResolver(LoginSchema),
        defaultValues:{
            email:"",
            password:""
        }

    })
    const onSubmit=(values:z.infer<typeof LoginSchema>)=>{
        setErr("")
        setSuccess("")
        
        setTransition(()=>
        login(values).then((data)=>
        {
            setErr(data?.error)
            setSuccess(data?.success)
           

        })
    )


    }
  return (
    <div className='p-5 w-full rounded-md shadow-md '>
        <h1 className='text-center  text-2xl font-bold font-mono'>Login</h1>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='border flex flex-col bg-card/50  gap-3 mt-3 rounded-lg p-6'>
                
                    <FormField control={form.control} name='email'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input className='bg-background' disabled={pending} {...field} type="email"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                     <FormField control={form.control} name='password'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>
                                Password
                            </FormLabel>
                            <FormControl>
                                <Input className='bg-background outline-1 ' disabled={pending} {...field} type="password"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                
                <FormAlertMessage type='error' message={error||urlError}/>
                <FormAlertMessage type='success' message={success}/>
                    <Link href="/auth/change-password"><Button variant="ghost" disabled={pending} className='mb-2 hover:underline font-semibold text-sm' >Forgot password?</Button></Link>
                <Button disabled={pending} className='w-full text-md font-semibold'>Login</Button>
                <div className='mt-4'><Social admin={admin}/></div>
               
            </form>


        </Form>
        <Link href="/auth/register"><Button variant="ghost" disabled={pending} className=' mt-3 hover:no-underline underline font-semibold text-sm' >Dont have an account?</Button></Link>
    </div>
)
}

export default LoginForm