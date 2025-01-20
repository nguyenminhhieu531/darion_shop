import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ApiService from '../../service/ApiServices';
import { Grow, Rating } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import BoxProduct from '../../components/BoxProduct';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, reduceToCart } from '../../store/features/cartSlice';
import toast from 'react-hot-toast';

function DetailProduct(props) {
    const { id } = useParams();
    const element = useRef();
    const [dataDetail, setDataDetail] = useState("");
    const [dataProductByCate, setDataProductByCate] = useState();
    const [activeTab, setActiveTab] = useState("Description");

    const cartItems = useSelector((state) => state.cartSlice.cartItems);
    if (!cartItems) {
        return <></>
    }

    const isLogin = useSelector((state) => state.authenSlice.isLogin);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleAddToCart = () => {
        if (isLogin) {
            dispatch(addToCart({
                ...dataDetail,
                quantity: 1,
            })
            );
            toast.success("Đã thêm vào giỏ hàng");
        } else {
            navigate("/login");
        }
    };

    // Chi tiết sản phẩm
    const fetchDataDetail = async () => {
        const res = await ApiService.GetDetailProduct(id);
        if (res.status === 200) {
            setDataDetail(res.data);
        }
    }

    // Sản phẩm liên quan
    const fetchDataByCategory = async () => {
        if (dataDetail) {
            const res = await ApiService.GetProductsByCategory(dataDetail.category);
            if (res.status === 200) {
                setDataProductByCate(res.data.products)
            }
        }
    }

    // Trạng thái thumbnail, mặc định là `dataDetail.thumbnail` hoặc giá trị thay thế
    const [thumbnail, setThumbnail] = useState(dataDetail.thumbnail || "");

    // Hàm xử lý thay đổi thumbnail
    const changeThumbnail = (newImage) => {
        setThumbnail(newImage); // Cập nhật hình ảnh thumbnail mới
    };

    useEffect(() => {
        if (id) {
            if (element) {
                element.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest",
                });
            }
            fetchDataDetail();
        }
    }, [id, element]);

    useEffect(() => {
        fetchDataByCategory();
        if (dataDetail.thumbnail) {
            setThumbnail(dataDetail.thumbnail);
        }
    }, [dataDetail, dataDetail.thumbnail])


    return (
        <>
            <div ref={element}></div>
            {
                dataDetail && dataProductByCate ? (
                    <div className="container">
                        <ul className="flex gap-2 items-center py-4">
                            <li>
                                <Link to={"/"} className="text-sm"><i className="icon fa fa-home" /> /</Link>
                            </li>
                            <li>
                                <span className="text-sm">Product /</span>
                            </li>
                            <li>
                                <span className="text-sm">{dataDetail.title}</span>
                            </li>
                        </ul>
                        <div className="lg:grid grid-cols-5 gap-7 mt-4">
                            <Grow in={dataDetail} style={{ transformOrigin: '0 0 0' }} {...(dataDetail ? { timeout: 1000 } : {})}>
                                <div className="col-span-3 flex gap-3">
                                    {/* Danh sách hình ảnh nhỏ */}
                                    <ul className="flex flex-col gap-4">
                                        {dataDetail.images.map((item) => (
                                            <li
                                                key={item}
                                                className="w-[82px] cursor-pointer p-[10px] rounded-md border border-black hover:border-gray-500 transition-all"
                                                onClick={() => changeThumbnail(item)} // Gắn sự kiện khi click
                                            >
                                                <img className="image" src={item} alt="Option" />
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Hình ảnh thumbnail */}
                                    <div className="overflow-hidden">
                                        <div className="rounded-xl overflow-hidden">
                                            <img
                                                id="thumbnail"
                                                src={thumbnail} // Thay đổi hình ảnh dựa trên state
                                                className="image"
                                                alt="Thumbnail"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Grow>
                            <div className="col-span-2 mt-6">
                                <h2 className="text-xl lg:text-3xl font-semibold">
                                    {dataDetail.title}
                                </h2>
                                <ul className="flex items-center gap-1 mt-4">
                                    <Rating name="half-rating-read" defaultValue={dataDetail.rating} precision={0.5} readOnly />

                                </ul>
                                <p className="mt-3 text-xl font-semibold">${dataDetail.price}</p>
                                <div className="mt-2 pt-2 border-t border-gray">
                                    <p className="flex items-center gap-2 mt-2">
                                        <img
                                            className="w-5 block animate-flicker"
                                            src="../assets/images/ico_eye.png"
                                            alt=""
                                        />
                                        <span className="font-medium text-sm">
                                            35 people are viewing this right now
                                        </span>
                                    </p>
                                    <p className="flex items-center gap-2 mt-4">
                                        <img
                                            className="w-5 block animate-zoomInOut"
                                            src="../assets/images/ico_fire.png"
                                            alt=""
                                        />
                                        <span className="text-red-600 font-medium text-sm">
                                            35 sold in last 18 hours
                                        </span>
                                    </p>
                                    <p className="flex items-center gap-2 mt-6">
                                        <img className="w-5 block" src="../assets/images/ico_checked.png" alt="" />{" "}
                                        <span className="text-green font-medium text-sm">In stock</span>
                                    </p>
                                    <p className="mt-5 text-midGray">
                                        {dataDetail.description}
                                    </p>
                                    <div className="mt-6 flex items-center gap-3">

                                        <button onClick={handleAddToCart}
                                            type="button"
                                            className="h-[50px] bg-black text-white font-semibold text-sm px-4 flex-1 rounded-full hover:bg hover:bg-white border hover:border-black hover:text-black transition-all"
                                        >
                                            Add To Carts
                                        </button>
                                        <button
                                            type="button"
                                            className="p-4 bg-white border border-[#e6e6e6] rounded-full"
                                        >
                                            <img className="w-4" src="../assets/images/ico_heart.png" alt="" />
                                        </button>
                                    </div>
                                    <ul className="flex items-center gap-4 mt-6">
                                        <li>
                                            <button
                                                type="button"
                                                className="flex items-center gap-4 text-sm font-medium"
                                            >
                                                <img className="w-4" src="../assets/images/ico_reload.png" alt="" />
                                                Compare
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                type="button"
                                                className="flex items-center gap-4 text-sm font-medium"
                                            >
                                                <img className="w-4" src="../assets/images/ico_question.png" alt="" />
                                                Question
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                type="button"
                                                className="flex items-center gap-4 text-sm font-medium"
                                            >
                                                <img className="w-4" src="../assets/images/ico_shipping.png" alt="" />
                                                Shipping info
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                type="button"
                                                className="flex items-center gap-4 text-sm font-medium"
                                            >
                                                <img className="w-4" src="../assets/images/ico_share.png" alt="" />
                                                Share
                                            </button>
                                        </li>
                                    </ul>
                                    <div className="flex items-center mt-6 mb-6 pt-6 pb-6 border-t border-b border-b-gray border-t-gray">
                                        <div>
                                            <img
                                                className="block w-9"
                                                src="../assets/images/ico_shipping2.png"
                                                alt=""
                                            />
                                        </div>
                                        <p className="flex-1 ml-4 pl-4 border-l border-l-[#d9d9d9] text-sm">
                                            Order in the next 22 hours 45 minutes to get it between <br />
                                            <span className="font-semibold underline">
                                                Tuesday, Oct 22{" "}
                                            </span>{" "}
                                            <span className="mx-2">and</span>
                                            <span className="font-semibold underline"> Saturday, Oct 26</span>
                                        </p>
                                    </div>
                                    <div className="p-[15px] rounded-xl border border-[#dedede] flex items-start gap-3">
                                        <div>
                                            <img src="../assets/images/ico_check.png" className="w-6 block" alt="" />
                                        </div>
                                        <div className="text-sm">
                                            <p className="text-lightGray">
                                                Pickup available at{" "}
                                                <span className="font-semibold text-black"> Akaze store</span>
                                            </p>
                                            <p className="text-xs text-lightGray mt-1">
                                                Usually ready in 24 hours
                                            </p>
                                            <button type="button" className="underline text-xs mt-4">
                                                View store information
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-center mt-6 p-6 bg-[#f6f6f6] rounded-lg">
                                        <p className="text-sm tracking-widest">Guaranteed Checkout</p>
                                        <img className="block mt-3" src="../assets/images/img_payment.avif" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-9 lg:mt-24 text-center">
                            {/* Menu tabs */}
                            <ul className="flex items-center lg:justify-center gap-6">
                                {["Description", "Review", "Shipping", "Return"].map((tab) => (
                                    <li key={tab}>
                                        <button
                                            type="button"
                                            className={`text-lg font-semibold py-2 px-4 rounded-full transition-all ${activeTab === tab
                                                ? "bg-black text-white"
                                                : "text-[#8a8a8a] hover:text-black"
                                                }`}
                                            onClick={() => setActiveTab(tab)}
                                        >
                                            {tab}
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            {/* Nội dung */}
                            <div className="mt-9 lg:mt-20">
                                {activeTab === "Description" && (
                                    <>
                                        <p className="text-[#8a8a8a] leading-7">
                                            Get a fresh fit for spring with the Free People Love Letter Ivory Floral Jacquard Cropped Cami Top!
                                        </p>
                                        <p className="mt-9 text-[#8a8a8a] leading-7">
                                            This top is perfect for casual outings or even dressed-up occasions.
                                        </p>
                                    </>
                                )}
                                {activeTab === "Review" && (
                                    <p className="text-[#8a8a8a] leading-7">
                                        Customers have rated this product highly for its design and comfort.
                                    </p>
                                )}
                                {activeTab === "Shipping" && (
                                    <p className="text-[#8a8a8a] leading-7">
                                        Free shipping is available for orders over $50. Standard delivery takes 3-5 business days.
                                    </p>
                                )}
                                {activeTab === "Return" && (
                                    <p className="text-[#8a8a8a] leading-7">
                                        We accept returns within 30 days of purchase. Ensure items are in their original condition.
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mt-24 mb-24">
                            <h2 className="text-center text-lg lg:text-3xl font-semibold">
                                Sản phẩm liên quan
                            </h2>
                            <ul className="mt-6 grid grid-cols-2 gap-10 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                {
                                    dataProductByCate.map((item) => <BoxProduct key={item.id} data={item} />)
                                }
                            </ul>
                        </div>
                    </div>
                ) : (
                    <Backdrop
                        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                        open={!dataDetail}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                )
            }
        </>

    );
}

export default DetailProduct;