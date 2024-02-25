import { apiSlice } from "../api/apiSlice";
import { addCategroy } from "./categorySlice";
// import { userLogedIn, userLogedOut, userRegistration } from "./categorySlice";


export const categoryApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCategory: builder.query({
			query: () => ({
				url: "project/get-category",
				method: "GET",
			}),
			onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
				try {
					const result = await queryFulfilled;
					console.log(result, "result from get category")

					dispatch(
						addCategroy({
							category: result.data.payload?.category,
						})
					);
				} catch (error: any) {
					// console.error(error);
				}
			},
		}),

	}),
});

export const { useGetCategoryQuery } = categoryApi;
