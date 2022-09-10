import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../store/slices/cartSlice';
import classNames from 'classnames';
import css from './Cart.module.css';

export const Cart = ({ isOpen, hideModal }) => {
    const cart = useSelector((state) => state.cart);
    const [cartTotal, setCartTotal] = React.useState(0);
    const dispatch = useDispatch();
    const cartClasses = classNames(css.cart__wrapper, {
        [css.cart__hidden]: !isOpen,
    });

    useEffect(() => {
        setCartTotal(cart.reduce((acc, item) => acc + item.total, 0) || 0);
    }, [cart]);

    // If cart is empty, hide the cart
    !cart.length && hideModal();

    // If cart is open, block body scrolling
    isOpen
        ? document.body.style.setProperty('overflow', 'hidden')
        : document.body.style.setProperty('overflow', 'auto');

    return (
        <div className={cartClasses} onClick={() => hideModal()}>
            <div
                className={css.cart__content}
                onClick={(event) => event.stopPropagation()}>
                <div className={css.cart__header}>
                    <div className={css.cart__title}>Cart</div>
                    <button
                        className={css.cart__close}
                        onClick={() => hideModal()}>
                        x
                    </button>
                </div>

                {cart.map((item) => (
                    <div className={css.cart__item} key={item.item.title}>
                        {/* Item image */}
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="#" className={css.item__image}>
                            <img
                                className={css.cart__item__img}
                                src={item.item.image}
                                alt={item.item.title}
                                width={'100px'}
                                heigth={'100px'}
                            />
                        </a>
                        {/* Item description */}
                        <div className={css.cart__item__description}>
                            <span>
                                {item.item.title +
                                    ' - ' +
                                    item.item.description}
                            </span>

                            <div className={css.cart__item__count}>
                                <span>
                                    {item.quantity +
                                        ' pcs. / ' +
                                        item.item.price +
                                        ' $'}
                                </span>
                            </div>
                        </div>
                        {/* Item price */}
                        <div className={css.cart__item__price}>
                            <button
                                onClick={() => dispatch(removeItem(item.item))}>
                                x
                            </button>
                            <span>{item.total + ' $'}</span>
                        </div>
                    </div>
                ))}

                <div className={css.cart__footer}>
                    <div className={css.cart__total}>
                        <span>{cartTotal} $</span>
                        <button>Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
