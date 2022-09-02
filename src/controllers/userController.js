// Save user data to local storage.
export function saveUserToLS(user) {
	localStorage.setItem(
		"user",
		JSON.stringify({
			uid: user.uid,
			name: user.displayName,
			email: user.email,
			isEmailVerified: user.emailVerified,
			phone: user.phoneNumber,
			creationTime: user.metadata.creationTime,
			lastSignInTime: user.metadata.lastSignInTime,
			createdAt: user.metadata.createdAt,
			lastLoginAt: user.metadata.lastLoginAt,
		})
	);
}

// Get user data from local storage.
export function getUserFromLS() {
	const user = localStorage.getItem("user");
	return user ? JSON.parse(user) : null;
}

// Remove user data from local storage.
export function removeUserFromLS() {
	localStorage.removeItem("user");
}
