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
    title: string
    slug: string
    description?: string
    active: boolean
    permissions?: string[]
}

export interface UpdateRoleType {
    id: string
    title?: string
    slug?: string
    description?: string
    active?: boolean
    permissions?: string[]
}

export interface DeleteRoleType {
    id: string
}


export interface PermissionsType {
    title: string
    slug: string
    description?: string
    active: boolean
}
