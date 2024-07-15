import { UserType } from "@/type/auth.type"


export type PostType = {
    id: string;
    user: UserType;
    description: string;
    post_tag?: UserType[];
    images?: ImageType[];
    created_at: Date;
    likes: number;
    users: UserType[];
};

export type ImageType = {
    id: string;
    image: string;
};


export type CommentPostType = {
    id: string,
    post: PostType,
    user: UserType,
    comment: string,
    created_at: Date,
    parent_id: string,
    reply?: CommentPostType[],
}


export type PostLikeType = {
    likes: number,
    post: PostType
    users: UserType[],
}
