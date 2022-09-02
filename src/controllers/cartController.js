// Save cart data to session storage.
export function saveCartToSS(cart) {
	sessionStorage.setItem("cart", JSON.stringify(cart));
}
// Get cart data from session storage.
export function getCartFromSS() {
	const cart = sessionStorage.getItem("cart");
	return cart ? JSON.parse(cart) : null;
}
// Remove cart data from session storage.
export function removeCartFromSS() {
	sessionStorage.removeItem("cart");
}
