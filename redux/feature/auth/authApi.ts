import { apiSlice } from "../api/apiSlice";
import { userLogedIn, userLogedOut, userRegistration } from "./authSlice";

type RegisterResponse = {
	success: boolean;
	statusCode: number;
	message: string;
	payload: {
		activationToken: string;
	};
};
type LoginResponse = {
	success: boolean;
	statusCode: number;
	message: string;
	payload: {
		accessToken: string;
		user: object;
	};
};

type LogoutResponse = {
	success: boolean;
	message: string;
	// You can define other properties if necessary based on the response
};

type RegistrationData = {
	name: string;
	email: string;
	password: string;
};

type LoginData = {
	email: string;
	password: string;
};
type SocialAuthData = {
	name: string;
	email: string;
	avatar: string;
};

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation<RegisterResponse, RegistrationData>({
			query: (data) => ({
				url: "signup",
				method: "POST",
				body: data,
				credentials: "include" as const,
			}),
			onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
				try {
					const result = await queryFulfilled;
					// console.log(result, "result from registration");
					dispatch(
						userRegistration({
							token: result.data.payload?.activationToken,
						})
					);
				} catch (error: any) {
					console.error(error);
				}
			},
		}),
		activation: builder.mutation({
			query: ({ activation_token, activation_code }) => ({
				url: "activation",
				method: "POST",
				body: {
					activation_token,
					activation_code,
				},
			}),
		}),

		login: builder.mutation<LoginResponse, LoginData>({
			query: ({ email, password }) => ({
				url: "login",
				method: "POST",
				body: {
					email,
					password,
				},
				credentials: "include" as const,
			}),
			onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
				try {
					const result = await queryFulfilled;
					// console.log(result, "user login result");

					dispatch(
						userLogedIn({
							accessToken: result.data.payload?.accessToken,
							user: result.data.payload?.user,
						})
					);
				} catch (error: any) {
					console.error(error);
				}
			},
		}),

		socialAuth: builder.mutation<LoginResponse, SocialAuthData>({
			query: ({ name, email, avatar }) => ({
				url: "social-auth",
				method: "POST",
				body: {
					name,
					email,
					avatar,
				},
				credentials: "include" as const,
			}),
			onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
				try {
					const result = await queryFulfilled;

					dispatch(
						userLogedIn({
							accessToken: result.data.payload?.accessToken,
							user: result.data.payload?.user,
						})
					);
				} catch (error: any) {
					console.error(error);
				}
			},
		}),

		// logout: builder.query({
		// 	query: () => ({
		// 		url: "logout",
		// 		method: "GET",
		// 		credentials: "include" as const,
		// 	}),
		// }),

		logout: builder.mutation({
			query: () => ({
				url: "logout",
				method: "GET",
				credentials: "include" as const,
			}),
			onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
				try {
					const result = await queryFulfilled;
					// console.log(result, "result from logout")
					dispatch(
					    userLogedOut({
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

export const { useRegisterMutation, useActivationMutation, useLoginMutation, useSocialAuthMutation, useLogoutMutation } = authApi;
