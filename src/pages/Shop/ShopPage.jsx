import React, { useEffect } from "react";
import css from "./ShopPage.module.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { Slider } from "../../components/Slider/Slider";
import { ItemCard } from "../../components/ItemCard/ItemCard";
import { useSearch } from "../../hooks/useSearch";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../../store/slices/cartSlice";
import { saveCartToSS } from "../../controllers/cartController";

export const ShopPage = () => {
	const [searchQery, setSearchQuery] = React.useState("");
	const items = useSearch(searchQery);
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	useEffect(() => {
		saveCartToSS(cart);
	}, [cart]);

	const addItemToCart = (item, quantity) => {
		dispatch(addItem({ item, quantity }));
	};

	const removeItemFromCart = (item) => {
		dispatch(removeItem(item));
	};

	return (
		<div className={css.shop__wrapper}>
			<Navbar
				searchQuery={searchQery}
				setSearchQuery={setSearchQuery}
				className={css.navbar}
				cartCount={cart.length}
			/>
			<Slider isHidden={searchQery.length > 0} />
			{items.length > 0 ? (
				<div className={css.shop__items}>
					{Array.from(
						new Set(
							items.map((item) => JSON.stringify(item.category))
						)
					).map((category) => (
						// Category
						<div className={css.items__category} key={category}>
							<h2>{JSON.parse(category)}</h2>
							<hr />
							{/* Items list */}
							<div className={css.items__list}>
								{items.map((item, index) => {
									if (
										JSON.stringify(item.category) ===
										category
									) {
										return (
											<ItemCard
												item={item}
												key={index}
												selectedQuantity={
													cart.find(
														(el) =>
															el.item.title ===
															item.title
													)?.quantity || 0
												}
												addItemToCart={addItemToCart}
												removeItemFromCart={
													removeItemFromCart
												}
											/>
										);
									}
									return null;
								})}
							</div>
						</div>
					))}
				</div>
			) : (
				<h1 className={css.emptyPlaceholder}>
					По вашему запросу ничего не найдено
				</h1>
			)}
		</div>
	);
};
