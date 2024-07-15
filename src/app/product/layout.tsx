import {
    TooltipProvider,
} from "@/components/ui/tooltip"
import Sidebar from "@/components/Sidebar"
import SidebarChat from "@/components/SidebarChat";

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
                    {children}
                </div>
            </div>
        </TooltipProvider>
    )
}
