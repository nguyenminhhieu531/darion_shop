import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ApiService from '../service/ApiServices';

function ProfilePage() {
    const authToken = localStorage.getItem('authToken')
    const [formProfile, setFormProfile] = useState({
        name: "",
        phone: "",
        address: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await ApiService.getInfo();
            console.log(res);

            // Cập nhật `formProfile` với dữ liệu từ API
            setFormProfile({
                name: res.data.data.name || "",
                phone: res.data.data.phone || "",
                address: res.data.data.address || "",
            });
        }
        fetchData();
    }, [authToken])

    const handleUpdate = async () => {
        try {
            const res = await ApiService.updateProfile({
                name: formProfile.name,
                phone: formProfile.phone,
                address: formProfile.address
            })
            console.log(res);

            if (res.status === 200) {
                toast.success("Cập nhật thông tin thành công")
            }
            else {
                toast.error("Cập nhật thất bại")
            }
        } catch (error) {
            console.error("Lỗi:", error);
        }
    }

    return (
        <>
            <section className="">
                <div className="pt-20">
                    <h2 className="text-3xl font-semibold text-center">Information</h2>
                    <div className="container">
                        <div className="max-w-xl mx-auto">
                            <div className="mt-5">
                                <div>
                                    <input
                                        name="name"
                                        type="text"
                                        className="mt-3 w-full h-[50px] border border-gray p-5 rounded-lg text-[14px]"
                                        placeholder="Name*"
                                        value={formProfile.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <input
                                        name="phone"
                                        type="text"
                                        className="mt-3 w-full h-[50px] border border-gray p-5 rounded-lg text-[14px]"
                                        placeholder="Phone*"
                                        value={formProfile.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <input
                                        name="address"
                                        type="text"
                                        className="mt-3 w-full h-[50px] border border-gray p-5 rounded-lg text-[14px]"
                                        placeholder="Address*"
                                        value={formProfile.address}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button
                                    onClick={handleUpdate}
                                    className="w-full mt-5 mb-5 uppercase h-[50px] bg-black text-white font-semibold text-sm px-4 flex-1 rounded-lg hover:bg-white border hover:border-black hover:text-black transition-all"
                                >
                                    Update Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-12 pb-12" />
        </>
    );
}

export default ProfilePage;