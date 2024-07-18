"use client"
import { useAppContext } from '@/AppProvider';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Link from 'next/link';
import React, { ChangeEvent, useState } from 'react';

export default function SearchUser() {
    const { users } = useAppContext();
    const [search, setSearch] = useState<string>('');

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="relative flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                onChange={handleSearch}
                placeholder="Tìm kiếm..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px] border-transparent focus:border-primary focus:ring-primary"
            />
            {
                search && (
                    <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg">
                        <ul>
                            {filteredUsers.map(user => (
                                <li
                                    key={user.id}
                                    className=""
                                >
                                    <Link href={''} className='py-2 px-4 border-b border-gray-200 flex justify-items-center hover:bg-slate-400'>
                                        <img className="w-[36px] h-[36px] overflow-hidden rounded-full" src="https://picsum.photos/50/50" alt="User Avatar" />
                                        <p className='flex items-center justify-center ml-3'>{user.name}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            }
        </div>
    );
}
