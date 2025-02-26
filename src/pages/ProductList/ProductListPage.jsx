import React from 'react';
import { Outlet } from 'react-router-dom';

function ProductListPage(props) {
    return (
        <>
            <Outlet />
        </>
    );
}

export default ProductListPage;