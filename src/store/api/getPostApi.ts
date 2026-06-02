import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
type Post={
  id: number
  title: string
  body: string
  userId: number
}
export const getPostApi=createApi({
    reducerPath:"getPost",
    baseQuery:fetchBaseQuery({baseUrl:"https://jsonplaceholder.typicode.com/posts/"}),
    endpoints:(build)=>({
        getPostById:build.query<Post,number>({
            query:(id)=>`${id}`
        })
    })
})
export const { useGetPostByIdQuery,useLazyGetPostByIdQuery } = getPostApi