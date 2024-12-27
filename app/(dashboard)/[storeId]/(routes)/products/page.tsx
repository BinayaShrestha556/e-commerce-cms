import prismadb from "@/lib/prismadb"
import ProductClient from "./components/client"
import {format} from "date-fns"
import { ProductColumns } from "./components/columns"
import { formatter } from "@/lib/utils"

const Products = async ({params}:{params:{storeId:string}}) => {

  const products=await prismadb.product.findMany({
    where:{
      storeId:params.storeId
    },
    include:{
      category:true,
      size:true,
      color:true
    },
    orderBy:{
      createdAt:"desc"
    }
  })
  const formattedProducts:ProductColumns[]=products.map((e)=>(
    {
      id:e.id,
      name:e.name,
      isFeatured:e.isFeatured,
      isArchived: e.isArchived,
      price:formatter.format(e.price.toNumber()),
      category:e.category.name,
      size:e.size.value,
      color:e.color.value,
      createdAt:format(e.createdAt,"MMMM do, yyyy")
    }
  ))
  
  return (
    <div className=" flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <ProductClient data={formattedProducts}/>
        </div>
    </div>
  )
}

export default Products