import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { useSelector } from 'react-redux';
import BoxProduct from '../components/BoxProduct';
import axios from 'axios';
import ApiService from '../service/ApiServices';
import { Link, useParams } from 'react-router-dom';

function CategoryPage(props) {
    const { categoryName } = useParams(); // Lấy category từ URL
    console.log(useParams);

    const [listCategory, setListCategory] = useState([]);

    // Sản phẩm liên quan
    const fetchDataByCategory = async () => {
        const res = await ApiService.GetProductsByCategory(categoryName);
        if (res.status === 200) {
            setListCategory(res.data.products);
        }
    }

    useEffect(() => {
        fetchDataByCategory();
    }, [categoryName])


    return (
        <section className=" pb-12 bg-gray">
            <div className="breadcrumb">
                <Link to={"/"}>
                    <i className="icon fa fa-home" />
                </Link>
                <span className="mx-2 mb-0">/</span>
                <span className=""> {categoryName}</span>
            </div>
            <div className="container mt-5">
                <div className="lg:grid grid-cols-4">
                    <div className="col-span-4 mt-6 lg:mt-0">
                        <div className="py-2 px-3 border rounded-full cursor-pointer w-max">
                            <select name="" id="" className="w-full filter_select text-sm">
                                <option value="">New Latest</option>
                                <option value="asc">Price, low to hight</option>
                                <option value="desc">Price, hight to low</option>
                            </select>
                        </div>
                        <ul className="mt-6 grid grid-cols-2 gap-4 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {listCategory.map((item) => (
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
        </section>

    );
}

export default CategoryPage;


