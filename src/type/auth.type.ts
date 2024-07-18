export type AuthType = {
    message: string;
    data: {
        token: TokenType,
        user: UserType
    };
};


export type TokenType = {
    token_type: string;
    expires_in: number;
    access_token: string;
    refresh_token: string;
}

export type UserType = {
    email: string;
    name: string;
    updated_at: string;
    created_at: string;
    id: number;
    status?: boolean
    avatar?: string;
    address?: string;
    cover_image?: string;
}



export type ValidateErrorType = {
    errors: Record<string, string[]>;
    message: string;
};
