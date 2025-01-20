import React from 'react';
import BoxCate from '../BoxCate';
import { useSelector } from 'react-redux';

function OurCategoriesCenter(props) {
    const listCategory = useSelector((state) => state.categorySlice.ourCategories);
    console.log(listCategory);

    return (
        <section className="mt-9 lg:mt-24">
            <div className="container">
                <h2 className="text-3xl font-bold text-center">Our Categories</h2>
                <ul className="md:grid grid-cols-4 gap-10 mt-11">
                    {listCategory.slice(7, 11).map((item, index) => (
                        <BoxCate key={item.name} idx={index} data={item} isCheckLayoutCategory={false} />
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default OurCategoriesCenter;