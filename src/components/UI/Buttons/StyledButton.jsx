import React from "react";
import css from "./styles.module.css";

export const StyledButton = (props) => {
	const handleClick = (event) => {
		// required for firefox
		event.preventDefault();
		props.onClick();
	};

	return (
		<div className={css.styledButton__wrapper}>
			<button
				className={css.styledButton}
				onClick={(event) => handleClick(event)}>
				{props.children}
			</button>
		</div>
	);
};
