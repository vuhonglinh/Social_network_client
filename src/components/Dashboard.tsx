"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import AddPost from "@/components/Post/AddPost"
import { Avatar } from "@/components/ui/avatar"
import { useEffect, useRef, useState } from "react"
import { PostLikeType, PostType } from "@/type/post.type"
import postService from "@/services/post"
import { formattedCreatedAt } from "@/components/Message"
import { ResizablePanelGroup } from "@/components/ui/resizable"
import ImagePost from "@/components/Post/ImagePost"
import SliderImage from "@/components/Post/SliderImage"
import PostTag from "@/components/Post/PostTag"
import { Heart, Share2 } from "lucide-react"
import SheetComment from "@/components/Post/SheetComment"
import ButtonLike from "@/components/Post/ButtonLike"
import useEcho from "@/hooks/echo"
import { ResponseType } from "@/type/type"

export default function Dashboard() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [post, setPost] = useState<PostType | null>(null);

  useEffect(() => {
    postService.getPosts().then((res) => {
      setPosts(res.data.data)
    }).catch((error) => { });
  }, [])

  const handleShow = (post: PostType) => {
    if (inputRef.current) {
      setPost(post)
      inputRef.current.click();
    }
  }


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
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center">
          <SheetComment ref={inputRef} post={post} />
          <AddPost setPosts={setPosts} />
        </div>
        <div className="grid gap-4">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            {posts.map(post => (
              <Card key={post.id} x-chunk="dashboard-07-chunk-0">
                <CardHeader>
                  <CardTitle>
                    <div className="flex items-center gap-4">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <img className="w-[36px] h-[36px] rounded-full" src="https://picsum.photos/50/50" alt="User Avatar" />
                      </Avatar>
                      <div className="grid gap-1">
                        <div className="flex">
                          <span className="text-sm font-medium leading-none">
                            {post.user.name}
                          </span>
                          {
                            (post.post_tag?.length ?? 0) > 0 && <PostTag postTags={post.post_tag ?? []} />
                          }


                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formattedCreatedAt(post.created_at)}
                        </span>
                      </div>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResizablePanelGroup
                    direction="horizontal"
                    className="w-full rounded-lg border"
                  >
                    <SliderImage images={post.images}>
                      <ImagePost images={post.images} />
                    </SliderImage>
                  </ResizablePanelGroup>
                </CardContent>
                <CardFooter>
                  <div className="w-[100%] mx-auto p-4 bg-white rounded-lg flex justify-between items-center">
                    <ButtonLike post={post} />
                    <button onClick={() => handleShow(post)} className="flex items-center text-gray-600 hover:text-blue-600">
                      <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 10h8v1H8v-1zm0 3h8v1H8v-1zm0-6h8v1H8V7zM5 8h1V7H5v1zm0 3h1v-1H5v1zm0 3h1v-1H5v1zM7 3a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V6a3 3 0 00-3-3H7z" />
                      </svg>
                      <span>Bình luận</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-blue-600">
                      <Share2 />
                    </button>
                  </div>
                </CardFooter>
              </Card>
            ))}


          </div>
        </div>

      </div>
    </main>
  )
}
