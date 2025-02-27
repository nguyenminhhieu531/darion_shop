import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, deleteToCart, reduceToCart } from '../store/features/cartSlice';

function CartPage() {
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cartSlice.cartItems);
    // console.log(cartItems);
    if (!cartItems) {
        return <></>
    }


    const handleAddToCart = (item) => {
        dispatch(addToCart(item));
    }

    const handleReduceFormCart = (item) => {
        dispatch(reduceToCart(item))
    };

    const handleDeleteCart = (id) => {
        dispatch(deleteToCart(id))
    };



    return (
        cartItems.length > 0 ? <>
            <section className="">
                <div className="pt-20">
                    <h2 className="text-3xl font-semibold text-center">Shopping Cart</h2>
                    <div className="container">
                        <div className="grid grid-cols-6 md:grid-cols-12 mt-10 gap-8">
                            <div className="col-span-4">
                                <div className=" rounded-lg">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>
                                                    Product
                                                </th>
                                                <th>
                                                    Quantity
                                                </th>
                                                <th>
                                                    Total
                                                </th>
                                                <th>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cartItems.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>
                                                            <div className="p-5 w-2/4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-32 overflow-hidden">
                                                                        <img className="image" src={item.thumbnail} alt="" />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs uppercase">{item.title}</p>
                                                                        <span className="text-xs">${item.price}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className='button-quantity'>
                                                                <button onClick={() => handleReduceFormCart(item)} type="button" className='btn-reduce'>
                                                                    <span>-</span>
                                                                </button>
                                                                <div>
                                                                    {item.quantity}
                                                                </div>
                                                                <button onClick={() => handleAddToCart(item)} type="button" className='btn-increment'>
                                                                    <span >+</span>
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className='price'>${item.price * item.quantity}</div>
                                                        </td>
                                                        <td>
                                                            <button onClick={() => handleDeleteCart(item.id)} type="button"><img className="block size-5" src="../assets/images/ico_trash.png" alt="" /></button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>


                                </div>
                                <div className="mt-9">
                                    <p className="text-md">Special instructions for seller</p>
                                    <textarea
                                        name=""
                                        id=""
                                        placeholder="how can we help you?"
                                        className="text-md mt-3 border border-gray p-5 w-full"
                                        rows={5}
                                        defaultValue={""}
                                    />
                                </div>
                            </div>
                            <div className="col-span-2">
                                <div className="p-7 bg-[#f7f4ef] rounded-lg">
                                    <h3 className="uppercase font-medium text-sm">
                                        FREE SHIPPING ON ORDERS $100.00
                                    </h3>
                                    <p className="text-sm mt-2">
                                        Congratulations , you've got free shipping!
                                    </p>
                                    <p className="bg-[#14c100] w-full h-1 mt-5" />
                                </div>
                                <div className="p-6 mt-4 bg-[#f6f6f6] rounded-lg">
                                    <span>Coupon</span>
                                    <p className="mt-2 mb-6 text-md text-lightGray">
                                        * Discount will be calculated and applied at checkout
                                    </p>
                                    <input
                                        type="text"
                                        className="h-10 px-6 text-sm border border-gray rounded-md w-full"
                                        placeholder="Coupon code"
                                    />
                                    <p className="mt-6 font-semibold">Total: ${
                                        cartItems.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), 0)
                                    }</p>
                                    <Link to={"/order"}
                                        className="flex items-center justify-center h-[50px] mt-6 bg-black w-full text-white font-semibold text-sm px-4 flex-1 rounded-full hover:bg hover:bg-white border hover:border-black hover:text-black transition-all"
                                    >
                                        Check out
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-12 pb-12" />
        </> :
            <>
                <div className="text-center mt-5">
                    <h1 className="text-xl font-semibold mb-4">Bạn chưa chọn sản phẩm.</h1>
                    <div className="flex justify-center mb-4">
                        <img src="../assets/images/cart.png" alt="Sad shopping bag with a tear drop" className="w-40 h-40" />
                    </div>
                    <p className="text-gray-500 mb-5">Hãy nhanh tay chọn ngay sản phẩm yêu thích.</p>
                    <br></br>
                    <div className="contant_box_404">
                        <Link to={"/"} className="link_404">
                            Buy Now
                        </Link>
                    </div>
                </div>
            </>
    );
}

export default CartPage;
