export interface ErrorType {
  message: string
}

export interface CatchErrorType {
  status: number
  data: {
    message: string
  }
}

export interface UserFieldType {
  username: string
  firstname: string
  lastname: string
}

export interface UserType extends UserFieldType {
  id: number
  updatedAt: string
}

export interface RegisterRequest {
  body: UserFieldType
}

export interface RegisterResponse {
  id: number
  message: string
}

export interface ListRequest {
  page: number
}

export interface ListResponse {
  count: number
  rows: UserType[]
}

export interface GetByIdRequest {
  params: {
    id: number
  }
}

export interface UpdateByIdRequest {
  id: number
  firstname: string
  lastname: string
}

export interface updateByIdResponse {
  message: string
}

export interface DeleteByIdRequest {
  id: number
}

export interface DeleteByIdResponse {
  message: string
}