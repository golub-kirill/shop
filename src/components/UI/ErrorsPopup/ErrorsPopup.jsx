import React from "react";
import css from "./styles.module.css";

export default function ErrorsPopup(props) {
	if (!props.errorMessages) return null;
	const errors = props.errorMessages;

	const errorHandler = (error) => {
		if (error === undefined)
			return "Reload page and try later.";
		if (error === "auth/too-many-requests")
			return "Too many requests. Try later.";
		if (error === "auth/invalid-phone-number")
			return "Check your phone number and try again.";
		if (error === "auth/operation-not-allowed")
			return "Autorisation error. Try later.";
		if (error === "auth/invalid-verification-code")
			return "Check your verification code and try again.";
		if (error === "auth/user-disabled")
			return "Your account is disabled";
		if (error === "auth/code-expired")
			return "Verification code expired, try again.";

		return error;
	};

	return (
		<div className={css.error__wrapper}>
			{Object.values(errors).map((error) => (
				<div className={css.error__message} key={error}>
					<img
						src="/img/svg/error.svg"
						alt="error"
						className={css.error__img}
					/>
					{errorHandler(error)}
				</div>
			))}
		</div>
	);
}
