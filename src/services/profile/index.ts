import http from "@/http/Http"
import { UserType } from "@/type/auth.type";
import { PostType } from "@/type/post.type";
import { ResponseType } from "@/type/type";


const profileService = {
    getPosts: async (id: number) => {
        return await http.get<ResponseType<PostType[]>>(`api/list-post-details/${id}`)
    },

    uploadAvatar: ({ id, body }: { id: number, body: FormData }) => {
        return http.post<ResponseType<UserType>>(`/api/upload-avatar/${id}`, body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    uploadCoverImage: ({ id, body }: { id: number, body: FormData }) => {
        return http.post<ResponseType<UserType>>(`/api/upload-cover-image/${id}`, body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
}

export default profileService