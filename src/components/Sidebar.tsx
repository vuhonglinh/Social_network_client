"use client"
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { toast } from '@/components/ui/use-toast'
import authService from '@/services/auth'
import { Home, LineChart, LogOut, Package, Package2, Settings, ShoppingCart, Users2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

export default function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()


    const handleLogout = async () => {
        try {
            const res = await authService.logout()
            toast({
                description: res.data.message,
            })
            router.push('/login');
        } catch (errors) {
            console.log(errors);
        }
    }

    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <Link
                    href="#"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                    <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                    <span className="sr-only">Acme Inc</span>
                </Link>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/"
                            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${pathname === '/' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
                        >
                            <Home className="h-5 w-5" />
                            <span className="sr-only">Điều khiển</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Điều khiển</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="order"
                            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${pathname === '/order' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`} >
                            <ShoppingCart className="h-5 w-5" />
                            <span className="sr-only">Đơn hàng</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Đơn hàng</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="product"
                            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${pathname === '/product' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}                >
                            <Package className="h-5 w-5" />
                            <span className="sr-only">Sản phẩm</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Sản phẩm</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="user"
                            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${pathname === '/user' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
                        >
                            <Users2 className="h-5 w-5" />
                            <span className="sr-only">Người dùng</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Người dùng</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="aaa"
                            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${pathname === '/aaa' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}                >
                            <LineChart className="h-5 w-5" />
                            <span className="sr-only">Analytics</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Analytics</TooltipContent>
                </Tooltip>
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <LogOut onClick={handleLogout} className="h-5 w-5 cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent side="right">Đăng xuất</TooltipContent>
                </Tooltip>
            </nav>
        </aside>
    )
}
