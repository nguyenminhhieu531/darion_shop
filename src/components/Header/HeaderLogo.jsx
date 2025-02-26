import React from 'react';
import { Link } from 'react-router-dom';

function HeaderLogo(props) {
    return (
        <>
            <h1 className="flex-shrink-0 mr-5">
                <Link to={"/"} className="block max-w-[130px]" >
                    <img className="max-w-full" src="/assets/images/logo.webp" alt="Darion" />
                </Link>
            </h1>
        </>
    );
}

export default HeaderLogo;