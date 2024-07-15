import { formattedCreatedAt } from '@/components/Message'
import ListComment from '@/components/Post/ListComment'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import postService from '@/services/post'
import { PostType } from '@/type/post.type'
import { SendHorizontal } from 'lucide-react'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'

const SheetComment = forwardRef(({ post }: { post: PostType | null }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [comment, setComment] = useState<string>('')

    useImperativeHandle(ref, () => ({
        click: () => {
            inputRef.current?.click();
        }
    }));

    const handleSubmit = () => {
        if (comment && post) {
            postService.addComment({ comment, post_id: post.id }).then((res) => {
                setComment('')
            }).catch((err) => {

            })
        }
    }


    return (
        <Sheet>
            <SheetTrigger asChild>
                <input type='hidden' ref={inputRef} />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <div className="flex items-center gap-4">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <img className="w-[36px] h-[36px] rounded-full" src="https://picsum.photos/50/50" alt="User Avatar" />
                            <AvatarFallback>OM</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <span className="text-sm font-medium leading-none">
                                {post?.user.name}
                            </span>
                            <span className="text-sm text-muted-foreground">
                                {post && formattedCreatedAt(post?.created_at)}
                            </span>
                        </div>
                    </div>
                </SheetHeader>
                <div className='mt-1'>
                    <p>{post?.description}</p>
                </div>
                <hr className='my-2' />
                <div className="grid gap-4">
                    <div>
                        <div className="mt-4 flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src="https://picsum.photos/50/50" alt="User avatar" />
                            </div>
                            <input value={comment} onChange={(event) => setComment(event.target.value)} type="text" placeholder="Viết bình luận công khai..." className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500" />
                            <button onClick={handleSubmit} className="flex-shrink-0">
                                <SendHorizontal fill='white' className={`${comment ? 'text-cyan-600' : 'text-cyan-200'}`} size={'25px'} />
                            </button>
                        </div>
                    </div>
                    <ListComment post={post} />
                </div>
            </SheetContent>
        </Sheet>
    )
})


export default SheetComment;