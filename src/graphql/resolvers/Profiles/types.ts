export interface ContextType {
    user?: UserType;
}

export interface UserType {
    id: string;
}

export interface GetMyProfileTypes {
    email: string;
    username: string;
    registered_at: string;
    last_login: string;
}

export interface getProfileById {
    id: string;
}

export interface UpdateMyProfile {
    first_name: string;
    middle_name: string;
    last_name: string;
    phone_number: string;
    address: string;
    zip_code: string;
    place_of_birth: string;
    birthday: string;
}

export interface UpdateImageProfile {
    url: string;
}

export interface FileTypes {
    file: FileType
}

export interface FileType {
    createReadStream: any;
    filename: any
}