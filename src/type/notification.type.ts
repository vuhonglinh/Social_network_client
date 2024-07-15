import { PostType } from "@/type/post.type"


export type NotificationType<T> = {
    created_at: Date
    data: T
    id: string
    notifiable_id: number
    notifiable_type: string
    read_at: Date | null;
    type: string
    updated_at: Date
}