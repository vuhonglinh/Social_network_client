import { useAppContext } from '@/AppProvider';
import useEcho from '@/hooks/echo';
import postService from '@/services/post';
import { PostType } from '@/type/post.type';
import { Heart } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

export default function ButtonLike({ post }: { post: PostType }) {
    const buttonRef = useRef<HTMLButtonElement>(null); // Corrected useRef type
    const [liked, setLiked] = useState(false);
    const { user } = useAppContext()

    const handleLike = () => {
        postService.postLike({ post_id: post.id }).then((res) => {
            setLiked(!liked)
        }).catch((err) => {
        });

    };

    useEffect(() => {
        const check = post.users.find((user) => user.id == user.id);
        setLiked(Boolean(check))
    }, [post, liked])
    return (
        <button
            ref={buttonRef}
            onClick={handleLike}
            className={`flex items-center text-gray-600 hover:text-blue-600 `}
        >
            <Heart className='text-white  animate-pulse' fill={`${liked ? 'red' : '#4b5563'}`} /> {post.likes}
        </button >
    );
}
