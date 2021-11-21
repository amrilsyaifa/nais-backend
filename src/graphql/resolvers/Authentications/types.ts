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

export interface LoginInput {
    username: string;
    password: string;
}

export interface LoginType {
    token: string;
    user: UsersType;
}

export interface RegisterInput {
    first_name: string;
    middle_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    username: string;
    password: string;
}
