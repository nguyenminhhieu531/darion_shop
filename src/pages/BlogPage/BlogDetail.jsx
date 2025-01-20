import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi'; // Import ngôn ngữ Tiếng Việt

function BlogDetail() {
    const { id } = useParams();
    const element = useRef();
    const [newBlog, setNewBlog] = useState([]);
    const [newBlogRelated, setNewBlogRelated] = useState([]);

    if (!newBlog) {
        return <></>
    }

    if (!newBlogRelated) {
        return <></>
    }

    const loadData = async () => {
        try {
            const res = await axios(`https://apiforlearning.zendvn.com/api/v2/articles/${id}`);
            if (res.status === 200) {
                setNewBlog(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const loadDataBlogRelated = async () => {
        try {
            const res = await axios(`https://apiforlearning.zendvn.com/public/api/v2/categories_news/5/articles`);
            if (res.status === 200) {
                setNewBlogRelated(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    dayjs.extend(relativeTime);
    dayjs.locale('vi'); // Thiết lập ngôn ngữ Tiếng Việt
    const relativePublishTime = dayjs(newBlog.publish_date).fromNow();

    // Loại bỏ thẻ <p> và </p>
    const cleanContent = typeof newBlog.content === "string"
    ? newBlog.content.replace(/<\/?p>/g, '')
    : "";

    useEffect(() => {
        if (id) {
            if (element) {
                element.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest",
                });
            }
            loadData();
        }
    }, [id, element]);

    useEffect(() => {
        loadData();
        loadDataBlogRelated();
    }, []);


    return (
        <main ref={element} className="container mx-auto px-4 py-8 mt-10">
            <article className="bg-white p-8 rounded shadow text-center">
                <h2 className="text-3xl font-bold mb-4">{newBlog.title}</h2>
                <div className="text-gray-600 mb-4">
                    <span>{relativePublishTime} </span> |
                    <span> {newBlog.author}</span>
                    {/* <span>{newBlog && newBlog.category.name}</span> */}
                </div>
                <img src={newBlog.thumb} alt="Fashion model on runway" className="w-full mb-4 rounded" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <p className="mb-4 content_blog">
                            {cleanContent}
                        </p>

                        <div className='flex justify-between'>
                            <div className="flex items-center space-x-4 mt-8">
                                <span className="font-bold">Tags:</span>
                                <span className="bg-gray-200 text-gray-300 px-3 py-1 rounded font-semibold">#Fashion #Beauty</span>
                            </div>
                            <div className="flex items-center space-x-4 mt-8">
                                <span className="font-bold">Share this post:</span>
                                <a href="#" className="text-gray-600 p-2"><i className="fa fa-facebook"></i></a>
                                <a href="#" className="text-gray-600 p-2"><i className="fa fa-twitter"></i></a>
                                <a href="#" className="text-gray-600 p-2"><i className="fa fa-linkedin"></i></a>
                                <a href="#" className="text-gray-600 p-2"><i className="fa fa-envelope"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
            <div className=" mt-4">
                <main className="flex flex-wrap py-8">
                    <section className="w-full lg:w-2/3 pr-4">
                        <h3 className="text-lg font-bold mb-4">Bình luận tại đây</h3>
                        <div className="w-full">
                            <form className="w-2/3">
                                <div className="mb-4">
                                    <input
                                        className="w-full p-2 border border-gray-300 rounded"
                                        placeholder="Tên của bạn..."
                                        type="text"
                                    />
                                </div>
                                <div className="mb-4">
                                    <textarea
                                        className="w-full p-2 border border-gray-300 rounded"
                                        placeholder="Nội dung bình luận..."
                                        defaultValue={""}
                                    />
                                </div>
                                <button
                                    className="bg-black-600 text-white px-4 py-2 rounded"
                                    type="submit"
                                >
                                    GỬI BÌNH LUẬN
                                </button>
                            </form>
                        </div>
                    </section>
                    <aside className="w-full lg:w-1/3 pl-4">
                        <h3 className="text-lg font-bold mb-4">BÀI VIẾT LIÊN QUAN?</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            {
                                newBlogRelated.slice(4, 10).map((item) =>
                                    <div className="text-center" key={item.id}>
                                        <img
                                            alt="A woman in a pink dress"
                                            className="w-full mb-2"
                                            height={150}
                                            src={item.thumb}
                                            width={150}
                                        />
                                        <Link to={`/blog/${item.id}`} className='font-bold'>{item.title}</Link>
                                        <p className="text-sm ">{item.description}</p>
                                    </div>)
                            }
                        </div>
                    </aside>
                </main>
            </div>
            <section className="bg-white p-8 rounded shadow mt-8">
                <h3 className="text-xl font-bold mb-4">Bình luận</h3>
                {/* Add comments here */}
            </section>
        </main>
    );
}

export default BlogDetail;