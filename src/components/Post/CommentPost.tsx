import { formattedCreatedAt } from '@/components/Message'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Avatar } from '@/components/ui/avatar'
import useEcho from '@/hooks/echo'
import postService from '@/services/post'
import { CommentPostType } from '@/type/post.type'
import { ResponseType } from '@/type/type'
import { SendHorizontal } from 'lucide-react'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

export default function CommentPost({ setListComments, comment, type, name }: { setListComments: Dispatch<SetStateAction<CommentPostType[]>>, comment: CommentPostType, type: boolean, name?: string }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };
    const [commentReply, setCommentReply] = useState<string>('')

    const handleSubmit = () => {
        if (comment && commentReply) {
            postService.addComment({ comment: commentReply, post_id: comment.post.id, parent_id: comment.id }).then((res) => {
                setCommentReply('');
            }).catch((err) => {

            });
        }
    };


    const updateRepliesRecursively = (comments: CommentPostType[], newComment: CommentPostType): CommentPostType[] => {
        return comments.map((comment) => {
            if (comment.id === newComment.parent_id) {
                return {
                    ...comment,
                    reply: [
                        newComment,
                        ...(comment.reply || [])
                    ]
                };
            }
            if (comment.reply) {
                return {
                    ...comment,
                    reply: updateRepliesRecursively(comment.reply, newComment)
                };
            }
            return comment;
        });
    };

    useEffect(() => {
        useEcho.private('add.comment.post').listen('AddCommentEvent', (data: ResponseType<CommentPostType>) => {
            if (data.data.parent_id && data.data.parent_id === comment.id) {
                setListComments((prev) => updateRepliesRecursively(prev, data.data))
            }
        });
    }, [])

    return (
        <>
            <article className={`${type ? 'p-6 text-base bg-white rounded-lg dark:bg-gray-900' : 'mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900'}`}>
                <footer className="flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="flex items-center">
                            <Avatar className="hidden h-9 w-9 sm:flex">
                                <img className="mr-2 w-6 h-6 rounded-full" src="https://picsum.photos/50/50" alt="User Avatar" />
                            </Avatar>
                            <div className="flex">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                    {comment.user.name}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400"><time dateTime="2022-02-08" title="February 8th, 2022">  {formattedCreatedAt(comment.created_at)}</time></p>
                            </div>
                        </div>
                    </div>
                </footer>
                <div className="text-gray-500 dark:text-gray-400">{name && <p className='inline-flex items-center mr-1 text-sm text-gray-900 dark:text-white font-semibold'>@{name}</p>}{comment.comment}</div>
                <div className="flex items-center mt-4 space-x-4">
                    <Accordion type="single" collapsible className="w-full" onMouseEnter={handleMouseEnter}>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>
                                <button type="button" className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                                    <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                                    </svg>
                                    Phản hồi
                                </button>
                            </AccordionTrigger>
                            {isOpen && (<AccordionContent>
                                <div className="mt-1 z-10 float-start flex items-center space-x-3"
                                    onMouseLeave={handleMouseLeave}>
                                    <input value={commentReply} onChange={(event) => setCommentReply(event.target.value)} type="text" placeholder="Viết bình luận công khai..." className="flex-grow w-[200px] px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500" />
                                    <button onClick={handleSubmit} className="flex-shrink-0">
                                        <SendHorizontal fill='white' className={`${commentReply ? 'text-cyan-600' : 'text-cyan-200'}`} size={'20px'} />
                                    </button>
                                </div>
                            </AccordionContent>)}
                        </AccordionItem>
                    </Accordion>
                </div>
            </article>
            {
                comment.reply && comment.reply.map((reply) => (
                    <CommentPost setListComments={setListComments} comment={reply} type={false} key={reply.id} name={comment.user.name} />
                ))
            }
        </>
    )
}
