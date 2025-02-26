import React from 'react';
import { Link } from 'react-router-dom';

function BannerProductList(props) {
    return (
        <>
            <section class="relative">
                <img src="./assets/images/img_product_list_banner.webp" alt="" />
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <h2 class="text-4xl font-semibold">Products</h2>
                    <ul class="flex items-center gap-3 justify-center mt-2">
                        <li>
                            <Link to={"/"}>Home / </Link>
                        </li>
                        <li>
                            <Link to={"/"}>Products</Link>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
}

export default BannerProductList;