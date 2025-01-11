"use client"

import { useStoreModal } from "@/hooks/use-store-modal";

import { useEffect } from "react";

export default function Home() {
  const onOpen=useStoreModal((state)=>state.onOpen);
  const isOpen=useStoreModal((state)=>state.isOpen)
  useEffect(()=>{
    if(!isOpen) onOpen();

  },[isOpen,onOpen])
  return (
    <div className="text-white flex items-center gap-2 p-3">
      hello
      {/* <SignedIn>
      <UserButton/></SignedIn> */}
     {/* <Modal title='test' description="hello" isOpen onClose={()=>{}}>children</Modal> */}
    </div>
  );
}
