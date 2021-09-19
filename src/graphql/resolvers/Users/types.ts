export interface UsersType {
    id: string;
    role_id: string;
    profile_id: string;
    email: string;
    username: string;
    password: string;
    registered_at: string;
    last_login: string;
}

export interface ContextType {
    user?: UserType
}

export interface UserType {
    id: string
}

export interface ChangePasswordType {
    old_password: string 
    password: string
    confirm_password: string
}