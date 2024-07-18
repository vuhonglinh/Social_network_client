"use client"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import AddPost from "@/components/Post/AddPost"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { PostLikeType, PostType } from "@/type/post.type"
import { Avatar } from "@radix-ui/react-avatar"
import { useAppContext } from "@/AppProvider"
import profileService from "@/services/profile"
import Post from "@/components/Post/Post"
import SheetComment from "@/components/Post/SheetComment"
import { ResponseType } from "@/type/type"
import useEcho from "@/hooks/echo"
import { Camera, HousePlus } from "lucide-react"
import { Input } from "@/components/ui/input"


export default function Profile() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const { user, setUser } = useAppContext()
    const inputRef = useRef<HTMLInputElement>(null);
    const [post, setPost] = useState<PostType | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const coverImageRef = useRef<HTMLInputElement | null>(null);
    const [avatar, setAvatar] = useState<FileList | null>(null)
    const [coverImage, setCoverImage] = useState<FileList | null>(null)



    const handleShow = (post: PostType) => {
        if (inputRef.current) {
            setPost(post)
            inputRef.current.click();
        }
    }

    useEffect(() => {
        if (user) {
            profileService.getPosts(user.id).then((res) => {
                setPosts(res.data.data)
            }).catch((err) => { })
        }
    }, [user])


    useEffect(() => {
        useEcho.private(`like.post`).listen('PostLikeEvent', (data: ResponseType<PostLikeType>) => {
            setPosts((prev) => {
                return prev.map((item) => {
                    if (item.id === data.data.post.id) {
                        return { ...item, likes: data.data.likes, users: [...data.data.users] };
                    }
                    return item;
                });
            });
        });
    }, []);

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0 && user) {
            setAvatar(files);
            const formData = new FormData();
            formData.append('avatar', files[0]);
            try {
                const res = await profileService.uploadAvatar({ id: user.id, body: formData });
                setUser(res.data.data)
                console.log("Avatar upload response:", res);
            } catch (error) {
                console.error("Error uploading avatar:", error);
            }
        }
    };


    const handleFileChangeCoverImageRef = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0 && user) {
            setCoverImage(files);
            const formData = new FormData();
            formData.append('cover_image', files[0]);
            try {
                const res = await profileService.uploadCoverImage({ id: user.id, body: formData });
                setUser(res.data.data)
                console.log("Avatar upload response:", res);
            } catch (error) {
                console.error("Error uploading avatar:", error);
            }
        }
    };


    return (
        <div className="w-full h-screen px-10">
            <SheetComment ref={inputRef} post={post} />
            <div onClick={() => {
                if (coverImageRef.current) {
                    coverImageRef.current.click()
                }
            }}
                className="w-ful h-[300px] relative">
                <img className="object-cover h-full w-full rounded-md cursor-pointer" src={`${coverImage ? URL.createObjectURL(coverImage[0]) : user?.cover_image ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${user.cover_image}` : 'https://picsum.photos/50/50'}`} alt="User Avatar" />
                <input onChange={handleFileChangeCoverImageRef} type="file" className="hidden" ref={coverImageRef} />
            </div>
            <div className="content-around w-full my-2 bg-white rounded-sm drop-shadow-xl h-[150px] justify-center items-center">
                <div className="flex gap-4">
                    <Avatar onClick={() => {
                        if (fileInputRef.current) {
                            fileInputRef.current.click()
                        }
                    }} className="h-[100px] w-[100px] sm:flex z-10 ml-2 relative cursor-pointer">
                        <img className="w-full h-full rounded-full object-cover" src={`${avatar ? URL.createObjectURL(avatar[0]) : user?.avatar ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${user.avatar}` : 'https://picsum.photos/50/50'}`} alt="User Avatar" />
                        <input onChange={handleFileChange} type="file" className="hidden" ref={fileInputRef} />
                        <Camera className="absolute h-8 w-8 bg-white border-2 border-gray-300 bottom-0 right-0 rounded-full text-blue-500 p-1 shadow-lg" />
                    </Avatar>
                    <div className="text-center items-center">
                        <h1 className="font-bold size-shadow-sm text-xl">{user?.name}</h1>
                    </div>
                </div>
            </div>

            <div className="flex justify-between gap-5 w-full h-scree">
                <div className="basis-1/3">
                    <Card x-chunk="dashboard-07-chunk-3">
                        <CardHeader>
                            <CardTitle>Giới thiệu</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <div className="flex gap-3">
                                    <HousePlus />
                                    <p>{user?.address}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="basis-2/3">
                    <div className="justify-center items-center mb-1">
                        <AddPost setPosts={setPosts} />
                    </div>
                    <div className="flex flex-col gap-2">
                        {
                            posts.map(post => (
                                <Post key={post.id} post={post} handleShow={handleShow} />
                            ))
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}