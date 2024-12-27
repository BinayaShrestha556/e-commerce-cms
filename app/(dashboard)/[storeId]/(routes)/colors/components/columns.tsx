"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-actions"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColorColumns = {
  id: string
name:string
  createdAt:string
 value:string 
}

export const columns: ColumnDef<ColorColumns>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell:({row})=>(
      <div className="flex items-center gap-x-2">
        {row.original.value}
        <div className="h-6 w-6 rounded-full border" style={{backgroundColor:row.original.value}}/>

      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
  },
  {
    id:"actions",
    cell:({row})=><CellAction data={row.original}/>  
  }
 
]
