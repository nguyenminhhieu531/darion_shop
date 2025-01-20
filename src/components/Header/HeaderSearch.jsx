import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductSearch } from '../../store/features/productSlice';
import ApiService from '../../service/ApiServices';

function HeaderSearch(props) {
    const [searchProduct, setSearchProduct] = useState("");
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation();

    // Lấy query từ URL
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q");


    const loadData = async (searchProduct) => {
        try {
            const res = await ApiService.getProductSearch(searchProduct)
            if (res.status === 200) {
                dispatch(ProductSearch(res.data.products))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSearch = () => {
        const trimmedSearch = searchProduct.trim();
        if (trimmedSearch) {
            navigate(`/search?q=${encodeURIComponent(trimmedSearch)}`);
            setSearchProduct("")
        }
    };

    // Xử lý sự kiện khi nhấn Enter trong input
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();  // Gọi hàm tìm kiếm khi nhấn Enter
        }
    }

    useEffect(() => {
        if (query) {
            loadData(query); // Gọi API với từ khóa từ URL
        }
    }, [query])
    return (
        <>
            <div className="relative ml-auto lg:mr-20 max-w-[500px] w-full hidden xl:block">
                <input
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setSearchProduct(e.target.value)} value={searchProduct}
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span>
                        <img className="size-5" src="/assets/images/ico_search.png" alt="" />
                    </span>
                </div> */}
                <button
                    onClick={handleSearch}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-500  rounded-full hover:bg-blue-600"
                >
                    <span>
                        <img className="size-5" src="/assets/images/ico_search.png" alt="" />
                    </span>
                </button>
            </div>
        </>
    );
}

export default HeaderSearch;