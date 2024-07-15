import http from "@/http/Http"
import { CommentPostType, PostType } from "@/type/post.type";
import { ResponseType } from "@/type/type";


const notificationService = {
    notifications: async () => {
        return await http.get('/api/notification')
    },


}

export default notificationService