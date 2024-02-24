"use client";

// import { authApi } from "./feature/auth/authApi";
import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./feature/api/apiSlice";
import authSlice from "./feature/auth/authSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
    },
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

const initializeApp = async () => {
    // await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true }));

    // await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true }));
    await store.dispatch(apiSlice.endpoints.loadUser.initiate(undefined, { forceRefetch: true }));

};

initializeApp();
