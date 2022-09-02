import React from "react";
import classNames from "classnames";
import { SideMenuItem } from "../SideMenuItem/SideMenuItem";
import css from "./SideMenu.module.css";

export default function SideMenu({ isOpen, hideModal }) {
	const sideMenuClasses = classNames(css.sideMenu__wrapper, {
		[css.sideMenu__hidden]: !isOpen,
	});

	return (
		<div className={sideMenuClasses} onClick={() => hideModal()}>
			<div
				className={css.sideMenu__content}
				onClick={(event) => event.stopPropagation()}>
				<SideMenuItem img="/img/svg/shop.svg" link="/shop">
					Каталог товаров
				</SideMenuItem>
				<SideMenuItem img="/img/svg/contact-us.svg" link="/contacts">
					Контакты
				</SideMenuItem>
				<SideMenuItem img="/img/svg/manual-information.svg" link="#">
					Правовая информация
				</SideMenuItem>
			</div>
		</div>
	);
}
