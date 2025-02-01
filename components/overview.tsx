"use client"
import { GraphData } from "@/actions/get-graph-revenue"
import { useTheme } from "next-themes"

interface OverviewProps{
    data : GraphData[]
}
import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis} from "recharts"
const Overview:React.FC<OverviewProps>=({data})=>{
    const theme=useTheme()
    return(
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                <YAxis tickFormatter={(value)=>`$${value}`} dataKey="total" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>

        <Bar dataKey="total" fill={theme.resolvedTheme==="dark"?"#faf4eb":"#000000"} className="bg-background" radius={[4,4,0,0]}/>
            </BarChart>

        </ResponsiveContainer>
    )
}
export default Overview