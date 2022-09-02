import React, { useEffect, useState } from "react";
import css from "./styles.module.css";

export const PhoneSubmitButton = (props) => {
	const [counter, setCounter] = useState(0);
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

	// Timer for phone verification
	useEffect(() => {
		counter > 0
			? setTimeout(() => setCounter(counter - 1), 1000)
			: setIsButtonDisabled(false);
	}, [counter]);

	// If phone is invalid, disable button
	useEffect(() => {
		props.isPhoneHasErrors
			? setIsButtonDisabled(true)
			: setIsButtonDisabled(false);
	}, [props.isPhoneHasErrors]);


	// Clear handler
	useEffect(() => {
		return () => {
			clearTimeout();
		};
	});

	// Disable button, set timer and request RECAPTCHA, then show OTP input.
	const handleClick = (event) => {
		// required for firefox
		event.preventDefault();
		setIsButtonDisabled(true);
		setCounter(3);
		props.onClick();
	};

	return (
		<div className={css.styledButton__wrapper}>
			<button
				className={css.styledButton}
				disabled={isButtonDisabled || props.isPhoneHasErrors}
				onClick={(event) => handleClick(event)}>
				Отправить код
			</button>
			{/* Timer before next verifivation */}
			<p className={css.form__timer} hidden={!counter > 0}>
				Отправить код повторно можно будет через:{" "}
				<span>00:{counter < 10 ? `0${counter}` : counter}</span>
			</p>
		</div>
	);
};
