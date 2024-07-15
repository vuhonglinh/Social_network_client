"use client"
import Link from "next/link"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { loginSchema } from "@/schema/auth.schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import authService from "@/services/auth"
import { AxiosError } from "axios"
import { IsAxiosError } from "@/http/Http"
import { ValidateErrorType } from "@/type/auth.type"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@radix-ui/react-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from 'next/navigation'
import { useEffect } from "react"


interface FormLoginType {
    email: string;
    password: string;
    remember: boolean;
}

export default function LoginForm() {
    const router = useRouter()
    useEffect(() => {
        authService.rememberMe().then((res) => {
            if (res.status === 200) {
                toast({
                    description: res.data.message
                })
                router.push('/')
            }
        }).catch((err) => {

        });
    }, [])

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            remember: false
        },
    })

    const handleLogin = async (value: FormLoginType) => {
        try {
            const res = await authService.login(value);
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
                        form.setError(key as keyof FormLoginType, { type: 'manual', message: value[0] });
                    }
                } else if (error.response?.status === 401) {
                    toast({
                        variant: "destructive",
                        title: "Đăng nhập thất bại.",
                        description: (error.response.data as ValidateErrorType).message,
                        action: <ToastAction altText="Try again">Thử lại</ToastAction>,
                    })
                    form.reset();
                }
            }
        }
    }

    const handleLoginGoogle = async () => {
        window.location.href = process.env.NEXT_PUBLIC_BACKEND_URL + '/api/auth/google'
    }

    return (
        <Card className="mx-auto max-w-sm mt-10">
            <CardHeader>
                <CardTitle className="text-2xl">Đăng nhập</CardTitle>
                <CardDescription>
                    Nhập email của bạn bên dưới để đăng nhập vào tài khoản của bạn
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleLogin)} className="grid gap-4">
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
                        <Link href="/forgot" className="ml-auto hover:text-cyan-500 inline-block text-sm underline float-end">
                            Quên mật khẩu?
                        </Link>
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
                        <FormField
                            control={form.control}
                            name="remember"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />

                                    </FormControl>
                                    <span className="hover:text-gray-500">Ghi nhớ đăng nhập</span>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                        <Button onClick={handleLoginGoogle} type="button" className="w-full bg-cyan-50 text-black hover:text-white">
                            Đăng nhập bằng Google
                        </Button>
                    </form>
                </Form>
                <div className="mt-4 text-center text-sm">
                    Bạn chưa có tài khoản?{" "}
                    <Link href="/register" className="underline">
                        Đăng ký
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}


