"use client";
import { useMutation } from "convex/react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";

   const formSchema = z.object({
     name: z.string().min(1, "Name is required"),
     category: z.string().min(1, "Category is required"),
     quantity: z.number().min(1, "Quantity must be at least 1"),
   });

   export default function AddItem() {
     const addItem = useMutation(api.items.addItem);

     const form = useForm<z.infer<typeof formSchema>>({
       resolver: zodResolver(formSchema),
       defaultValues: {
         name: "",
         category: "",
         quantity: 1,
       },
     });

     const onSubmit = async (values: z.infer<typeof formSchema>) => {
       try {
         await addItem({
           ...values,
           dateAdded: Date.now(),
         });
         toast.success("Item added successfully");
         form.reset();
       
       } catch (error) {
         console.log(error);
         toast.error("Failed to add item");
       }
     };

     return (
       <div className="flex">
         <Sidebar />
         <div className="flex-1 p-6">
           <Card>
             <CardHeader>
               <CardTitle>Add New Item</CardTitle>
             </CardHeader>
             <CardContent>
               <Form {...form}>
                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                   <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel>Name</FormLabel>
                         <FormControl>
                           <Input {...field} />
                         </FormControl>
                         <FormMessage />
                       </FormItem>
                     )}
                   />
                   <FormField
                     control={form.control}
                     name="category"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel>Category</FormLabel>
                         <FormControl>
                           <Input {...field} />
                         </FormControl>
                         <FormMessage />
                       </FormItem>
                     )}
                   />
                   <FormField
                     control={form.control}
                     name="quantity"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel>Quantity</FormLabel>
                         <FormControl>
                           <Input
                             type="number"
                             {...field}
                             onChange={(e) => field.onChange(Number(e.target.value))}
                           />
                         </FormControl>
                         <FormMessage />
                       </FormItem>
                     )}
                   />
                   <Button type="submit" className="hover:cursor-default">Add Item</Button>
                 </form>
               </Form>
             </CardContent>
           </Card>
         </div>
       </div>
     );
   }