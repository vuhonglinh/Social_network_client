import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { UserType } from '@/type/auth.type';
import React from 'react';
import { VisuallyHidden } from '@reach/visually-hidden';

export default function PostTag({ postTags }: { postTags: UserType[] }) {
    return (
        <>
            {(postTags?.length ?? 0) > 0 && (
                <>
                    <span className="ml-1 text-sm font-thin leading-none">
                        cùng với
                    </span>
                    {postTags?.slice(0, 1).map((user) => (
                        <span key={user.id} className="ml-1 text-sm font-medium leading-none">
                            {user.name}
                        </span>
                    ))}
                    {postTags.length > 1 && (
                        <>
                            <span className="ml-1 text-sm font-thin leading-none">
                                và
                            </span>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <span className="ml-1 text-sm font-medium leading-none cursor-pointer">
                                        {postTags.length - 1} người khác
                                    </span>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <VisuallyHidden>
                                        <DialogTitle>Danh sách những người khác</DialogTitle>
                                    </VisuallyHidden>
                                    {postTags?.slice(1).map((user) => (
                                        <div key={user.id} className="flex items-center gap-4">
                                            <Avatar className="hidden h-9 w-9 sm:flex">
                                                <AvatarImage src="https://picsum.photos/50/50" alt="Avatar" />
                                            </Avatar>
                                            <div className="grid gap-1">
                                                <p className="text-sm font-medium leading-none">
                                                    {user.name}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </DialogContent>
                            </Dialog>
                        </>
                    )}
                </>
            )}
        </>
    );
}
