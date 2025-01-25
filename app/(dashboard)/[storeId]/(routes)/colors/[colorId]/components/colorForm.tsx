"use client";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

import { Color } from "@prisma/client";

import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {HexColorPicker} from "react-colorful"
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

import { useOrigin } from "@/hooks/use-origin";

interface ColorsFormProps {
  initialData: Color | null;
}
const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1).regex(/^#/,{message:"string must be a hex code"}),
});
type ColorsFormValues = z.infer<typeof formSchema>;
const ColorsForm: React.FC<ColorsFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit color" : "create color";
  const description = initialData ? "Edit a color" : "Add a new color";
  const toastMessage = initialData ? "Color updated" : "Color created";
  const action = initialData ? "Save changes" : "Create";
  const form = useForm<ColorsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name:"",
      value:"",
      
    },
  });
  const params = useParams();
  const origin = useOrigin();
  const router = useRouter();
  const onSubmit = async (data: ColorsFormValues) => {
    try {
      setLoading(true);
      if (initialData)
      await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data);
    else  await axios.post(`/api/${params.storeId}/colors`, data);
      router.refresh();
      router.push(`/${params.storeId}/colors`)
      toast.success(toastMessage);
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const [color, setColor] = useState(initialData?.value || "#aabbcc");
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
      
      router.push(`/${params.storeId}/colors`);
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
            color="icon"
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
                      placeholder="Color label"
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
                    <div className="flex flex-col gap-4">
                      <Input
                 disabled={loading}
                 placeholder="Color value"
                 {...field}
               />
                      {/* Color Picker Component */}
                      <HexColorPicker  color={field.value} onChange={(newColor) => {
                        setColor(newColor); // Update the color state
                        field.onChange(newColor); // Update the form field
                      }} />
                    </div>
                    {/* Display the selected color */}
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

export default ColorsForm;
