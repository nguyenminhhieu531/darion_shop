import React from 'react';
import HeaderLogo from './HeaderLogo';
import HeaderSearch from './HeaderSearch';
import HeaderMenu from './HeaderMenu';
import HeaderProfile from './HeaderProfile';

function Header(props) {
    return (
        <header className="py-5 lg:py-8 sticky top-0 z-10 bg-white shadow-lg">
            <div className="container flex items-center">
                <HeaderLogo />
                <HeaderSearch />
                <HeaderMenu />
                <HeaderProfile />
            </div>
        </header>
    );
}

export default Header;