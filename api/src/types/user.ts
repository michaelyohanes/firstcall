export interface ErrorType {
    message: string;
};

export interface UserType {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    updatedAt: string;
};

export interface RegisterRequest {
    body: {
        username: string;
        firstname: string;
        lastname: string;
    }
};

export interface RegisterResponse {
    id: number;
    message: string;
};

export interface ListRequest {
    query: {
        page?: number;
    }
};

export interface ListResponse {
    count: number;
    rows: UserType[];
};

export interface GetByIdRequest {
    params: {
        id: number;
    }
};

export interface UpdateByIdRequest {
    params: {
        id: number;
    },
    body: {
        firstname: string;
        lastname: string;   
    }
};

export interface DeleteByIdRequest {
    params: {
        id: number;
    }
};
