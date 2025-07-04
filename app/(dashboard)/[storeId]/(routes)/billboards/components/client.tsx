"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BillboardColumns, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface BillboardProps {
  data: BillboardColumns[];
}
const BillboardClient: React.FC<BillboardProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <div className="z-0">
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboard`}
          description="maange billboards for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
    </div>
  );
};

export default BillboardClient;
