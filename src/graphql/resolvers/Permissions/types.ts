export interface GetPermissionType {
    id: string
    title: string
    slug: string
    description?: string
    active: boolean
}

export interface ContextType {
    user: string | null
}

export interface GetPermissionByIdType {
    id: string
}

export interface AddPermissionType {
    id: string
    title: string
    slug: string
    description?: string
    active: boolean
}

export interface UpdatePermissionType {
    id: string
    title?: string
    slug?: string
    description?: string
    active?: boolean
}

export interface DeletePermissionType {
    id: string
}