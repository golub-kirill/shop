import classNames from "classnames";
import React from "react";
import { Cart } from "../Cart/Cart";
import SideMenu from "../SideMenu/SideMenu";
import { UserInfo } from "../UserInfo/UserInfo";
import css from "./Navbar.module.css";

export const Navbar = ({ searchQuery, setSearchQuery, cartCount }) => {
	const [isUserInfoOpen, setUserInfoOpen] = React.useState(false);
	const [isCartOpen, setCartOpen] = React.useState(false);
	const [isSideMenuOpen, setSideMenuOpen] = React.useState(false);
	const hideUserInfo = () => setUserInfoOpen(false);
	const hideCart = () => setCartOpen(false);
	const hideSideMenu = () => setSideMenuOpen(false);
	const cartIconClases = classNames(css.cart__count, {
		[css.count__hidden]: !cartCount > 0,
	});

	return (
		<nav className={css.navbar__wrapper}>
			<Cart isOpen={isCartOpen} hideModal={hideCart} />
			<SideMenu isOpen={isSideMenuOpen} hideModal={hideSideMenu} />
			<div className={css.leftSide}>
				<img
					className={css.menu__icon}
					src="/img/svg/menu.svg"
					alt="menu"
					onClick={() => setSideMenuOpen(!isSideMenuOpen)}
				/>
			</div>
			<div className={css.centerSide}>
				<input
					className={css.searchInput}
					type="text"
					placeholder="🔍︎ Я ищу..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>
			<div className={css.rightSide}>
				{/* Get info about user and signout */}
				<img
					className={css.user__icon}
					src="/img/svg/user.svg"
					alt="user"
					onClick={() => setUserInfoOpen(!isUserInfoOpen)}
				/>
				<UserInfo isOpen={isUserInfoOpen} hideModal={hideUserInfo} />
				{/*Shop cart list  */}
				<div>
					<img
						className={css.cart__icon}
						src="/img/svg/cart.svg"
						alt="cart"
						onClick={() => setCartOpen(!isCartOpen)}
					/>
				</div>
				<span className={cartIconClases}>
					{cartCount < 100 ? cartCount : "99+"}
				</span>
			</div>
		</nav>
	);
};
