"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import {  CategoryColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

interface BillboardProps{
  data: CategoryColumn[]
}
const CategoryClient: React.FC<BillboardProps> = ({data}) => {
    const router = useRouter()
    const params= useParams()

  return (
    <>
    <div className="flex items-center justify-between">
<Heading title={`Categories`} description="maange Categories for your store"/>
<Button onClick={()=>router.push(`/${params.storeId}/categories/new`)}>
    <Plus className="mr-2 h-4 w-4"/>
    Add new
</Button> 
    </div>
    <Separator/>
    <DataTable searchKey="name" columns={columns} data={data}/>

    </>
  )
}

export default CategoryClient