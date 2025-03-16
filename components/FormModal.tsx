import React, { useEffect } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import {
    Form,
    FormControl,
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

const FormModal = ({ display, onSubmit, showModal, formConfig, defaultValues, zObject }: {
    display: any;
    onSubmit: any;
    showModal: any;
    formConfig: any;
    defaultValues: any;
    zObject: any;
}) => {
    const form = useForm<FormData>({
        resolver: zodResolver(z.object(zObject)),
        defaultValues: defaultValues || {}
    });

    const checkSubmit = (data: FormData) => {
        onSubmit(data);
        form.reset({})
    };

    useEffect(() => {
        form.reset(defaultValues);
    }, [defaultValues, form]);

    // if (!display) return null;
   
   const close = ()=>{
    showModal()
    form.reset({})
   }

    return (
        <>
            {display && (
                <div className="absolute z-10 top-0 left-0 flex w-full h-full bg-black/15 backdrop-blur-sm justify-center items-center">
                    <div className="bg-white dark:bg-black min-w-[30%] px-4 py-3 rounded-md border border-black/10 dark:border-white/10">
                        <div className="flex justify-between py-3">
                            <h3 className="capitalize text-lg">{''}</h3>
                            <button className="hover:opacity-50" onClick={close}>
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(checkSubmit)}
                                className="space-y-8"
                            >
                                {formConfig.map((field: any) => {
                                    switch (field.type) {
                                        case "text":
                                        case "email":
                                            return (
                                                <FormField
                                                    key={field.name}
                                                    control={form.control}
                                                    name={field.name}
                                                    render={({ field: controllerField }) => (
                                                        <FormItem>
                                                            <FormLabel>{field.label}</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type={field.type}
                                                                    placeholder={field.placeholder}
                                                                    {...controllerField}
                                                                    value={controllerField.value || ''} // Ensure value is always a string
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            );
                                        case "select":
                                            return (
                                                <Controller
                                                    key={field.name}
                                                    name={field.name}
                                                    control={form.control}
                                                    render={({ field: controllerField }) => (
                                                        <FormItem>
                                                            <FormLabel>{field.label}</FormLabel>
                                                            <Select
                                                                value={controllerField.value || ''} // Ensure value is always a string
                                                                onValueChange={controllerField.onChange}
                                                            >
                                                                <SelectTrigger className="w-[180px]">
                                                                    <SelectValue placeholder="Select status" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {field.options?.map((option: any, idx: any) => (
                                                                        <SelectItem key={idx} value={option}>
                                                                            <span className="capitalize">{option}</span>
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            );
                                        default:
                                            return null;
                                    }
                                })}
                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>
                    </div>
                </div>
            )}
        </>
    );
};

export default FormModal;