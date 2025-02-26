import React, { useState } from 'react';
import toast from 'react-hot-toast';
import emailjs from 'emailjs-com';

function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        content: ""
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const {name, phone, address, content} = formData;
        const phoneRegex = /^[0-9]{10}$/;
        const newErrors = {};

        if(!name.trim()){
            newErrors.name = "Họ tên không được để trống";
        }

        if(!address.trim()){
            newErrors.address = "Địa chỉ không được để trống";
        }

        if(!phone.trim()){
            newErrors.phone = "Số điện thoại không được trống"
        }else if(!phoneRegex.test(phone)){
            newErrors.phone = "Số điện thoại phải là 10 chữ số"
        }

        if(!content.trim()){
            newErrors.content = "Nội dung không được để trống";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Kiểm tra nếu không có lỗi
    }


    const handleChangeValue = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: "" // Xóa lỗi khi người dùng sửa nội dung
        });
    }
    
    const handleSendContact = async () => {
        if (!validateForm()) return;

        // Tạo nội dung email
        const emailData = {
            name: formData.name,
            address: formData.address,
            phone: formData.phone,
            content: formData.content,
        }

        try {
            await emailjs.send(
                'service_5fal3in', // ID của service email
                'template_92vf8up', // ID của template email
                emailData,  // Dữ liệu email
                '-ukl6JeuBmXsF5uKL' // User ID của bạn trong EmailJS
            );
            toast.success('Gửi thông tin thành công');
        } catch (error) {
            console.log(error);
            toast.error('Gửi thông tin thất bại');
        }
    };
    

    return (
        <>
            {/* Hello world */}
            <div className="container mx-auto px-4 mt-4">
                <main className="flex flex-wrap py-8">
                    <section className="w-full lg:w-2/3 pr-4">
                        <h3 className="text-lg font-bold mb-4">
                            Hệ thống cửa hàng DARION chính hãng
                        </h3>
                        <div className="mb-4">
                            <div className="flex items-center mb-2">
                                <i className="fas fa-map-marker-alt text-red-600 mr-2"></i>
                                <span className="font-bold">
                                    Cơ sở 1: Số 33, Hàng Bông, Hoàn Kiếm, Hà Nội
                                </span>
                            </div>
                            <div className="ml-6">
                                <p>
                                    <i className="fas fa-phone-alt text-red-600 mr-2"></i>
                                    0243.828.3930 – 097.187.3939
                                </p>
                                <p>Open: Thứ Hai – Chủ Nhật từ 8am – 21pm</p>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex items-center mb-2">
                                <i className="fas fa-map-marker-alt text-red-600 mr-2"></i>
                                <span className="font-bold">
                                    Cơ sở 2: Số 56, Lê Hồng Phong, Ba Đình, Hà Nội
                                </span>
                            </div>
                            <div className="ml-6">
                                <p>
                                    <i className="fas fa-phone-alt text-red-600 mr-2"></i>
                                    0246.292.3216
                                </p>
                                <p>Open: Thứ Hai – Chủ Nhật từ 8am – 21pm</p>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex items-center mb-2">
                                <i className="fas fa-map-marker-alt text-red-600 mr-2"></i>
                                <span className="font-bold">
                                    Cơ sở 3: Ngõ 27B, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội
                                </span>
                            </div>
                            <div className="ml-6">
                                <p>
                                    <i className="fas fa-phone-alt text-red-600 mr-2"></i>
                                    0243.632.0562
                                </p>
                                <p>Open: Thứ Hai – Chủ Nhật từ 8am – 17pm</p>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex items-center mb-2">
                                <i className="fas fa-map-marker-alt text-red-600 mr-2"></i>
                                <span className="font-bold">
                                    Cơ sở 4: Số 9, Hồ Tùng Mậu, TP. Vinh, Nghệ An
                                </span>
                            </div>
                            <div className="ml-6">
                                <p>
                                    <i className="fas fa-phone-alt text-red-600 mr-2"></i>
                                    0985.120.505
                                </p>
                                <p>Open: Thứ Hai – Chủ Nhật từ 8am – 17pm</p>
                            </div>
                        </div>
                        <h3 className="text-lg font-bold mb-4">Liên hệ với chúng tôi:</h3>
                        <div className="w-full">
                            <div className="w-2/3">
                                <div className="mb-4">
                                    <input
                                        name='name'
                                        className="w-full p-2 border border-gray-300 rounded"
                                        placeholder="Họ và tên..."
                                        type="text"
                                        onChange={handleChangeValue}
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>
                                <div className="mb-4">
                                    <input
                                        name='phone'
                                        className="w-full p-2 border border-gray-300 rounded"
                                        placeholder="Số điện thoại..."
                                        type="text"
                                        onChange={handleChangeValue}
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                </div>
                                <div className="mb-4">
                                    <input
                                        name='address'
                                        className="w-full p-2 border border-gray-300 rounded"
                                        placeholder="Địa chỉ của bạn..."
                                        type="text"
                                        onChange={handleChangeValue}
                                    />
                                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                </div>
                                <div className="mb-4">
                                    <textarea
                                        name='content'
                                        className="w-full p-2 border border-gray-300 rounded"
                                        placeholder="Nội dung liên hệ..."
                                        defaultValue={""}
                                        onChange={handleChangeValue}
                                    />
                                    {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
                                </div>
                                <button
                                    onClick={handleSendContact}
                                    className="bg-red-600 text-white px-4 py-2 rounded"
                                    type="submit"
                                >
                                    GỬI LIÊN HỆ
                                </button>
                            </div>
                        </div>
                    </section>
                    <aside className="w-full lg:w-1/3 pl-4">
                        <h3 className="text-lg font-bold mb-4">CÓ GÌ MỚI TUẦN NÀY?</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="text-center">
                                <img
                                    alt="A woman in a pink dress"
                                    className="w-full mb-2"
                                    height={150}
                                    src="https://storage.googleapis.com/a1aa/image/umoi5sGBggIqNFlCsUwHirgptfZPFwc2sfCmF2eeSO5HXVMQB.jpg"
                                    width={150}
                                />
                                <p>Đầm maxi gile cam đầm eo Hotpink</p>
                                <p className="text-red-600 font-bold">1.099.000₫</p>
                            </div>
                            <div className="text-center">
                                <img
                                    alt="A woman in a red floral dress"
                                    className="w-full mb-2"
                                    height={150}
                                    src="https://storage.googleapis.com/a1aa/image/e3veMstGUEjKC0xwnkQqQziwAeNzD6qVAYHz78vNh2xmrKGoA.jpg"
                                    width={150}
                                />
                                <p>Đầm maxi 2 dây cổ vuông Red Floral</p>
                                <p className="text-red-600 font-bold">1.399.000₫</p>
                            </div>
                            <div className="text-center">
                                <img
                                    alt="A woman in a fuschia vest"
                                    className="w-full mb-2"
                                    height={150}
                                    src="https://storage.googleapis.com/a1aa/image/freiZFqfMEFZmIKfHfFlo2V9hj2rejyRaCGxjDHd4qonaVxAF.jpg"
                                    width={150}
                                />
                                <p>Áo vest 2 túi ốp Fuschia</p>
                                <p className="text-red-600 font-bold">1.099.000₫</p>
                            </div>
                            <div className="text-center">
                                <img
                                    alt="A woman in a lime vest"
                                    className="w-full mb-2"
                                    height={150}
                                    src="https://storage.googleapis.com/a1aa/image/qQLhrVzHMGJLFlkfvDsEhnHQ3URaAmXXSU7CTPViW8XyqiBKA.jpg"
                                    width={150}
                                />
                                <p>Áo vest 2 túi ốp Lime</p>
                                <p className="text-red-600 font-bold">1.399.000₫</p>
                            </div>
                            <div className="text-center">
                                <img
                                    alt="A woman in a floral print vest"
                                    className="w-full mb-2"
                                    height={150}
                                    src="https://storage.googleapis.com/a1aa/image/eolelAQMWQlThkE057LS3aDjA0WQs7bhL6eWHgOKuljNrKGoA.jpg"
                                    width={150}
                                />
                                <p>Vest hoa cổ 2 vò túi ốp Print</p>
                                <p className="text-red-600 font-bold">1.599.000₫</p>
                            </div>
                            <div className="text-center">
                                <img
                                    alt="A woman in a black dress"
                                    className="w-full mb-2"
                                    height={150}
                                    src="https://storage.googleapis.com/a1aa/image/GwuSJvYWI4q2Il0lHH6yeLzar6e582GD6TCSnWS8TN8sVFDUA.jpg"
                                    width={150}
                                />
                                <p>Đầm gile cao cổ chân váy xòe Black</p>
                                <p className="text-red-600 font-bold">949.000₫</p>
                            </div>
                            <div className="text-center">
                                <img
                                    alt="A woman in a navy floral dress"
                                    className="w-full mb-2"
                                    height={150}
                                    src="https://storage.googleapis.com/a1aa/image/mFYecO5RBHVvMaCk94Fu1iC0aaYfW26HehIyrSJcmxBHrKGoA.jpg"
                                    width={150}
                                />
                                <p>Áo nhung hoa Navy Floral</p>
                                <p className="text-red-600 font-bold">699.000₫</p>
                            </div>
                            <div className="text-center">
                                <img
                                    alt="A woman in a plum dress"
                                    className="w-full mb-2"
                                    height={150}
                                    src="https://storage.googleapis.com/a1aa/image/Bd8xteYFwZVjTiqxlLoZeG7UYun4pYLZeXZVSPI0wQcfWVMQB.jpg"
                                    width={150}
                                />
                                <p>Áo cổ chữ B tay lỡ Plum</p>
                                <p className="text-red-600 font-bold">799.000₫</p>
                            </div>
                        </div>
                    </aside>
                </main>
            </div>
        </>
    );
}

export default ContactPage;


