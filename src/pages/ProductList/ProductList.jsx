import React, { useEffect } from 'react';
import BannerProductList from './BannerProductList';
import MainProductList from './MainProductList';
import { useDispatch } from 'react-redux';
import ApiService from '../../service/ApiServices';
import { ListProduct } from '../../store/features/productSlice';

function ProductList(props) {
    const dispatch = useDispatch();
    const fetchListProduct = async () => {
        const res = await ApiService.ListProduct();
        if (res.status === 200) {
            dispatch(ListProduct(res.data.products))
        }
    }

    useEffect(() => {
        fetchListProduct();
    }, [])


    return (
        <>
            <BannerProductList />
            <MainProductList />
        </>
    );
}

export default ProductList;