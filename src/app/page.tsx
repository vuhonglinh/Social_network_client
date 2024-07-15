import {
  TooltipProvider,
} from "@/components/ui/tooltip"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import Dashboard from "@/components/Dashboard";

export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Sidebar />
        <div className="flex flex-col sm:gap-4  sm:pl-14">
          <Header />
          <Dashboard />
        </div>
      </div>
    </TooltipProvider>
  )
}
