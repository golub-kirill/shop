import { createSlice } from "@reduxjs/toolkit";
import { getCartFromSessionStorage } from "../../controllers/cartController";
const savedCart = getCartFromSessionStorage();
const initialState = savedCart || [];

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem: (state, action) => {
            // If the item is already in the cart, increase the quantity
			const filteredItem = state.filter((item) => {
				if (item.item.title === action.payload.item.title) {
					item.quantity += action.payload.quantity;
					item.total += action.payload.item.price * action.payload.quantity;
				}
				return item;
			});

            // If the item is not in the cart, add it
			if (
				!filteredItem.some(
					(item) => item.item.title === action.payload.item.title
				)
			) {
				state.push({
					item: action.payload.item,
					quantity: action.payload.quantity,
					total: action.payload.item.price * action.payload.quantity,
				});
			}
		},
		removeItem: (state, action) => {
			state.splice(state.findIndex((item) => item.item.title === action.payload.title), 1);
			
		},
	},
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
