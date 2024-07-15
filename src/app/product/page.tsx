"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bird, Rabbit, Turtle } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

export default function InputForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
            <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                    Settings
                </legend>
                <div className="grid gap-3">
                    <Label htmlFor="model">Model</Label>
                    <Select>
                        <SelectTrigger
                            id="model"
                            className="items-start [&_[data-description]]:hidden"
                        >
                            <SelectValue placeholder="Select a model" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="genesis">
                                <div className="flex items-start gap-3 text-muted-foreground">
                                    <Rabbit className="size-5" />
                                    <div className="grid gap-0.5">
                                        <p>
                                            Neural{" "}
                                            <span className="font-medium text-foreground">
                                                Genesis
                                            </span>
                                        </p>
                                        <p className="text-xs" data-description>
                                            Our fastest model for general use cases.
                                        </p>
                                    </div>
                                </div>
                            </SelectItem>
                            <SelectItem value="explorer">
                                <div className="flex items-start gap-3 text-muted-foreground">
                                    <Bird className="size-5" />
                                    <div className="grid gap-0.5">
                                        <p>
                                            Neural{" "}
                                            <span className="font-medium text-foreground">
                                                Explorer
                                            </span>
                                        </p>
                                        <p className="text-xs" data-description>
                                            Performance and speed for efficiency.
                                        </p>
                                    </div>
                                </div>
                            </SelectItem>
                            <SelectItem value="quantum">
                                <div className="flex items-start gap-3 text-muted-foreground">
                                    <Turtle className="size-5" />
                                    <div className="grid gap-0.5">
                                        <p>
                                            Neural{" "}
                                            <span className="font-medium text-foreground">
                                                Quantum
                                            </span>
                                        </p>
                                        <p className="text-xs" data-description>
                                            The most powerful model for complex
                                            computations.
                                        </p>
                                    </div>
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="temperature">Temperature</Label>
                    <Input id="temperature" type="number" placeholder="0.4" />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="top-p">Top P</Label>
                    <Input id="top-p" type="number" placeholder="0.7" />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="top-k">Top K</Label>
                    <Input id="top-k" type="number" placeholder="0.0" />
                </div>
            </fieldset>
            <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                    Messages
                </legend>
                <div className="grid gap-3">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue="system">
                        <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="system">System</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="assistant">Assistant</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="content">Content</Label>
                    <Textarea id="content" placeholder="You are a..." />
                </div>
            </fieldset>
        </form>
    )
}
