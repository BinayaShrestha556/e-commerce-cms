"use client"
import { Copy, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";
import toast from "react-hot-toast";

interface ApiAlertProps{
    title:string;
    description:string;
    variant:"public"|"admin";

}
const textMap:Record<ApiAlertProps["variant"],string>={
    public:"Public",
    admin:"Admin"
};
const variantMap:Record<ApiAlertProps["variant"],BadgeProps['variant']>={
    public:"secondary",
    admin:"destructive"
};
export const ApiAlert : React.FC<ApiAlertProps>=({
    title, description, variant="public"
})=>{
    const onCopy=()=>{
        navigator.clipboard.writeText(description);
        toast.success('API route copied to the clipboard')
    }
 return(
    <Alert className="p-4" >
<Server className="h-4 w-4 m-0"/>
<AlertTitle className="flex font-semibold items-center gap-x-2 mb-0">
    {title}
    <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
</AlertTitle>
<AlertDescription className="mt-4 flex w-full gap-2 items-center justify-between">
    <code className="relative flex-shrink rounded bg-muted px-[0.3rem] py=[0.2rem] text-wrap overflow-x-scroll font-mono text-sm font-semibold">{description}</code>
    <Button variant='outline' size="icon" onClick={onCopy}>
        <Copy className="w-4 h-4"/>
    </Button>
</AlertDescription>
    </Alert>
 )
}