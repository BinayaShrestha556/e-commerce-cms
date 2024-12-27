import prismadb from "@/lib/prismadb"
import CategoryClient from "./components/client"
import {format} from "date-fns"
import {  CategoryColumn } from "./components/columns"

const Categories= async ({params}:{params:{storeId:string}}) => {

  const categories=await prismadb.category.findMany({
    where:{
      storeId:params.storeId
    },
    include:{
      billboard:true
    },
    orderBy:{
      createdAt:"desc"
    }
  })
  const formattedCategories:CategoryColumn[]=categories.map((e)=>(
    {
      id:e.id,
      name:e.name,
      billboardLabel:e.billboard.label,
      createdAt:format(e.createdAt,"MMMM do, yyyy")
    }
  ))
  
  return (
    <div className=" flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <CategoryClient data={formattedCategories}/>
        </div>
    </div>
  )
}

export default Categories