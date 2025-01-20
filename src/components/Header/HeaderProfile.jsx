import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuAccount from './MenuAccount';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

function HeaderProfile(props) {
    const { isLogin } = useSelector((state) => state.authenSlice);
    const cartItems = useSelector((state) => state.cartSlice.cartItems);
    const { wishList } = useSelector((state) => state.wishSlice)
    console.log(wishList)

    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Kiểm tra nếu người dùng đã lưu trạng thái trước đó
        return localStorage.getItem("theme") === "dark";
    });

    // Thay đổi class của body khi bật/tắt dark mode
    useEffect(() => {
        const mainElement = document.querySelector(".main_home"); // Tìm phần tử có class main
        const grayElements = document.querySelectorAll('.bg-gray');
        if (mainElement) {
            if (isDarkMode) {
                mainElement.classList.add("dark-mode");
                localStorage.setItem("theme", "dark");
                grayElements.forEach((el) => {
                    el.classList.remove('bg-gray');
                });
            } else {
                mainElement.classList.remove("dark-mode");
                localStorage.setItem("theme", "light");
            }
        }
    }, [isDarkMode]);


    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };
    return (
        <>
            <div className="flex items-center gap-6 ml-auto lg:ml-0 shrink-0">
                <a href="#none" className="lg:hidden">
                    <img className="size-5" src="../assets/images/ico_search.png" alt="" />
                </a>

                {
                    isLogin ? <MenuAccount /> : (
                        <Link to={"/login"}>
                            <img className="size-5" src="../assets/images/ico_user.png" alt="" />
                        </Link>
                    )
                }

                <Link to={"/wish-list"} className="relative">
                    <span className="absolute -top-[8px] -right-[10px] size-[18px] bg-black text-white rounded-full text-xs grid place-items-center">
                        {wishList.length}
                    </span>
                    <img className="size-5" src="../assets/images/ico_heart.png" alt="" />
                </Link>

                <Link to={"/shopping-cart"} className="relative">
                    <span className="absolute -top-[8px] -right-[10px] size-[18px] bg-black text-white rounded-full text-xs grid place-items-center">
                        {cartItems.length}
                    </span>
                    <img className="size-5" src="../assets/images/ico_bag.png" alt="" />
                </Link>

                <li style={{ listStyle: "none" }}>
                    <div className="App">
                        <button onClick={toggleDarkMode} className="toggle-theme-btn">
                            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} style={{fontSize: "21px"}}/>
                        </button>
                    </div>
                </li>
            </div>
        </>
    );
}

export default HeaderProfile;