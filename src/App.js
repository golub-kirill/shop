import React from "react";
import { Route, Routes, Navigate } from "react-router";
import RequireAuth from "./hoc/RequireAuth.js";
import { AuthPage } from "./pages/Auth/AuthPage.jsx";
import { ShopPage } from "./pages/Shop/ShopPage.jsx";

export const App = () => {
	return (
		<Routes>
			<Route path="/auth" element={<AuthPage />} />
			<Route
				path="/shop"
				element={
					<RequireAuth>
						<ShopPage />
					</RequireAuth>
				}
			/>
			<Route path="*" element={<Navigate to="/auth" replace/>} />
		</Routes>
	);
};
