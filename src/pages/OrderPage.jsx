import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import clearCart from '../store/features/cartSlice';

function OrderPage() {
    // const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cartSlice.cartItems);
    console.log(cartItems);


    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        postalCode: '',
        country: 'VietNam',
        ship: false,
        store: false
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const { firstName, email, lastName, phone, address, ship, store } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;
        const newErrors = {};

        if (!firstName.trim()) {
            newErrors.firstName = "firstName không được để trống!";
        }
        if (!lastName.trim()) {
            newErrors.lastName = "lastName không được để trống!";
        }
        if (!email.trim()) {
            newErrors.email = "Email không được để trống!";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Email không hợp lệ!";
        }
        if (!phone.trim()) {
            newErrors.phone = "Số điện thoại không được để trống!";
        } else if (!phoneRegex.test(phone)) {
            newErrors.phone = "Số điện thoại phải là 10 chữ số!";
        }
        if (!address.trim()) {
            newErrors.address = "Địa chỉ không được để trống!";
        }
        if (!ship && !store) {
            newErrors.delivery = "Bạn phải chọn hình thức nhận hàng!";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Kiểm tra nếu không có lỗi
    };


    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });

        // Xóa lỗi khi checkbox thay đổi
        if (name === "ship" || name === "store") {
            setErrors((prevErrors) => {
                const updatedErrors = { ...prevErrors };
                delete updatedErrors.delivery; // Xóa lỗi liên quan đến hình thức nhận hàng
                return updatedErrors;
            });
        } else {
            setErrors({
                ...errors,
                [name]: "" // Xóa lỗi khi người dùng sửa nội dung
            });
        }

        setErrors({
            ...errors,
            [name]: "" // Xóa lỗi khi người dùng sửa nội dung
        });
    };



    const handlePayNow = async () => {
        if (!validateForm()) return;

        // Tạo nội dung email
        const emailData = {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            to_email: formData.email,
            address: formData.address,
            phone: formData.phone,
            postalCode: formData.postalCode || 'N/A',
            total: cartItems.reduce(
                (accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity,
                0
            ) + "$",
            cartItems: cartItems
                .map((item) => `- ${item.title} x${item.quantity} ($${item.price})`)
                .join('\n'),
            delivery: formData.ship ? "Ship COD" : formData.store ? "Lấy sản phẩm tại cửa hàng" : "",
        }

        try {
            await emailjs.send(
                'service_5fal3in', // ID của service email
                'template_u1sr20x', // ID của template email
                emailData,  // Dữ liệu email
                '-ukl6JeuBmXsF5uKL' // User ID của bạn trong EmailJS
            );
            toast.success('Đặt hàng thành công');
        } catch (error) {
            console.log(error);
            toast.error('Đặt hàng thất bại! Mời bạn mua hàng lại!');
        }
    };

    if (!cartItems) {
        return <></>
    }

    return (
        <main>
            <section>
                <div className="pt-16">
                    <h2 className="text-3xl font-semibold text-center">Payment Order</h2>
                    <div className="container">
                        <div className="lg:grid grid-cols-2 mt-10 gap-8">
                            <div>
                                <div className="space-y-6">
                                    <div className="w-full">
                                        <label className="font-semibold text-lg">Delivery</label>
                                        <div className="flex items-center gap-2 mt-3">
                                            <input name="ship" id="ship-check" className="cursor-pointer size-4" type="checkbox" checked={formData.ship || false} // Sử dụng giá trị từ formData
                                                onChange={handleInputChange} />
                                            <label name="ship" htmlFor="ship-check" className="text-[14px] cursor-pointer">Ship</label>
                                        </div>
                                        <div className="flex items-center gap-2 mt-3">
                                            <input name="store" id="store-check" className="cursor-pointer size-4" type="checkbox" checked={formData.store || false} // Sử dụng giá trị từ formData
                                                onChange={handleInputChange} />
                                            <label name="store" htmlFor="store-check" className="text-[14px] cursor-pointer">Pick up in store</label>
                                        </div>
                                        {errors.delivery && <p className="text-red-500 text-sm mt-1">{errors.delivery}</p>}
                                        <br />
                                        <label htmlFor="contact" className="font-semibold text-lg">Contact</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="text"
                                            className="mt-2 w-full h-[50px] border border-gray p-5 rounded-lg text-[14px]"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>

                                    <div className='w-full'>
                                        <input
                                            name="firstName"
                                            type="text"
                                            className="mt-2 w-full h-[50px] border border-gray p-5 rounded-lg text-[14px]"
                                            placeholder="First name"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                        />
                                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                                    </div>
                                    <div className='w-full'>
                                        <input
                                            name="lastName"
                                            type="text"
                                            className="mt-2 w-full h-[50px] border border-gray p-5 rounded-lg text-[14px]"
                                            placeholder="Last name"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                        />
                                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                                    </div>
                                    <input
                                        name="address"
                                        type="text"
                                        className="mt-2 w-full h-[50px] border border-gray p-5 rounded-lg text-[14px]"
                                        placeholder="Address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    />
                                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                    <div className="w-full">
                                        <input
                                            name="phone"
                                            type="text"
                                            className="mt-2 w-full h-[50px] border border-gray p-5 rounded-lg text-[14px]"
                                            placeholder="Phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                        />
                                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                    </div>
                                    <button
                                        disabled={cartItems.length === 0}
                                        onClick={handlePayNow}
                                        type="submit"
                                        className={`w-full uppercase h-[55px] bg-black text-white font-semibold text-sm px-4 flex-1 rounded-lg ${cartItems.length === 0 ? "bg-gray" : "hover:bg-white border hover:border-black hover:text-black transition-all"}`}
                                    >
                                        ORDER NOW
                                    </button>
                                    <div className="text-center">
                                        <p>Back to <Link to={"/"} className='cart_info'>Home</Link></p>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:p-10 mt-10 lg:mt-0">
                                <ul className="space-y-3">
                                    {cartItems.map((item, index) => (
                                        <li key={index} className="flex items-center gap-3" >
                                            <img className="image_cart" src={item.thumbnail} alt={item.name} />
                                            <p>{item.title}</p>
                                            <span className="ml-auto">${item.price}</span>
                                        </li>
                                    ))}
                                </ul>
                                <ul className="mt-6 space-y-4">
                                    <li className='flex items-center justify-between'>
                                        <span className="text-lg font-bold">Total:</span>
                                        <span className="text-lg font-bold">
                                            ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                                        </span>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main >
    );
}

export default OrderPage;
