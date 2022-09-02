import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";

// Create RECAPTCHA component
export function requestRecaptchVerifier() {
	window.recaptchaVerifier = new RecaptchaVerifier(
		"recapcha-container",
		{
			size: "invisible",
			callback: (response) => {
				console.log("RECAPTCHA verified successfully. \n", response);
			},
		},
		auth
	);
}

// Send SMS to user
export async function signInWithPhone(phoneNumber) {
	const appVerifier = window.recaptchaVerifier;
	const confirmationResult = await signInWithPhoneNumber(
		auth,
		phoneNumber,
		appVerifier
	);
	window.confirmationResult = confirmationResult;
	return confirmationResult;
}

// Verify SMS code
export function confirmOTP(code) {
	const confirmationResult = window.confirmationResult;
	return confirmationResult.confirm(code);
}

// Log out user
export function logout() {
	auth.signOut();
}
