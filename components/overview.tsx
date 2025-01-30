"use client"
interface OverviewProps{
    data : any[]
}
import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis} from "recharts"
const Overview:React.FC<OverviewProps>=({data})=>{
    return(
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                <YAxis tickFormatter={(value)=>`$${value}`} dataKey="total" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>

        <Bar dataKey="total" fill="#faf4eb" radius={[4,4,0,0]}/>
            </BarChart>

        </ResponsiveContainer>
    )
}
export default Overview