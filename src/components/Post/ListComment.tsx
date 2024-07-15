import CommentPost from '@/components/Post/CommentPost'
import useEcho from '@/hooks/echo';
import postService from '@/services/post';
import { CommentPostType, PostType } from '@/type/post.type'
import { ResponseType } from '@/type/type';
import React, { useEffect, useState } from 'react'

export default function ListComment({ post }: { post: PostType | null }) {
    const [listComments, setListComments] = useState<CommentPostType[]>([]);
    useEffect(() => {
        if (post) {
            postService.listComments({ post_id: post.id }).then((res) => {
                setListComments(res.data.data);
            }).catch((err) => {

            })
        }
    }, [post])

    useEffect(() => {
        useEcho.private('add.comment.post').listen('AddCommentEvent', (data: ResponseType<CommentPostType>) => {
            if (data.data.parent_id === null) {
                setListComments((prev) => [{ ...data.data }, ...prev]);
            }
        });

        return useEcho.leaveChannel('add.comment.post')
    }, [])

    return (
        <section className="bg-white dark:bg-gray-900 overflow-y-scroll h-[475px]">
            <div className="max-w-2xl mx-auto">
                {listComments.map((comment) => (
                    <CommentPost key={comment.id} setListComments={setListComments} comment={comment} type={true} />
                ))}
            </div>
        </section>

    )
}
