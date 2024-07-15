import { useAppContext } from '@/AppProvider'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { UserType } from '@/type/auth.type'
import { Circle, CircleCheck, UserPlus } from 'lucide-react'
import React, { Dispatch, SetStateAction } from 'react'

interface Props {
    setIds: Dispatch<SetStateAction<string[]>>,
    ids: string[],
}

export default function AddUser({ setIds, ids }: Props) {
    const { users } = useAppContext()
    const handleClick = (user: UserType) => {
        const id = String(user.id)
        if (!ids.includes(id)) {
            setIds((prevItems) => {
                return [...prevItems, id];
            });
        } else {
            setIds(prevIds => prevIds.filter(idCurr => idCurr !== id));
        }

    }
    return (
        <Popover>
            <PopoverTrigger asChild title='Gắn thẻ người khác'>
                <Button variant="ghost" size="icon">
                    <UserPlus className="size-4" />({ids.length})
                    <span className="sr-only">Gắn thẻ người khác</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60">
                <ScrollArea className="h-72 w-48">
                    <div className="p-4">
                        <h4 className="mb-4 text-sm font-medium leading-none">Danh sách bạn bè</h4>
                        {users.map((user) => (
                            <div key={user.id} className='cursor-pointer hover:text-cyan-600' onClick={() => handleClick(user)}>
                                <div key={user.id} className="text-sm flex-1">
                                    {user.name}
                                    {ids.includes(String(user.id)) ? (
                                        <CircleCheck className='text-green-400 float-end' fill='white' />
                                    ) : (
                                        <Circle className='float-end' fill='white' />
                                    )}
                                </div>
                                <Separator className="my-2" />
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </PopoverContent>
        </Popover>
    )
}
