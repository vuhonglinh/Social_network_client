"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "@/schema/auth.schema"
import { z } from "zod"
import { toast } from "@/components/ui/use-toast"
import authService from "@/services/auth"
import { useRouter } from "next/navigation"
import { IsAxiosError } from "@/http/Http"
import { AxiosError } from "axios"
import { ValidateErrorType } from "@/type/auth.type"

interface FormRegisterType {
    email: string;
    password: string;
    name: string;
}

export default function RegisterForm() {
    const router = useRouter()
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
        },
    })

    const handleRegister = async (value: FormRegisterType) => {
        try {
            const res = await authService.register(value);
            toast({
                description: res.data.message
            })
            form.reset();
            router.push('/')
        } catch (errors: any) {
            console.log("Lỗi :", errors);
            if (IsAxiosError(errors)) {
                const error = errors as AxiosError;
                if (error.response?.status === 422) {
                    const err = error.response.data as ValidateErrorType
                    for (const [key, value] of Object.entries(err.errors)) {
                        form.setError(key as keyof FormRegisterType, { type: 'manual', message: value[0] });
                    }
                }
            }
        }
    }

    return (
        <Card className="mx-auto max-w-sm mt-10">
            <CardHeader>
                <CardTitle className="text-xl">Đăng ký</CardTitle>
                <CardDescription>
                    Nhập thông tin của bạn để tạo tài khoản
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleRegister)} className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Họ và tên</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nguyen Van A" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mật khẩu</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            Tạo tài khoản
                        </Button>
                        <Button type="button" variant="outline" className="w-full">
                            Đăng ký bằng Google
                        </Button>
                    </form>
                </Form>
                <div className="mt-4 text-center text-sm">
                    Bạn đã có tài khoản?{" "}
                    <Link href="/login" className="underline">
                        Đăng nhập
                    </Link>
                </div>
            </CardContent>
        </Card >
    )
}
