"use client"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

export const MainNav=({className,...props}:React.HtmlHTMLAttributes<HTMLElement>)=>{
    const pathname=usePathname()
    const param=useParams()
    const routes=[
        {
            href:`/${param.storeId}`,
            label:"Home",
            active:pathname===`/${param.storeId}`,
        },
        {
            href:`/${param.storeId}/settings`,
            label:"Settings",
            active:pathname===`/${param.storeId}/settings`,
        },
        {
            href:`/${param.storeId}/billboards`,
            label:"Billboards",
            active:pathname===`/${param.storeId}/billboards`,
        },
        {
            href:`/${param.storeId}/categories`,
            label:"Categories",
            active:pathname===`/${param.storeId}/categories`,
        },
        {
            href:`/${param.storeId}/sizes`,
            label:"Sizes",
            active:pathname===`/${param.storeId}/sizes`,
        },
        {
            href:`/${param.storeId}/colors`,
            label:"Colors",
            active:pathname===`/${param.storeId}/colors`,
        },
        {
            href:`/${param.storeId}/products`,
            label:"Products",
            active:pathname===`/${param.storeId}/products`,
        },
        {
            href:`/${param.storeId}/orders`,
            label:"Orders",
            active:pathname===`/${param.storeId}/orders`,
        },

    ]
return(

    <div className={cn(" flex items-center mx-4 gap-3 lg:mx-6 ",className)}>
        {
            routes.map((e,i)=>(
                <Link href={e.href} key={i} className={cn(" flex items-center text-sm font-medium transition-colors hover:text-primary",e.active?'text-black dark:text-white':"text-muted-foreground")}>{e.label}</Link>
            ))
        }
    </div>
)
}