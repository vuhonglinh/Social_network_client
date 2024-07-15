"use client"
import Message from "@/components/Message";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import useEcho from "@/hooks/echo";
import authService from "@/services/auth";
import chatService from "@/services/chat";
import { UserType } from "@/type/auth.type";
import { ChatType } from "@/type/chat.type";
import { CornerDownLeft, Mic, Paperclip } from "lucide-react";
import { useEffect, useMemo, useState } from "react"
import ScrollToBottom from "react-scroll-to-bottom";
import { useImmer } from "use-immer";

export default function MainChat(params: any) {
    const id = params.params.id;
    const [user, setUser] = useState<UserType | undefined>()
    const [message, setMessage] = useState<string>('')
    const [messages, setMessages] = useImmer<ChatType[]>([])
    const authUser = JSON.parse(localStorage.getItem('user') ?? "");

    useEffect(() => {
        chatService.getChatDetails(id).then((result) => {
            setMessages(result.data.data);
        });
    }, [id]);

    useEffect(() => {
        authService.getUser({ id }).then((result) => {
            setUser(result.data.data);
        })
    }, [id]);

    useEffect(() => {
        useEcho.private(`chat.${authUser.id}.${id}`)
            .listen('ChatEvent', (data: any) => {
                setMessages(prevMessages => [...prevMessages, data.message]);
            });
        return () => {
            useEcho.leaveChannel(`chat.${authUser.id}`)
        };
    }, [useEcho]);

    const handleSend = async () => {
        if (message) {
            chatService.send({ id, message }).then((result) => {
                setMessages(prevMessages => [...prevMessages, result.data.data]);
                setMessage("");
            })
        }
    };

    return (
        <div className="h-screen flex flex-col">
            <div className="flex items-center p-2">
                <img className="w-8 h-8 rounded-full mr-2" src="https://picsum.photos/50/50" alt="User Avatar" />
                <div className="font-medium">{user?.name}</div>
            </div>
            <ScrollToBottom className="bg-gray-200 flex-1 overflow-y-scroll snap-both scroll-behavior-smooth pan-y">
                <div className="px-4 py-2">
                    {messages.map((item, index) => (
                        <Message key={index} type={id != item.sender.id} content={item.message} created_at={item.created_at} />
                    ))}
                </div>
            </ScrollToBottom>
            <div className="bg-gray-100 px-4 py-2">
                <div
                    className="relative  overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring" x-chunk="dashboard-03-chunk-1"
                >
                    <Label htmlFor="message" className="sr-only">
                        Message
                    </Label>
                    <Textarea
                        id="message"
                        placeholder="Gõ tin nhắn ở đây..."
                        className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                    />
                    <div className="flex items-center p-3 pt-0">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Paperclip className="size-4" />
                                    <span className="sr-only">Gửi tệp tin</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">Gửi tệp tin</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Mic className="size-4" />
                                    <span className="sr-only">Dùng giọng nói</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">Dùng giọng nói</TooltipContent>
                        </Tooltip>
                        <Button onClick={handleSend} size="sm" className="ml-auto mt-3 gap-1.5">
                            Gửi tin nhắn
                            <CornerDownLeft className="size-3.5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
