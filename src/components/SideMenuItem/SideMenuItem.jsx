import React from "react";
import { Link } from "react-router-dom";
import css from "./SideMenuItem.module.css";

export const SideMenuItem = ({ children, img, link }) => {
	return (
		<div>
			<Link to={link} className={css.sideMenuItem}>
				<img src={img} alt="shop" className={css.sideMenuItem__icon}/>
				{children}
			</Link>
		</div>
	);
};
