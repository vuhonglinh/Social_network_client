"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import authService from "@/services/auth";
import { UserType } from "@/type/auth.type";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Circle } from "lucide-react";
import useEcho from "@/hooks/echo";
import { usePathname } from "next/navigation";


export default function SidebarChat() {
    const pathname = usePathname()
    const [users, setUsers] = useState<UserType[]>([])
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await authService.getUsers();
                setUsers(response.data.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    // useEffect(() => {
    //     useEcho.private('login').listen('LoginEvent', (res: { data: UserType }) => {
    //         const user = res.data;
    //         setUsers((prevUsers) => {
    //             const existingUser = prevUsers.find((u) => u.id === user.id);
    //             console.log(prevUsers);
    //             if (existingUser) {
    //                 return prevUsers.map((u) =>
    //                     u.id === user.id ? { ...u, status: true } : u
    //                 );
    //             }
    //             return [...prevUsers];
    //         })
    //     })
    //     return useEcho.leaveChannel('login')
    // }, [])


    useEffect(() => {
        useEcho.join('user.status')
                // .here((users: UserType[]) => {
                //     console.log(users);
                //     setUsers((prev) => (
                //         [...prev, ...users]
                //     ))
                // })
            .joining((user: UserType) => {//đã tham gia
                setUsers((prevUsers) => {
                    const existingUser = prevUsers.find((u) => u.id === user.id);
                    if (existingUser) {
                        return prevUsers.map((u) =>
                            u.id === user.id ? { ...u, status: true } : u
                        );
                    } else {
                        return [...prevUsers, { ...user, status: true }]
                    }
                })
            })
            .leaving((user: UserType) => {//đã rời đi
                setUsers((prevUsers) => {
                    const existingUser = prevUsers.find((u) => u.id === user.id);

                    if (existingUser) {
                        return prevUsers.map((u) =>
                            u.id === user.id ? { ...u, status: false } : u
                        );
                    } else {
                        return [...prevUsers, { ...user, status: false }]
                    }
                })
            })

        return useEcho.leaveChannel('user.status')
    }, [])

    return (
        <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader>
                <CardTitle>Danh sách bạn bè</CardTitle>
            </CardHeader>
            <CardContent className="grid">
                <ScrollArea className="h-[630px]">
                    {users.map((user) => (
                        <Link href={`/user/${user.id}`} key={user.id} className={`flex items-center gap-4 py-3 ${pathname === `/user/${user.id}` ? 'text-yellow-600' : 'hover:text-yellow-600'}`}>
                            <Avatar className="hidden h-9 w-9 sm:flex">
                                <AvatarImage src="https://loremflickr.com/g/600/600/paris" alt="Avatar" />
                                <AvatarFallback>OM</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <p className="text-sm flex gap-2 font-medium leading-none">
                                    {user.name}
                                    {
                                        user?.status ? (
                                            <>
                                                <Circle size={'15px'} className="bg-green-500 rounded-full" color="white" />
                                                <span>Đang hoạt động</span>
                                            </>
                                        ) : (
                                            <>
                                                <Circle size={'15px'} className="bg-red-600 rounded-full" color="white" />
                                                <span>Không hoạt động</span>
                                            </>
                                        )
                                    }
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {user.email}
                                </p>
                            </div>
                        </Link>
                    ))}
                </ScrollArea>
            </CardContent>
        </Card>
    );
}


