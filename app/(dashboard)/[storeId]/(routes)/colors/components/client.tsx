"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { ColorColumns, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

interface ColorProps{
  data: ColorColumns[]
}
const ColorClient: React.FC<ColorProps> = ({data}) => {
    const router = useRouter()
    const params= useParams()

  return (
    <>
    <div className="flex items-center justify-between">
<Heading title={`Color`} description="maange colors for your store"/>
<Button onClick={()=>router.push(`/${params.storeId}/colors/new`)}>
    <Plus className="mr-2 h-4 w-4"/>
    Add new
</Button>
    </div>
    <Separator/>
    <DataTable searchKey="name" columns={columns} data={data}/>

    </>
  )
}

export default ColorClient