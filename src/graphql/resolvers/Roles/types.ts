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

export interface ContextType {
    user: string | null
}

export interface GetRoleByIdType {
    id: string
}

export interface AddRoleType {
    id: string
    title: string
    slug: string
    description?: string
    active: boolean
}

export interface UpdateRoleType {
    id: string
    title?: string
    slug?: string
    description?: string
    active?: boolean
}

export interface DeleteRoleType {
    id: string
}