import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function HeaderMenu(props) {
    const listMenus = [
        {
            title: "Home",
            to: "/"
        },
        {
            title: "Product",
            to: "/product"
        },
        {
            title: "Blog",
            to: "/blog"
        },
        {
            title: "Contact",
            to: "/contact"
        },
    ]
    return (
        <nav className="mr-28 hidden lg:block ml-auto">
            <ul className="flex items-center gap-10">
                {listMenus.map((item) => (
                    <li key={item.to} className="relative after:absolute after:h-[1.5px] after:bg-black after:left-0 after:bottom-[-2px] after:transition-all after:duration-300 after:w-full after:scale-x-0 hover:after:-scale-x-100">
                        <NavLink
                            to={item.to}
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            {item.title}
                        </NavLink>

                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default HeaderMenu;