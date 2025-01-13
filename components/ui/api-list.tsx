"use client";

import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { ApiAlert } from "./api-alert";
import { Heading } from "./heading";

interface ApiListProps{
    entityName:string;
    entityIdName:string;

}
export const ApiList:React.FC<ApiListProps>=({
    entityName, entityIdName
})=>{
    const params=useParams()
    const origin = useOrigin();
    const baseUrl=`${origin}/api/${params.storeId}`
    return(
        <div className="flex-col flex lg:flex-row gap-6">
            <div className="flex-col gap-3 flex">
                <Heading title="Public Routes" description="Routes that doesnt need authentication" size="2xl"/>
                            <ApiAlert title="GET" variant="public" description={`${baseUrl}/${entityName}`}/>
            <ApiAlert title="GET" variant="public" description={`${baseUrl}/${entityName}/{${entityIdName}}`}/>
            </div>

            <div className="flex-col gap-3 flex">
            <Heading title="Private Routes" description="Routes that need authentication" size="2xl"/>

            <ApiAlert title="POST" variant="admin" description={`${baseUrl}/${entityName}`}/>
            <ApiAlert title="PATCH" variant="admin" description={`${baseUrl}/${entityName}/{${entityIdName}}`}/>
            <ApiAlert title="DELETE" variant="admin" description={`${baseUrl}/${entityName}/{${entityIdName}}`}/>
</div>
        </div>
    )
}