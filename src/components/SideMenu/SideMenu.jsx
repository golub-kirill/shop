import React from 'react';
import classNames from 'classnames';
import { SideMenuItem } from '../SideMenuItem/SideMenuItem';
import css from './SideMenu.module.css';

import shop from '../../assets/svg/shop.svg'
import contact from '../../assets/svg/contact-us.svg'
import info from '../../assets/svg/manual-information.svg'


export default function SideMenu({ isOpen, hideModal }) {
    const sideMenuClasses = classNames(css.sideMenu__wrapper, {
        [css.sideMenu__hidden]: !isOpen,
    });

    // If side menu is open, block body scrolling
    isOpen
        ? document.body.style.setProperty('overflow', 'hidden')
        : document.body.style.setProperty('overflow', 'auto');

    return (
        <div className={sideMenuClasses} onClick={() => hideModal()}>
            <div
                className={css.sideMenu__content}
                onClick={(event) => event.stopPropagation()}>
                <SideMenuItem img={shop} link="/shop">
                    Catalog
                </SideMenuItem>
                <SideMenuItem img={contact} link="#">
                    Contacts
                </SideMenuItem>
                <SideMenuItem img={info} link="#">
                    Anything
                </SideMenuItem>
            </div>
        </div>
    );
}
