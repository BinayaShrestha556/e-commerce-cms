"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-actions"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SizeColumns = {
  id: string
name:string
  createdAt:string
 value:string 
}

export const columns: ColumnDef<SizeColumns>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
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
