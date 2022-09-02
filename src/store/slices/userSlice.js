import { createSlice } from "@reduxjs/toolkit";
import { getUserFromLS } from "../../controllers/userController";

const user = getUserFromLS();
const initialState = user
	? {
			uid: user.uid ? user.uid : null,
			name: user.name ? user.name : null,
			phone: user.phone ? user.phone : null,
			email: user.email ? user.email : null,
			isEmailVerified: user.emailVerified ? user.emailVerified : false,
			creationTime: user.creationTime ? user.creationTime : null,
			lastSignInTime: user.lastSignInTime ? user.lastSignInTime : null,
			createdAt: user.createdAt ? user.createdAt : null,
			lastLoginAt: user.lastLoginAt ? user.lastLoginAt : null,
	  }
	: {
			uid: null,
			name: null,
			phone: null,
			email: null,
			isEmailVerified: false,
			creationTime: null,
			lastSignInTime: null,
			createdAt: null,
			lastLoginAt: null,
	  };

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.uid = action.payload.uid;
			state.phone = action.payload.phone;
			state.email = action.payload.email;
			state.isEmailVerified = action.payload.isEmailVerified;
			state.creationTime = action.payload.creationTime;
			state.lastSignInTime = action.payload.lastSignInTime;
			state.createdAt = action.payload.createdAt;
			state.lastLoginAt = action.payload.lastLoginAt;
		},

		removeUser: (state) => {
			state.uid = null;
			state.phone = null;
			state.email = null;
			state.isEmailVerified = false;
			state.creationTime = null;
			state.lastSignInTime = null;
			state.createdAt = null;
			state.lastLoginAt = null;
		},
	},
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
