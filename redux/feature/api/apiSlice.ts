import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { userLogedIn } from "../auth/authSlice";
import { serverUrl } from "@/secret";

type LoadUserResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    payload: {
        accessToken: string;
        user: object;
    };
};

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: serverUrl,
    }),
    endpoints: (builder) => ({
        // refreshToken: builder.query({
        //     query: () => ({
        //         url: "refresh-token",
        //         method: "GET",
        //         credentials: "include" as const,
        //     }),
        // }),
        loadUser: builder.query<LoadUserResponse, void>({
            query: () => ({
                url: "user-info",
                method: "GET",
                credentials: "include" as const,
            }),
            onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
                try {
                    const result = await queryFulfilled;
                    console.log(result, "result from load user")
                    dispatch(
                        userLogedIn({
                            accessToken: result.data.payload?.accessToken,
                            user: result.data.payload?.user,
                        })
                    );
                } catch (error: any) {
                    // console.error(error);
                }
            },
        })
    }),
});

export const {  useLoadUserQuery } = apiSlice;
