"use client"
import { signOut } from 'next-auth/react'
import React, { useEffect } from 'react'

const page = () => {
    useEffect(()=>{
        signOut();
    },[])
  return (
    <div>page</div>
  )
}

export default page