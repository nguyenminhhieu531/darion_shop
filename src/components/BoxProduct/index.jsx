import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import { Grow, Rating } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/features/cartSlice';
import toast from 'react-hot-toast';
import { addProductToWishList, removeProductFromWishList } from '../../store/features/wishList';

function BoxProduct({ data }) {
    const [isLoading, setIsLoading] = useState(false);
    const isLogin = useSelector((state) => state.authenSlice.isLogin);
    const wishList = useSelector((state) => state.wishSlice.wishList);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.cartSlice.cartItems);
    const handleAddToCart = () => {
        if (isLogin) {
            dispatch(addToCart({
                ...data,
                quantity: 1,
            })
            )
            toast.success("Đã thêm vào giỏ hàng");
        } else {
            navigate("/login");
        }
    };

    const handleWishList = () => {
        console.log("Before update:", wishList); // Log trước khi cập nhật
        if (wishList.some((item) => item.id === data.id)) {
            dispatch(removeProductFromWishList(data.id)); // Xóa sản phẩm khỏi danh sách
            toast.success("Đã bỏ sản phẩm yêu thích");
        } else {
            dispatch(addProductToWishList(data)); // Thêm sản phẩm vào danh sách
            toast.success("Đã thêm sản phẩm yêu thích");
        }
        console.log("After update:", wishList); // Log sau khi cập nhật
    };

    if (cartItems) {
        localStorage.setItem('cartItemsStorage', JSON.stringify(cartItems));
    }

    useEffect(() => {
        console.log("Wish list updated:", wishList);
    }, [wishList]);


    useEffect(() => {
        if (data) {
            setTimeout(() => {
                setIsLoading(true);
            }, 1000);
        }
    }, [data])

    return isLoading ? (
        <Grow in={data} style={{ transformOrigin: '0 0 0' }} {...(data ? { timeout: 1000 } : {})}>
            <li className="mt-6 md:mt-0 text-center group relative">
                {/* <span className="absolute py-1 text-xs px-2 top-3 left-3 bg-black text-white rounded-xl">
                    Out of stock
                </span> */}
                <span className="absolute py-1 text-xs px-2 top-3 left-3 bg-red-600 text-white rounded-xl">{data.discountPercentage}%</span>
                <ul className="absolute bottom-28 left-4 z-10 flex flex-col gap-3">
                    <li className="opacity-0 translate-y-4 duration-200 group-hover:opacity-100 group-hover:translate-y-0 transition-all delay-200">
                        <button
                            onClick={handleWishList}
                            type="button"
                            className={`shadow-lg p-3 rounded-full bg-white block hover:bg-slate-200 transition-all`}
                        >
                            <img
                                src={`../assets/images/${wishList.some((item) => item.id === data.id)
                                    ? "ico_heart_red.png"
                                    : "ico_heart.png"
                                    }`}
                                className={`image size-4 rounded-full ${wishList.some((item) => item.id === data.id)
                                    ? "ico_heart_red"
                                    : ""
                                    }`}
                                alt=""
                            />
                        </button>
                    </li>
                    <Link to={`/product/${data.id}`} className="opacity-0 translate-y-4 duration-200 group-hover:opacity-100 group-hover:translate-y-0 transition-all delay-200">
                        <button
                            type="button"
                            className="shadow-lg p-3 rounded-full bg-white block hover:bg-slate-200 transition-all"
                        >
                            <img
                                src="../assets/images/ico_search.png"
                                className="image size-4 rounded-full"
                                alt=""
                            />
                        </button>
                    </Link>
                </ul>
                <Link to={`/product/${data.id}`} className="bg-red">
                    <div className="rounded-xl overflow-hidden bg-white lg:h-[385px]">
                        <img
                            className="block size-full object-cover"
                            src={data.thumbnail}
                            alt=""
                        />
                    </div>
                </Link>

                <div className="flex justify-center items-center gap-1 mt-5">
                    <Rating name="half-rating-read" defaultValue={data.rating} precision={0.5} readOnly />
                </div>
                <h3 className="text-15 mt-2">{data.title}</h3>
                <div className="mt-2 relative h-5 overflow-hidden">
                    <a href="product-detail.html" className="bg-red"></a>
                    <div className="absolute left-1/2 -translate-x-1/2 group-hover:bottom-0 -bottom-5 transition-all duration-300">
                        <a href="product-detail.html" className="bg-red">
                            <div className="flex items-center justify-center font-bold text-15 text-center">
                                {/* <span className="line-through text-lightGray">{data.price}</span> */}
                                <span className="text-red-600">${data.price}</span>
                            </div>
                        </a>
                        <button onClick={handleAddToCart}
                            className="uppercase text-xs font-medium tracking-widest relative before:absolute before:bottom-0 before:w-0 before:h-[1px] before:bg-black before:left-0 hover:before:w-full before:transition-all before:duration-500"
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            </li>
        </Grow >
    ) : (
        <li className="mt-6 md:mt-0 text-center group relative">
            <div className="rounded-xl overflow-hidden bg-white lg:h-[385px]">
                <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
            </div>
            <Skeleton />
            <Skeleton width="100%" />
        </li>
    )
}

export default BoxProduct;