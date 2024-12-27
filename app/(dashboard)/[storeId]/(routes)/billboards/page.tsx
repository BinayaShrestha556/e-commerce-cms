import prismadb from "@/lib/prismadb"
import BillboardClient from "./components/client"
import {format} from "date-fns"
import { BillboardColumns } from "./components/columns"

const Billboards = async ({params}:{params:{storeId:string}}) => {

  const billboards=await prismadb.billboard.findMany({
    where:{
      storeId:params.storeId
    },
    orderBy:{
      createdAt:"desc"
    }
  })
  const formattedBillboard:BillboardColumns[]=billboards.map((e)=>(
    {
      id:e.id,
      label:e.label,
      createdAt:format(e.createdAt,"MMMM do, yyyy")
    }
  ))
  
  return (
    <div className=" flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <BillboardClient data={formattedBillboard}/>
        </div>
    </div>
  )
}

export default Billboards