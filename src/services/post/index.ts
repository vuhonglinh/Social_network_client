import http from "@/http/Http"
import { CommentPostType, PostType } from "@/type/post.type";
import { ResponseType } from "@/type/type";


const postService = {
    getPosts: async () => {
        return await http.get<ResponseType<PostType[]>>('/api/posts')
    },

    addPost: (body: { description: string, images?: string[], ids?: string[] }) => {
        return http.post<ResponseType<PostType>>('/api/posts', body)
    },

    listComments: async (body: { post_id: string }) => {
        return await http.post<ResponseType<CommentPostType[]>>('/api/list-comments', body)
    },

    addComment: async (body: { post_id: string, comment: string, parent_id?: string }) => {
        return await http.post<ResponseType<PostType>>('/api/add-comment', body)
    },

    postLike: async (body: { post_id: string }) => {
        return await http.post<ResponseType<PostType>>('/api/post-like', body)
    },

    uploadFile: (body: FormData) => {
        return http.post('/api/upload-file', body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

}

export default postService