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

interface ICategory {
    name: string;
    value: string;
}

const initialState: ICategory[] = [];


const categorySlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addCategroy: (state, action: PayloadAction<{ category: ICategory }>) => {
            state.push(action.payload.category);
        },
        removeCategory: (state, action: PayloadAction<{ accessToken: string, user: object }>) => {
            // state.token = action.payload.accessToken;
            // state.user = action.payload.user;
        },

    }
})

export const { addCategroy } = categorySlice.actions;

export default categorySlice.reducer;