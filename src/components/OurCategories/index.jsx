import React from 'react';
import BoxCate from '../BoxCate';
import { useSelector } from 'react-redux';

function OurCategories(props) {
    const listCategory = useSelector((state) => state.categorySlice.ourCategories);

    return (
        <section className="mt-8 lg:mt-24">
            <div className="container">
                <div className="lg:flex justify-between items-center">
                    <h2 className="text-3xl font-bold">Our Categories</h2>
                    <a
                        href="#none"
                        className="mt-6 lg:mt-0 h-9 border border-black px-7 inline-flex items-center font-semibold text-black rounded-full text-[15px] hover:bg-black hover:text-white transition-all duration-300"
                    >
                        View All
                    </a>
                </div>
                <ul className="mt-10 md:grid grid-cols-3 gap-10 cursor-pointer">
                    {listCategory.slice(7, 10).map((item, index) => (
                        <BoxCate
                            key={item.name}
                            idx={index}
                            data={item}
                            isCheckLayoutCategory={true}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default OurCategories;