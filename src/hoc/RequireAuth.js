import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getUserFromLS } from "../controllers/userController";

export default function RequireAuth({ children }) {
	const location = useLocation();
	const isAuth = getUserFromLS();

	if (!isAuth) {
		return <Navigate to="/auth" state={{ from: location }} />;
	}

	return children;
}
