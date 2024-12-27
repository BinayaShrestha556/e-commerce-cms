import prismadb from "@/lib/prismadb"
import OrderClient from "./components/client"
import {format} from "date-fns"
import { OrderColumns } from "./components/columns"
import { formatter } from "@/lib/utils"

const Orders = async ({params}:{params:{storeId:string}}) => {

  const orders=await prismadb.order.findMany({
    where:{
      storeId:params.storeId
    },
    include:{
      orderItems:{
        include:{
          product:true
        }
      }
    },
    orderBy:{
      createdAt:"desc"
    }
  })
  const formattedOrder:OrderColumns[]=orders.map((e)=>(
    {
      id:e.id,
     phone: e.phone,
     address: e.address ,
     products:e.orderItems.map((orderItem)=>orderItem.product.name).join(","),
     totalPrice:formatter.format(e.orderItems.reduce((total,item)=>{
        return total+Number(item.product.price)
     },0)),
     isPaid:e.isPaid,
     createdAt:format(e.createdAt,"MMMM do, yyyy")
    }
  ))
  
  return (
    <div className=" flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <OrderClient data={formattedOrder}/>
        </div>
    </div>
  )
}

export default Orders