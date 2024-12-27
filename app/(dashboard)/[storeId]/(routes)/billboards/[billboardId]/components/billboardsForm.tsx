"use client";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

import { Billboard } from "@prisma/client";

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
interface BillboardsFormProps {
  initialData: Billboard | null;
}
const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});
type BillboardsFormValues = z.infer<typeof formSchema>;
const BillboardsForm: React.FC<BillboardsFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit billboard" : "create billboard";
  const description = initialData ? "Edit a billboard" : "Add a new billboard";
  const toastMessage = initialData ? "Billboard updated" : "Billboard created";
  const action = initialData ? "Save changes" : "Create";
  const form = useForm<BillboardsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });
  const params = useParams();
  const origin = useOrigin();
  const router = useRouter();
  const onSubmit = async (data: BillboardsFormValues) => {
    try {
      setLoading(true);
      if (initialData)
      await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data);
    else  await axios.post(`/api/${params.storeId}/billboards`, data);
      router.refresh();
      router.push(`/${params.storeId}/billboards`)
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
      await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
      
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
          <FormField
  control={form.control}
  name="imageUrl"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Background Image</FormLabel>
      <FormControl>
        <ImageUpload
          disabled={loading}
          onRemove={() => field.onChange("")}
          onChange={(url) => field.onChange(url)}
          value={field.value ? [field.value] : []} // Ensure it's always an array
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard label"
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

export default BillboardsForm;
