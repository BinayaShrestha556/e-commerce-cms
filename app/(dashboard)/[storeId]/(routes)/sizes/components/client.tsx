"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Size } from "@prisma/client"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { SizeColumns, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"
interface SizeProps{
  data: SizeColumns[]
}
const SizeClient: React.FC<SizeProps> = ({data}) => {
    const router = useRouter()
    const params= useParams()

  return (
    <>
    <div className="flex items-center justify-between">
<Heading title={`Size`} description="maange sizes for your store"/>
<Button onClick={()=>router.push(`/${params.storeId}/sizes/new`)}>
    <Plus className="mr-2 h-4 w-4"/>
    Add new
</Button>
    </div>
    <Separator/>
    <DataTable searchKey="name" columns={columns} data={data}/>
  
    </>
  )
}

export default SizeClient