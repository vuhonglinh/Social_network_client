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
import { resetPasswordFormSchema } from "@/schema/auth.schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import authService from "@/services/auth"
import { AxiosError } from "axios"
import { IsAxiosError } from "@/http/Http"
import { ValidateErrorType } from "@/type/auth.type"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"



interface ResetPasswordType {
    email: string,
    password: string,
    token: string,
}

type Props = {
    params: { code: string },
    searchParams: { email: string }
}

export default function ResetPasswordForm(params: Props) {
    const route = useRouter()
    const { code } = params.params
    const { email } = params.searchParams
    const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
        resolver: zodResolver(resetPasswordFormSchema),
        defaultValues: {
            confirm_password: '',
            password: '',
            email: email,
            token: code
        },
    })

    const handleForgotPassword = async (value: ResetPasswordType) => {
        try {
            const res = await authService.resetPassword(value);
            toast({
                description: res.data.message,
            })
            form.reset();
            route.push('/login')
        } catch (errors: any) {
            if (IsAxiosError(errors)) {
                const error = errors as AxiosError;
                if (error.response?.status === 422) {
                    const err = error.response.data as ValidateErrorType
                    for (const [key, value] of Object.entries(err.errors)) {
                        form.setError(key as keyof Omit<ResetPasswordType, 'email' | 'token'>, { type: 'manual', message: value[0] });
                    }
                }
            }
        }
    }

    return (
        <Card className="mx-auto max-w-sm mt-10">
            <CardHeader>
                <CardTitle className="text-2xl">Đổi mật khẩu</CardTitle>
                <CardDescription>
                    Nhập để tạo lại mật khẩu
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleForgotPassword)} className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mật khẩu</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirm_password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Xác nhận mật khẩu</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            Lưu
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}


