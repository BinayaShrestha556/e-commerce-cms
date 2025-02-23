"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { submit } from "@/server-actions/contact";
import toast from "react-hot-toast";

const ContactForm = () => {
  const formSchema = z.object({
    email: z.string().email(),
    comment: z.string().min(1),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      comment: "",
    },
  });
  const onSubmit = async (value: { email: string; comment: string }) => {
    const res = await submit(value);
    if (res === "success") toast.success("success");
    else toast.error("error");
  };
  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col gap-4 "
        >
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@example.com"
                    className="rounded-sm border border-border"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="comment"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <textarea
                    placeholder="write something......"
                    cols={40}
                    className="bg-transparent border border-border p-2 rounded-sm"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button> submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
