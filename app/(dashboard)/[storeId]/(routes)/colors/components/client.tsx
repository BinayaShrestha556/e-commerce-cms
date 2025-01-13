"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Color } from "@prisma/client"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { ColorColumns, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"
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
    <Heading title='API' description="API calls for colors"/>
    <Separator/>
    <ApiList entityName="colors" entityIdName="colorId"/>
    </>
  )
}

export default ColorClient