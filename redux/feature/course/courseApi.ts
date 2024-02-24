import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCourses: builder.query({
            query: () => ({
                url: "courses",
                method: "GET",
            }),
            onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
                try {
                    const result = await queryFulfilled;
                    console.log(result, "result from get courses")

                    // dispatch(
                    //     userLogedIn({
                    //         accessToken: result.data.payload?.accessToken,
                    //         user: result.data.payload?.user,
                    // })
                    // );
                } catch (error: any) {
                    // console.error(error);
                }
            },
        }),
    }),
});

export const { useGetCoursesQuery } = authApi;
