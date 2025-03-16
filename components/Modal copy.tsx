"use client"
import React from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Button } from "./ui/button";
const formSchema = z.object({
    firstName: z.string().min(3, {
        message: "Firstname must be at least 2 characters.",
    }),
    lastName: z.string().min(3, {
        message: "Lastname must be at least 2 characters.",
    }),
    workTime: z.string().min(3, {
        message: "Enter time must be at least 2 characters.",
    }),
    status: z.string().min(3, {
        message: "Status must be selected.",
    }),
    email: z.string().email({
        message: "Email must be a valid email address.",
    }),
});
const options: string[] = ["success", "processing", "failed", "pending"]
const Modal = ({ display, onSubmit, showModal }: {
    display: boolean;
    onSubmit: any;
    showModal: any
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            workTime: "",
            status: "",
            email: "",
        },
    });

    const checkSubmit = () => {
       onSubmit()
       console.log()
    }
    return (
        <>
            {display && (
                <div className="absolute z-10 top-0 left-0 flex w-full h-full bg-black/15 backdrop-blur-sm justify-center items-center">
                    <div className="bg-white dark:bg-black min-w-[30%] px-4 py-3 rounded-md border border-black/10 dark:border-white/10">
                        <div className="flex justify-between py-3">
                            <h3 className="capitalize text-lg">Add Employee</h3>
                            <button className="hover:opacity-50" onClick={showModal}>
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(checkSubmit)}
                                className="space-y-8"
                            >
                                <div className="flex gap-2">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter first name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter last name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex gap-2 items-center">
                                    <FormField
                                        control={form.control}
                                        name="workTime"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Enter Time</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter work time" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Controller
                                        name="status"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Status</FormLabel>
                                                <Select
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {options.map((item, idx) => (
                                                            <SelectItem key={idx} value={item}>
                                                                <span className="capitalize">{item}</span>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>
                    </div>
                </div>
            )}
        </>
    )
}
export default Modal