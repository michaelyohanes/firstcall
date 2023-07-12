import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import {
  ListRequest,
  ListResponse,
  RegisterResponse,
  UserFieldType,
  UpdateByIdRequest,
  updateByIdResponse,
  DeleteByIdRequest,
  DeleteByIdResponse,
} from '@/types/user'

const baseUrl = process.env.NEXT_PUBLIC_API_URL

export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    getUserList: builder.query<ListResponse, ListRequest>({
      query: (param) => `user/list?page=${param.page}`,
    }),
    addUser: builder.mutation<RegisterResponse, UserFieldType>({
      query: (body) => {
        return {
          url: 'user/register',
          method: 'post',
          body
        }
      }
    }),
    editUser: builder.mutation<updateByIdResponse, UpdateByIdRequest>({
      query: (body) => {
        return {
          url: `user/${body.id}`,
          method: 'put',
          body
        }
      }
    }),
    deleteUser: builder.mutation<DeleteByIdResponse, DeleteByIdRequest>({
      query: (body) => {
        return {
          url: `user/${body.id}`,
          method: 'delete'
        }
      }
    }),
  }),
})

export const {
  useAddUserMutation,
  useGetUserListQuery,
  useEditUserMutation,
  useDeleteUserMutation,
  util: { getRunningQueriesThunk },
} = userApi

export const { addUser, getUserList, editUser, deleteUser } = userApi.endpoints
