"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BillboardColumns } from "./columns";

import { Button } from "@/components/ui/button";
import { Copy, Delete, Edit, MoreHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

import { AlertModal } from "@/components/modals/alert-modal";

interface CellActionProps {
  data: BillboardColumns;
}
export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Id Copied");
  };
  const router=useRouter()
  const params=useParams()
  const [loading,setLoading]=useState(false);
  const [open,setOpen]=useState(false);
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      toast.success("store deleted");
    } catch (error) {
      toast.error("make sure you remove all product and category");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
    <AlertModal isOpen={open} onClose={()=>setOpen(false)} onConform={onDelete} loading={loading}/>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>{" "}
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => onCopy(data.id)}>
          <Copy className="mr-2 h-4 w-4" /> Copy id
        </DropdownMenuItem>
        <DropdownMenuItem onClick={()=>router.push(`/${params.storeId}/billboards/${data.id}`)}>
          <Edit className="mr-2 h-4 w-4" /> Update
        </DropdownMenuItem>
        <DropdownMenuItem onClick={()=>setOpen(true)}>
          <Delete className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  );
};
