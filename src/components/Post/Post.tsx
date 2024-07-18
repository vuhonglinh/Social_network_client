import { formattedCreatedAt } from '@/components/Message'
import ButtonLike from '@/components/Post/ButtonLike'
import ImagePost from '@/components/Post/ImagePost'
import PostTag from '@/components/Post/PostTag'
import SliderImage from '@/components/Post/SliderImage'
import { Avatar } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ResizablePanelGroup } from '@/components/ui/resizable'
import { PostType } from '@/type/post.type'
import { Share2 } from 'lucide-react'
import React from 'react'

type Props = {
    post: PostType,
    handleShow: (post: PostType) => void
}

export default function Post({ post, handleShow }: Props) {
    return (
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
    )
}
