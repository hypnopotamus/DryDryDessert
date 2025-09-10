import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./ShoppingCart/shoppingCart.slice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;