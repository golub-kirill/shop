import React, { useEffect } from "react";
import css from "./AuthForm.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
	confirmOTP,
	requestRecaptchVerifier,
	signInWithPhone,
} from "../../controllers/authController";
import { setUser } from "../../store/slices/userSlice";
import { PhoneSubmitButton } from "../UI/Buttons/PhoneSubmitButton";
import { StyledButton } from "../UI/Buttons/StyledButton";
import ErrorsPopup from "../UI/ErrorsPopup/ErrorsPopup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveUserToLS } from "../../controllers/userController";

export default function AuthForm() {
	const [errorMessages, setErrorMessages] = React.useState(null);
	const [stage, setStage] = React.useState("phoneVerification");
	const [isOtpInputHidden, setIsOtpInputHidden] = React.useState(true);
	const otpInput = React.useRef(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			phone: "",
			otp: "",
		},
		validationSchema: Yup.object({
			phone: Yup.string().required("Enter phone number."),
			// TODO: Change regexp
			// .matches(
			// 	/^(\+38071)?[0-9]{7}$/gm,
			// 	"Check your phone number and try again."
			// ),
			otp: Yup.string()
				.required("Enter verification code.")
				.length(6, "Check your verification code and try again."),
		}),
	});

	// Request RECAPTCHA, then request user from storage.
	useEffect(() => {
		if (window.recaptchaVerifier) {
			window.recaptchaVerifier.recaptcha?.reset();
			window.recaptchaVerifier.clear();
		}

		requestRecaptchVerifier();
	}, []);

	// Show OTP input, then send SMS code by phone number.
	const phoneVerificationHandler = async () => {
		await signInWithPhone(formik.values.phone)
			.then(() => {
				setIsOtpInputHidden(false);
				otpInput.current.focus();
			})
			.catch((error) => {
				console.log(error);
				arr.push(error.code);
				setErrorMessages(arr);
			});
	};
	// Verify OTP code and sign in with phone number.
	const otpVerificationHandler = async () => {
		await confirmOTP(formik.values.otp)
			.then((result) => {
				// Save user data to store.
				storeUser(result.user);
				navigate("/shop");
			})
			.catch((error) => {
				formik.values.otp = "";
				arr.push(error.code);
				setErrorMessages(arr);
			});
	};

	// Save user data.
	const storeUser = (user) => {
		// Save user data to store.
		dispatch(setUser({
			uid: user.uid,
			name: user.displayName,
			email: user.email,
			isEmailVerified: user.emailVerified,
			phone: user.phoneNumber,
			creationTime: user.metadata.creationTime,
			lastSignInTime: user.metadata.lastSignInTime,
			createdAt: user.metadata.createdAt,
			lastLoginAt: user.metadata.lastLoginAt,
		}));
		// Save user data to local storage.
		saveUserToLS(user);
	};

	// TODO: Переделать на стейт
	let arr = [];
	useEffect(() => {
		// Set error messages array.
		if (formik.errors.phone && formik.touched.phone)
			arr.push(formik.errors.phone);
		if (formik.errors.otp && formik.touched.otp)
			arr.push(formik.errors.otp);
		if (!formik.errors) {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			arr = [];
		}
		arr.length > 0 ? setErrorMessages(arr) : setErrorMessages(null);

		// Change stage to OTP input.
		if (!formik.values.otp && stage === "otpVerification") {
			setStage("phoneVerification");
		} else if (formik.values.otp && stage === "phoneVerification") {
			setStage("otpVerification");
		}
	}, [formik.errors, formik.touched]);

	return (
		<form className={css.form}>
			<h1 className={css.form__title}>Sign in</h1>
			<div className={css.input__container}>
				{/* Phone input */}
				<label htmlFor="phone" className={css.input__label}>
					Номер телефона
				</label>
				<input
					autoFocus
					className={css.input}
					placeholder="+111-22-333-33-33"
					type="tel"
					name="phone"
					value={formik.values.phone}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					style={
						formik.errors.phone &&
						formik.touched.phone && {
							borderLeft: "solid 10px #bd0f1b",
							borderBottomColor: "#bd0f1b",
						}
					}
				/>
				{/* OTP code input */}
				<label
					htmlFor="otp"
					className={css.input__label}
					hidden={isOtpInputHidden}>
					Код подтверждения
				</label>
				<input
					ref={otpInput}
					hidden={isOtpInputHidden}
					className={css.input}
					placeholder="Код из SMS"
					type="text"
					name="otp"
					value={formik.values.otp}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					style={
						formik.errors.otp &&
						formik.touched.otp && {
							borderLeft: "solid 10px #bd0f1b",
							borderBottomColor: "#bd0f1b",
						}
					}
				/>
			</div>
			{stage === "phoneVerification" ? (
				// Phone submit button with timer
				<PhoneSubmitButton
					onClick={phoneVerificationHandler}
					isPhoneHasErrors={
						formik.errors.phone
							? !!Object.keys(formik.errors.phone).length
							: false
					}
				/>
			) : (
				// OTP submit button
				<StyledButton
					onClick={otpVerificationHandler}
					disabled={
						formik.errors.otp
							? !!Object.keys(formik.errors.otp).length
							: false
					}>
					Войти
				</StyledButton>
			)}
			{/* Errors list */}
			<ErrorsPopup errorMessages={errorMessages} />
		</form>
	);
}
