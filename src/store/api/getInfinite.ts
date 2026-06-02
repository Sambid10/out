import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchPosts } from "../../../utils/getData";
type Post = {
    id: number;
    title: string;
};
type PostsResponse = {
    items: Post[];
    nextCursor: number | null;
};
export const getInfinite = createApi({
    reducerPath: "getinfinte",
    baseQuery: fakeBaseQuery(),
    endpoints: (build) => ({
        getPost: build.infiniteQuery<PostsResponse, void, number | null>({
            queryFn: async ({ pageParam }) => {
                const data = await fetchPosts(pageParam)
                return { data }
            },
            infiniteQueryOptions: {
                initialPageParam: null,
                getNextPageParam: lastpage => {
                    return lastpage.nextCursor
                }
            }
        })
    })
})
export const {useGetPostInfiniteQuery} = getInfinite