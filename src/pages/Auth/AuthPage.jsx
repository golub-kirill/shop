import React from "react";
import AuthForm from "../../components/Auth/AuthForm";
import css from "./AuthPage.module.css";


export const AuthPage = () => {
	return (
		<div className={css.authPage__wrapper}>
			<AuthForm />
			<div id="recapcha-container"></div>
		</div>
	);
};
