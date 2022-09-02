import classNames from "classnames";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../controllers/authController";
import { removeUserFromLS } from "../../controllers/userController";
import { removeUser } from "../../store/slices/userSlice";
import { StyledButton } from "../UI/Buttons/StyledButton";
import css from "./UserInfo.module.css";

export const UserInfo = ({ isOpen, hideModal }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userInfoClasses = classNames(css.userInfo__wrapper, {
		[css.userInfo__show]: isOpen,
	});
	const { phone, name, creationTime } = useSelector((state) => state.user);

	const signout = () => {
		logout();
		dispatch(removeUser());
		removeUserFromLS();
		navigate("/auth");
	};
	return (
		<div className={userInfoClasses} onClick={() => hideModal()}>
			<div className={css.userInfo__content}>
				<p className={css.userInfo__title}>
					{name || phone || "Incognito"}
				</p>
				<span className={css.userInfo__label}>Дата регистрации:</span>
				<p className={css.userInfo__createdAt}>
					{creationTime || "Never"}
				</p>
				<StyledButton
					onClick={() => {
						signout();
					}}>
					Выйти
				</StyledButton>
			</div>
		</div>
	);
};
