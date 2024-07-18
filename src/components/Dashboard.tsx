"use client"
import AddPost from "@/components/Post/AddPost"
import { useEffect, useRef, useState } from "react"
import { PostLikeType, PostType } from "@/type/post.type"
import postService from "@/services/post"
import SheetComment from "@/components/Post/SheetComment"
import useEcho from "@/hooks/echo"
import { ResponseType } from "@/type/type"
import Post from "@/components/Post/Post"

export default function Dashboard() {
  const [posts, setPosts] = useState<PostType[]>([]);

  const [post, setPost] = useState<PostType | null>(null);

  useEffect(() => {
    postService.getPosts().then((res) => {
      setPosts(res.data.data)
    }).catch((error) => { });
  }, [])

  const inputRef = useRef<HTMLInputElement>(null);
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
              <Post key={post.id} post={post} handleShow={handleShow} />
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
