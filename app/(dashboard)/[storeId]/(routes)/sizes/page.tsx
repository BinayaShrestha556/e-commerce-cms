import prismadb from "@/lib/prismadb"
import SizeClient from "./components/client"
import {format} from "date-fns"
import { SizeColumns } from "./components/columns"

const Sizes = async ({params}:{params:{storeId:string}}) => {

  const sizes=await prismadb.size.findMany({
    where:{
      storeId:params.storeId
    },
    orderBy:{
      createdAt:"desc"
    }
  })
  const formattedSize:SizeColumns[]=sizes.map((e)=>(
    {
      id:e.id,
      name:e.name,
      value:e.value,
      createdAt:format(e.createdAt,"MMMM do, yyyy")
    }
  ))
  
  return (
    <div className=" flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <SizeClient data={formattedSize}/>
        </div>
    </div>
  )
}

export default Sizes