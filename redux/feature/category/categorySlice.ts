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
    name: "category",
    initialState,
    reducers: {
        addCategroy: (state, action: PayloadAction<{ category: ICategory }>) => {
            console.log(action.payload.category, "category from slice")
            state.push(action.payload.category);
            // state.category = action.payload.category
            // console.log(state.category, "state from slice")
        },
        removeCategory: (state, action: PayloadAction<{ category: ICategory }>) => {
            // state.token = action.payload.accessToken;
            // state.user = action.payload.user;
        },

    }
})

export const { addCategroy } = categorySlice.actions;

export default categorySlice.reducer;