export interface GetRoleType {
    id: string
    title: string
    slug: string
    description?: string
    active: boolean
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