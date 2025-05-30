"use client";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Store } from "@prisma/client";

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
interface SettingsFormProps {
  initialData: Store;
}
const formSchema = z.object({
  name: z.string().min(1),
});
type SettingsFormValues = z.infer<typeof formSchema>;
const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const params = useParams();
  const origin=useOrigin()
  const router = useRouter();
  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh()
      toast.success('store has been updated')
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
      
    }
  };
  const onDelete=async()=>{
    try {
      setLoading(true)
      await axios.delete(`/api/stores/${params.storeId}`)
        router.refresh();
        router.push('/')
        toast.success('store deleted')
      
    } catch (error) {
      toast.error("make sure you remove all product and category")
      
    }finally{
      setLoading(false)
      setOpen(false)
    }
  }
  return (
    <>
    <AlertModal isOpen={open} onClose={()=>setOpen(false)} onConform={onDelete} loading={loading}/>
      <div className="flex items-center pb-2 justify-between">
        <Heading title="Settings" description="Manage store preferences" />
        <Button
          disabled={loading}
          variant="destructive"
          size="icon"
          onClick={()=>setOpen(true)}
        >
          <Trash size={20} />
        </Button>
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="storename"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            
            disabled={loading}
            className="ml-auto"
            type="submit"
          >
            {" "}
            Save changes
          </Button>
        </form>
      </Form>
      <Separator className="my-4" />
      <ApiAlert title="NEXT_PUBLIC_API_URL" description={`${origin}/api/${params.storeId}`} variant='public' />
    </>
  );
};

export default SettingsForm;
