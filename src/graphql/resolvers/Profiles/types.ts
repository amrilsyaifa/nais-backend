export interface ContextType {
    user?: UserType
}

export interface UserType {
    id: string
}

export interface GetMyProfileTypes {
    email: string
    username: string
    registered_at: string
    last_login: string
}