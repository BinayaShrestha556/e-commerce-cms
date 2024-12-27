"use client"


import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"


import { OrderColumns, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

interface OrderProps{
  data: OrderColumns[]
}
const OrderClient: React.FC<OrderProps> = ({data}) => {
 return (
    <>  
<Heading title={`Order (${data.length})`} description="maange orders for your store"/>
 <Separator/>
    <DataTable searchKey="label" columns={columns} data={data}/>
     </>
  )
}

export default OrderClient