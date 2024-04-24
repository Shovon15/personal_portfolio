import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface IUser {
//     _id: string;
//     name?: string;
//     email: string;
//     avatar?: object;
//     role: string;
//     isVerified: boolean;
//     courses: any[]; // You can define a type for courses if needed
// }

interface UserState {
    token: string;
    user: object | null;
}

const initialState: UserState = {
    token: "",
    user: null,
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userRegistration: (state, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token;
        },
        userLogedIn: (state, action: PayloadAction<{ accessToken: string, user: object }>) => {
            state.token = action.payload.accessToken;
            state.user = action.payload.user;
            localStorage.setItem('token', action.payload.accessToken); 
        },
        userLogedOut: (state, action) => {
            localStorage.removeItem('token');
            return initialState;
        },
    }
})

export const { userRegistration, userLogedIn, userLogedOut } = authSlice.actions;

export default authSlice.reducer;