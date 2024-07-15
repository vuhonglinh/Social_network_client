import http from "@/http/Http"
import { AuthType, UserType } from "@/type/auth.type"
import { ResponseType } from "@/type/type"


const authService = {
    login: (body: { email: string, password: string, remember: boolean }) => {
        return http.post<AuthType>('/login', body)
    },

    register: (body: { name: string, email: string, password: string }) => {
        return http.post<AuthType>('/register', body)
    },

    logout: () => {
        return http.post<{ message: string }>('/logout')
    },

    rememberMe: async () => {
        return http.post<AuthType>('/remember-me')
    },

    forgotPassword: (body: { email: string }) => {
        return http.post<{ message: string }>('/forgot-password', body)
    },

    resetPassword: (body: { token: string, email: string, password: string }) => {
        return http.post<{ message: string }>('/reset-password', body)
    },

    getUsers: async () => {
        return await http.get<ResponseType<UserType[]>>('/api/list')
    },

    getUser: async ({ id }: { id: string }) => {
        return await http.get<ResponseType<UserType>>(`/api/user/${id}`)
    },

    loginGoogle: () => {
        return http.get('/api/auth/google')
    },
}

export default authService