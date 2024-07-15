import { UserType } from "@/type/auth.type";


export type ChatType = {
    id: number;
    message: string;
    sender: UserType;
    receiver: UserType;
    created_at: Date;
}
