"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-actions"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumns = {
  id: string
  name: string
  price:string
  size: string
  color:string
  isFeatured: boolean
  isArchived: boolean
  category:string

  createdAt:string
  
}

export const columns: ColumnDef<ProductColumns>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey:"isArchived",
    header: "Archived"
  },{
    accessorKey:"isFeatured",
    header: "Featured"
  },{
    accessorKey:"price",
    header:"Price"
  },{
    accessorKey:"category",
    header:"Category"
  },{
    accessorKey:"size",
    header:"Size"
  },{
    accessorKey:"color",
    header:"Color",
    cell:({row})=>(
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div className="h-6 w-6 rounded-full border" style={{backgroundColor:row.original.color}}/>

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
