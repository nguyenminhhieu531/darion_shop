import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { useSelector } from 'react-redux';
import BoxProduct from '../components/BoxProduct';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SearchPage(props) {
    const productSearch = useSelector((state) => state.productSlice.productSearch);
    console.log(productSearch);


    return (
        <>
            {
                productSearch.length > 0 ?
                    <section className="pb-12 bg-gray">
                        <div div className="container">
                            <div className="lg:grid grid-cols-4">
                                <div className="col-span-4 mt-6 lg:mt-6">
                                    <div className="py-2 px-3 border rounded-full cursor-pointer w-max">
                                        <select name="" id="" className="w-full filter_select text-sm">
                                            <option value="">New Latest</option>
                                            <option value="asc">Price, low to hight</option>
                                            <option value="desc">Price, hight to low</option>
                                        </select>
                                    </div>
                                    <ul className="mt-6 grid grid-cols-2 gap-4 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                        {productSearch.map((item) => (
                                            <BoxProduct key={item} data={item} />
                                        ))}
                                    </ul>
                                    <div className="mt-10 flex justify-center ">
                                        <Pagination onChange={(e, page) => {
                                            console.log(page);
                                        }} count={10} variant="outlined" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> :
                    <div className='check_search'>
                        <h2>Không tìm thấy bất kỳ kết quả nào với từ khóa trên. Mời bạn tìm kiếm sản phẩm khác !</h2>
                    </div>
            }
        </>

    );
}

export default SearchPage;


