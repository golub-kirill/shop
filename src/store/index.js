import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import itemReducer from "./slices/itemSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		items: itemReducer,
		cart: cartReducer,
	},
});