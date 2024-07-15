import http from "@/http/Http"
import { ChatType } from "@/type/chat.type"
import { ResponseType } from "@/type/type"



const chatService = {
    getChatDetails: async (id: number) => {
        return await http.get<ResponseType<ChatType[]>>('/api/chat-detail', {
            params: {
                id: id,
            }
        })
    },


    send: async ({ id, message }: { id: string, message: string }) => {
        return await http.post('/api/send', {
            id,
            message
        })
    }

}

export default chatService