"use client"
import { useAppContext } from "@/AppProvider"
import AddUser from "@/components/Post/AddUser"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"
import useEcho from "@/hooks/echo"
import { formSchemaPost } from "@/schema/post.schema"
import postService from "@/services/post"
import { UserType } from "@/type/auth.type"
import { PostType } from "@/type/post.type"
import { ResponseType } from "@/type/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { Paperclip } from "lucide-react"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface Props {
    setPosts: Dispatch<SetStateAction<PostType[]>>
}

export default function AddPost({ setPosts }: Props) {
    const { user } = useAppContext()
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [images, setImages] = useState<File[]>([]);
    const [ids, setIds] = useState<string[]>([]);
    const [description, setDescription] = useState<string>('');


    const form = useForm<z.infer<typeof formSchemaPost>>({
        resolver: zodResolver(formSchemaPost),
        defaultValues: {
            description: "",
        },
    })

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImages(Array.from(event.target.files));
        }
    };

    const handleSubmit = async () => {
        if (description.length > 0) {
            const formData = new FormData();
            if (images.length > 0) {
                for (let i = 0; i < images.length; i++) {
                    formData.append('images[]', images[i] as File);
                }
            }
            const fileResponse = await postService.uploadFile(formData)
            const fileData = fileResponse.data.data || []
            const res = await postService.addPost({ description, ids, images: fileData });
            if (res.status === 200) {
                setDescription("")
                setIds([])
                setImages([])
                toast({
                    description: res.data.message
                })
            }
        }
    }

    useEffect(() => {
        useEcho.private('add.post').listen('AddPostEvent', (data: ResponseType<PostType>) => {
            setPosts((prev) => [{ ...data.data }, ...prev])
        })

        return useEcho.leaveChannel('add.post')
    }, [])

    return (
        <Dialog>
            <DialogTrigger asChild className="w-full">
                <DialogTitle>
                    <div className="relative h-[70px] m-auto flex-1 md:grow-0">
                        <img className="absolute top-5 w-[36px] h-[36px] rounded-full mx-3" src="https://picsum.photos/50/50" alt="User Avatar" />
                        <Input
                            type="search"
                            placeholder={`${user?.name} ơi, Bạn đang làm gì thế?`}
                            className="w-full h-full rounded-lg bg-background pl-[70px] md:w-[739px] lg:w-[950px]"
                        />
                    </div>
                </DialogTitle>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-center">Tạo bài viết</DialogTitle>
                    <hr />
                    <DialogDescription>
                        <div className="flex items-center gap-4">
                            <Avatar className="hidden h-9 w-9 sm:flex">
                                <img className="w-[36px] h-[36px] rounded-full" src="https://picsum.photos/50/50" alt="User Avatar" />
                                <AvatarFallback>OM</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <span className="text-sm font-medium leading-none">
                                    {user?.name}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    {user?.email}
                                </span>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <Textarea
                    id="message"
                    placeholder={`${user?.name} ơi, Bạn đang làm gì thế?`}
                    className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                {
                    images.length > 0 && (
                        <Carousel className="w-[200px] m-auto">
                            <CarouselContent>
                                {images.map((image, index) => (
                                    <CarouselItem key={index}>
                                        <div className="p-1">
                                            <Card>
                                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                                    <img className="" src={URL.createObjectURL(image)} alt={image.name} />
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    )
                }
                <div className="gap-2 flex">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => {
                                if (fileInputRef.current) {
                                    fileInputRef.current.click()
                                }
                            }}>
                                <Paperclip className="size-4" />
                                <input type="file" onChange={handleFileChange} multiple accept="image/*" ref={fileInputRef} className="hidden" />
                                <span className="sr-only">Tải tệp tin</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Tải tệp tin</TooltipContent>
                    </Tooltip>
                    <AddUser ids={ids} setIds={setIds} />
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit} type="submit" className="w-full bg-cyan-600">ĐĂNG</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}


