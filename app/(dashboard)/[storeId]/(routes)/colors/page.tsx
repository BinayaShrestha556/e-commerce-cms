import prismadb from "@/lib/prismadb"
import ColorClient from "./components/client"
import {format} from "date-fns"
import { ColorColumns } from "./components/columns"

const Colors = async ({params}:{params:{storeId:string}}) => {

  const colors=await prismadb.color.findMany({
    where:{
      storeId:params.storeId
    },
    orderBy:{
      createdAt:"desc"
    }
  })
  const formattedColor:ColorColumns[]=colors.map((e)=>(
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
            <ColorClient data={formattedColor}/>
        </div>
    </div>
  )
}

export default Colors