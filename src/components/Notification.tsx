"use client"
import { useAppContext } from '@/AppProvider'
import { formattedCreatedAt } from '@/components/Message'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import useEcho from '@/hooks/echo'
import notificationService from '@/services/notification'
import { NotificationType } from '@/type/notification.type'
import { PostType } from '@/type/post.type'
import { Bell } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function Notification() {
    const { user } = useAppContext()
    const [notification, setNotification] = useState<NotificationType<PostType>[]>([]);
    useEffect(() => {

        notificationService.notifications().then((res) => {
            console.log(res.data.data)
            setNotification(res.data.data)
        })

    }, [])


    useEffect(() => {
        if (user) {
            useEcho.private(`App.Models.User.${user.id}`)
                .notification((data: NotificationType<PostType>) => {
                    console.log(data);
                    // setNotification((prev) => [...prev, { ...data }])
                });
        }

    }, [user])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full relative border-none"
                >
                    <Bell className="h-[30px] w-[30px] animate-bounce" />
                    {notification.length > 0 && (
                        <span className='text-red-600 absolute bottom-0 right-1 '>{notification.length}</span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <ul role="list" className="divide-y divide-gray-100 border-none overflow-y-scroll max-h-[300px]">
                    {notification.length > 0 && notification.map((post) => (
                        <li className="flex justify-between gap-x-6 py-5 hover:bg-slate-300 border-none">
                            <div className="flex min-w-0 gap-x-4">
                                <img className="w-[36px] h-[36px] overflow-hidden rounded-full" src="https://picsum.photos/50/50" alt="User Avatar" />
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">
                                        {post.data.user?.name}
                                    </p>
                                    <p className='overflow-hidden text-ellipsis whitespace-nowrap w-[300px]'>
                                        vừa gắn thẻ bạn
                                    </p>
                                </div>
                            </div>
                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                <p className="mt-1 text-xs leading-5 text-gray-500">{formattedCreatedAt(post.created_at)}</p>
                            </div>
                        </li>
                    ))}

                    {notification.length < 0 && (
                        <div className='flex'>Không có thông báo nào</div>
                    )}
                </ul>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
