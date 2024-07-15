"use client"
import {
    TooltipProvider,
} from "@/components/ui/tooltip"
import Sidebar from "@/components/Sidebar"
import SidebarChat from "@/components/SidebarChat";
import useEcho from "@/hooks/echo";
import { UserType } from "@/type/auth.type";
import { useEffect } from "react";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <TooltipProvider>
            <div className="flex min-h-screen w-full flex-col bg-muted/40">
                <Sidebar />
                <div className="flex sm:pl-14">
                    <div className="w-1/3">
                        <SidebarChat />
                    </div>
                    <div className="w-2/3">
                        {children}
                    </div>
                </div>
            </div>
        </TooltipProvider>
    )
}
