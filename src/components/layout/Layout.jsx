import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Outlet } from 'react-router-dom';

function Layout(props) {
    return (
        <div className="wrap">
            <Header />
            <main className="main">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;