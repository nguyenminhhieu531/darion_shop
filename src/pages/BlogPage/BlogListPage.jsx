import React from 'react';
import { Outlet } from 'react-router-dom';

function BlogListPage(props) {
    return (
        <>
            <Outlet />
        </>
    );
}

export default BlogListPage;