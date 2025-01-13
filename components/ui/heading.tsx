import { cn } from "@/lib/utils";

interface HeadingProps{
    title:string;
    description:string;
    size?:string
}
export const Heading : React.FC<HeadingProps>=({title,description,size})=>{
    return(
        <div>
            <h2 className={cn("text-5xl font-bold tracking-tight ",size&&`text-${size}`)}>{title}</h2>
            <p className="text-sm text-muted-foreground">
                {description}
            </p>
        </div>
    )
}