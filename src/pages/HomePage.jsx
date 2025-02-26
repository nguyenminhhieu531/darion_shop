import React, { useEffect } from 'react';
import Shipping from '../components/Shipping';
import OurCategories from '../components/OurCategories';
import Bestseller from '../components/Bestseller';
import NewArrivalsProduct from '../components/NewArrivalsProduct'
import OurCategoriesCenter from '../components/OurCategoriesCenter';
import BannerMain from '../components/Banner/BannerMain';
import Banner from '../components/Banner/Banner';
import ApiService from '../service/ApiServices';
import { useDispatch } from 'react-redux';
import { ListCategory } from '../store/features/categorySlice';
import { BestSeller, NewArrivals } from '../store/features/productSlice';

function HomePage(props) {
    const dispatch = useDispatch();
    const fetchDataCate = async () => {
        const res = await ApiService.ListCategories();
        if (res.status === 200) {
            dispatch(ListCategory(res.data));
        }
    }

    const fetchListProduct = async () => {
        const res = await ApiService.ListProduct();
        if (res.status === 200) {
            dispatch(BestSeller(res.data.products))
            dispatch(NewArrivals(res.data.products))
        }
    }

    useEffect(() => {
        fetchDataCate();
        fetchListProduct();
    }, [])

    return (
        <div className='main_home'>
            <Banner />
            <Shipping />
            <OurCategoriesCenter />
            <Bestseller />
            {/* <OurCategories /> */}
            <BannerMain />
            <NewArrivalsProduct />
        </div>
    );
}

export default HomePage;