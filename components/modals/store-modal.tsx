"use client"
import * as z from "zod"
import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "../ui/modal"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
const formSchema=z.object({
    name: z.string().min(1),
  

})
export const StoreModal=()=>{
    const [loading,setLoading]=useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name:"",
        }
    })
    const onSubmit=async(values:z.infer<typeof formSchema>)=>{
        try {
            setLoading(true)
            const response=await axios.post('/api/stores',values);
            window.location.assign(`/${response.data.id}`);
        } catch (error) {
            toast.error("something went wrong")
        }
        finally{
            setLoading(false)
        }
    }

    
    const storeModal=useStoreModal();
    return(
        <Modal  title="Create Store"  isOpen={storeModal.isOpen} onClose={storeModal.onClose} description="Add a new store to manage products and categories">
<div className="space-y-4 py-2 pb-4">
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField name="name" control={form.control} render={({field})=>(<FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
                <Input disabled={loading} placeholder="E-commerce" {...field} />
            </FormControl>
            <FormMessage/>
            </FormItem>)}>

            </FormField>
            <div className="mt-6 w-full gap-2 flex items-center justify-end">
                <Button disabled={loading} variant="outline">Cancel</Button>
                <Button disabled={loading} type="submit" variant="secondary">Continue</Button>
            </div>
        </form>
    </Form>
</div>

        </Modal>
    )
}