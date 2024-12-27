"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-actions"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardColumns = {
  id: string
  label: string
  createdAt:string
  
}

export const columns: ColumnDef<BillboardColumns>[] = [
  {
    accessorKey: "label",
    header: "Label",
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
