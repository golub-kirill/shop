// Save cart data to session storage.
export function saveCartToSessionStorage(cart) {
	sessionStorage.setItem("cart", JSON.stringify(cart));
}
// Get cart data from session storage.
export function getCartFromSessionStorage() {
	const cart = sessionStorage.getItem("cart");
	return cart ? JSON.parse(cart) : null;
}
// Remove cart data from session storage.
export function removeCartFromSessionStorage() {
	sessionStorage.removeItem("cart");
}
