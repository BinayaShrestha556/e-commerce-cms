"use client";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

import { Size } from "@prisma/client";

import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import ImageUpload from "@/components/ui/image-upload";
interface SizesFormProps {
  initialData: Size | null;
}
const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});
type SizesFormValues = z.infer<typeof formSchema>;
const SizesForm: React.FC<SizesFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit size" : "create size";
  const description = initialData ? "Edit a size" : "Add a new size";
  const toastMessage = initialData ? "Size updated" : "Size created";
  const action = initialData ? "Save changes" : "Create";
  const form = useForm<SizesFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name:"",
      value:"",
      
    },
  });
  const params = useParams();
  const origin = useOrigin();
  const router = useRouter();
  const onSubmit = async (data: SizesFormValues) => {
    try {
      setLoading(true);
      if (initialData)
      await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data);
    else  await axios.post(`/api/${params.storeId}/sizes`, data);
      router.refresh();
      router.push(`/${params.storeId}/sizes`)
      toast.success(toastMessage);
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
      
      router.push(`/${params.storeId}/sizes`);
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
    { open&& <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConform={onDelete}
        loading={loading}
      />}
      <div className="flex items-center pb-2 justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash size={20} />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-8 w-full"
        >
         
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size value"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator className="my-4" />
    </>
  );
};

export default SizesForm;
