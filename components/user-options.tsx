"use client"

import Image from "next/image"
import { ModeToggle } from "./theme-toggle"
import { Button } from "./ui/button"
import { CircleUser } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { useState } from "react"

export const UserOptions=()=>{
    const session = useSession()
    const image=session.data?.user.image
    const [isModalOpen,setIsModalOpen]=useState(false)
    const onClick =async()=>{
        await signOut()
    }
return <div className="flex items-center gap-2">
 <ModeToggle/>
 <div className="relative"> 
 {image?<div onClick={()=>setIsModalOpen(true)} className="relative h-8 w-8 cursor-pointer"><Image src={image} alt="" fill className="object-cover"/></div>:<CircleUser className="cursor-pointer" onClick={()=>setIsModalOpen((e)=>!e)}/>}
{isModalOpen? <div className="absolute right-0 top-7"><div className=" flex flex-col p-3  bg-white/20 border rounded-lg">
    <Button onClick={onClick}>signout</Button>

</div>
</div>:""}
 
 </div>
 </div>
}