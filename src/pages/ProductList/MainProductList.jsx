import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BoxProduct from '../../components/BoxProduct';
import Pagination from '@mui/material/Pagination';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ApiService from '../../service/ApiServices';

function MainProductList(props) {
    // const listProduct = useSelector((state) => state.productSlice.listProduct);
    // console.log(listProduct)
    const [sortProduct, setSortProduct] = useState("") // từ khóa sort
    const [resultSort, setResultSort] = useState([]) // kết quả sort
    const [page, setPage] = useState(1); // Thêm biến trạng thái cho trang
    const [totalPages, setTotalPages] = useState(0);

    // Hàm load dữ liệu với sắp xếp
    const loadData = async () => {
        const limit = 12; // Số sản phẩm mỗi trang
        const skip = (page - 1) * limit;
        if (sortProduct === "") {
            const res = await axios(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
            setResultSort(res.data.products); // Lưu kết quả vào state
            setTotalPages(Math.ceil(res.data.total / limit)); // Tổng số trang
        }
        else {
            const res = await axios(`https://dummyjson.com/products?sortBy=price&order=${sortProduct}&limit=${limit}&skip=${skip}`);
            setResultSort(res.data.products); // Lưu kết quả vào state
            setTotalPages(Math.ceil(res.data.total / limit)); // Tổng số trang
        }
    }

    const handleSortChange = (e) => {
        setSortProduct(e.target.value);
    }

    useEffect(() => {
        loadData();
    }, [sortProduct, page])

    const listCategory = useSelector((state) => state.categorySlice.ourCategories);


    return (
        <section className="pt-12 pb-12 bg-gray">
            <div className="container">
                <div className="lg:grid grid-cols-5">
                    <div className="col-span-1 p-0 lg:p-4">
                        <div className="">
                            <h2 className="text-lg font-semibold">Category</h2>
                            <ul className="mt-4 space-y-3">
                                {listCategory.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            to={`/category/${item.slug}`}
                                            className="font-medium text-black text-sm hover:text-black transition-all"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-span-4 mt-6 lg:mt-0">
                        <div className="py-2 px-3 border rounded-full cursor-pointer w-max">
                            <select onChange={handleSortChange} name="" id="" className="w-full filter_select text-sm">
                                <option value="">New Latest</option>
                                <option value="asc">Price, low to hight</option>
                                <option value="desc">Price, hight to low</option>
                            </select>
                        </div>
                        <ul className="mt-6 grid grid-cols-2 gap-4 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {(resultSort).map((item) => (
                                <BoxProduct key={item.id} data={item} />
                            ))}
                        </ul>

                        <div className="mt-10 flex justify-center ">
                            <Pagination
                                count={totalPages} // Tổng số trang
                                page={page} // Trang hiện tại
                                onChange={(e, value) => {
                                    console.log(page)
                                    setPage(value)
                                }}
                                variant="outlined" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default MainProductList;