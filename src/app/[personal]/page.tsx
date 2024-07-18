"use client"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"
import { PostLikeType, PostType } from "@/type/post.type"
import { Avatar } from "@radix-ui/react-avatar"
import profileService from "@/services/profile"
import Post from "@/components/Post/Post"
import SheetComment from "@/components/Post/SheetComment"
import { ResponseType } from "@/type/type"
import useEcho from "@/hooks/echo"
import { HousePlus } from "lucide-react"
import authService from "@/services/auth"
import { UserType } from "@/type/auth.type"


export default function Profile({ params }: { params: { personal: string } }) {
    const { personal } = params;
    const id = personal.slice(personal.indexOf('.') + 1)
    const [posts, setPosts] = useState<PostType[]>([]);
    const [user, setUser] = useState<UserType>()
    const inputRef = useRef<HTMLInputElement>(null);
    const [post, setPost] = useState<PostType | null>(null);

    useEffect(() => {
        authService.getUser({ id }).then((res) => {
            setUser(res.data.data)
        }).catch((err) => { });
    }, [id]);

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





    return (
        <div className="w-full h-screen px-10">
            <SheetComment ref={inputRef} post={post} />
            <div className="w-ful h-[300px] relative">
                <img className="object-cover h-full w-full rounded-md cursor-pointer" src={`${user?.cover_image ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${user.cover_image}` : 'https://picsum.photos/50/50'}`} alt="User Avatar" />
            </div>
            <div className="content-around w-full my-2 bg-white rounded-sm drop-shadow-xl h-[150px] justify-center items-center">
                <div className="flex gap-4">
                    <Avatar className="h-[100px] w-[100px] sm:flex z-10 ml-2 relative cursor-pointer">
                        <img className="w-full h-full rounded-full object-cover" src={`${user?.avatar ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${user.avatar}` : 'https://picsum.photos/50/50'}`} alt="User Avatar" />
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
