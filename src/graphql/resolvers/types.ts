export interface UsersType {
    id: string
    role_id: string
    profile_id: string
    email: string
    username: string
    password: string
    registered_at: string
    last_login: string
}

export interface LoginInput {
    username: string
    password: string
}

export interface LoginType {
    token: string
    user: UsersType
}

export interface ContextType {
    user: string | null
}

export interface RegisterInput {
    username: string
    password: string
}