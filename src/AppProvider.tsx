"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserType } from '@/type/auth.type';
import authService from '@/services/auth';
import { isClient } from '@/http/Http';

interface AppContextType {
    user: UserType | null
    setUser: (user: UserType | null) => void
    users: UserType[],
    setUsers: React.Dispatch<React.SetStateAction<UserType[]>>
}

export const AppContext = createContext<AppContextType>({
    user: null,
    setUser: () => { },
    users: [],
    setUsers: () => { }
});

export const useAppContext = () => {
    return useContext(AppContext);
};

export default function AppProvider({ children }: { children: React.ReactNode }) {
    const [user, setUserState] = useState<UserType | null>(() => {
        if (isClient()) {
            const _user = localStorage.getItem('user')
            return _user ? JSON.parse(_user) : null
        }
        return null
    })

    const setUser = (user: UserType | null) => {
        setUserState(user)
        localStorage.setItem('user', JSON.stringify(user))
    }

    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
        authService.getUsers().then((res) => {
            setUsers(res.data.data);
        }).catch((err) => {

        });
    }, []);


    return (
        <AppContext.Provider value={{ user, setUser, users, setUsers }}>
            {children}
        </AppContext.Provider>
    );
}
