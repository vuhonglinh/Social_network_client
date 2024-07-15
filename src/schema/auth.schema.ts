import { z } from "zod";

export const loginSchema = z.object({
    email: z.string({
        message: "Không được để trống!"
    }).min(2, {
        message: "Tối thiểu 2 ký tự"
    }).max(50, {
        message: "Tối đa 50 ký tự"
    }),
    password: z.string({
        message: "Không được để trống"
    }).min(2, {
        message: "Tối thiểu 2 ký tự"
    }).max(50, {
        message: "Tối đa 50 ký tự"
    }),
    remember: z.boolean(),
})

export const registerSchema = z.object({
    name: z.string({
        message: "Không được để trống!"
    }).min(2, {
        message: "Tối thiểu 2 ký tự!"
    }).max(50, {
        message: "Tối đa 50 ký tự"
    }),
    email: z.string({
        message: "Không được để trống!"
    }).min(2, {
        message: "Tối thiểu 2 ký tự"
    }).max(50, {
        message: "Tối đa 50 ký tự"
    }),
    password: z.string({
        message: "Không được để trống"
    }).min(2, {
        message: "Tối thiểu 2 ký tự"
    }).max(50, {
        message: "Tối đa 50 ký tự"
    }),
})


export const forgotPasswordSchema = z.object({
    email: z.string({
        message: "Không được để trống!"
    }).min(2, {
        message: "Tối thiểu 2 ký tự"
    }).max(50, {
        message: "Tối đa 50 ký tự"
    })
})



export const resetPasswordFormSchema = z.object({
    password: z.string({
        required_error: "Không được để trống"
    }).min(2, {
        message: "Tối thiểu 2 ký tự"
    }).max(50, {
        message: "Tối đa 50 ký tự"
    }),
    confirm_password: z.string({
        required_error: "Không được để trống"
    }).min(2, {
        message: "Tối thiểu 2 ký tự"
    }).max(50, {
        message: "Tối đa 50 ký tự"
    }),
    email: z.string({
        message: "Không được để trống!"
    }).min(2, {
        message: "Tối thiểu 2 ký tự"
    }).max(50, {
        message: "Tối đa 50 ký tự"
    }),
    token: z.string(),
}).refine(data => data.password === data.confirm_password, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirm_password"] // path of error
});