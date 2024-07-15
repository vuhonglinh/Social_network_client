"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { forgotPasswordSchema } from "@/schema/auth.schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import authService from "@/services/auth"
import { AxiosError } from "axios"
import { IsAxiosError } from "@/http/Http"
import { ValidateErrorType } from "@/type/auth.type"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import { useEffect } from "react"


interface FormForgotPasswordType {
    email: string;
}

export default function ForgotForm() {
    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: '',
        },
    })

    const handleForgotPassword = async (value: FormForgotPasswordType) => {
        try {
            const res = await authService.forgotPassword(value);
            console.log(res);
            toast({
                description: res.data.message,
            })
            form.reset();
        } catch (errors: any) {
            if (IsAxiosError(errors)) {
                const error = errors as AxiosError;
                if (error.response?.status === 422) {
                    const err = error.response.data as ValidateErrorType
                    for (const [key, value] of Object.entries(err.errors)) {
                        form.setError(key as keyof FormForgotPasswordType, { type: 'manual', message: value[0] });
                    }
                }
            }
        }
    }

    return (
        <Card className="mx-auto max-w-sm mt-10">
            <CardHeader>
                <CardTitle className="text-2xl">Quên mật khẩu</CardTitle>
                <CardDescription>
                    Nhập email của bạn bên dưới để cấp lại mật khẩu
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleForgotPassword)} className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="m@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            Gửi
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}


