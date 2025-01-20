import { Grow, Pagination, Skeleton } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function BlogPage(props) {
    const [newBlog, setNewBlog] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const limit = 10; // Số sản phẩm mỗi trang

    if (!newBlog) {
        return <></>
    }

    const loadData = async () => {
        try {
            const res = await axios(`https://apiforlearning.zendvn.com/public/api/v2/categories_news/5/articles?limit=${limit}&page=${page}`);
            console.log(res);
            if (res.status === 200) {
                setNewBlog(res.data.data);
                setTotalPages(Math.ceil(res.data.meta.total / limit)); // Tổng số trang
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        loadData();
    }, [page]);


    return newBlog.length > 0 ? (
        <Grow in={newBlog} style={{ transformOrigin: '0 0 0' }} {...(newBlog ? { timeout: 1000 } : {})}>
            <main>
                <section className="relative">
                </section>
                <section className="pt-12 pb-12">
                    <div className="container">
                        <div className="lg:grid grid-cols-5">
                            <div className="col-span-1 p-0 lg:p-4">
                                <div className="">
                                    <h2 className="text-lg font-semibold font-semibold-blog">Tin tức mới nhất</h2>
                                    <ul className="space-y-3">
                                        {
                                            newBlog.slice(4, 10).map((item) => (
                                                <li key={item.id}>
                                                    <Link to={`/blog/${item.id}`} className="bg-red new_blog">
                                                        <div className="rounded-xl overflow-hidden bg-white">
                                                            <img
                                                                className="block img-blog size-full object-cover"
                                                                src={item.thumb}
                                                                alt={item.title}
                                                            />
                                                        </div>
                                                        <div>
                                                            <h2 className="text-10 mt-2 title_blog">{item.title}</h2>
                                                        </div>
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="col-span-4 mt-6 lg:mt-0">
                                <ul className="lg:grid grid-cols-3 gap-5 mt-9 space-y-3 lg:space-y-0 ">
                                    {
                                        newBlog.slice(0, 9).map((item) => (
                                            <li className="mt-6 md:mt-0 group relative mb-10" key={item.id}>
                                                <Link to={`/blog/${item.id}`} className="bg-red">
                                                    <div className="rounded-xl overflow-hidden bg-white">
                                                        <img
                                                            className="block size-full object-cover"
                                                            src={item.thumb}
                                                            alt={item.title}
                                                        />
                                                    </div>
                                                    <h2 className="text-15 mt-2 blog_title">{item.title}</h2>
                                                </Link>
                                                <div className="">
                                                    <Link to={`/blog/${item.id}`} className="bg-red">
                                                        <span className="blog_title_span">{item.description}</span>
                                                    </Link>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>

                                <div className="mt-pagination flex justify-center">
                                    <Pagination
                                        count={totalPages} // Tổng số trang
                                        page={page} // Trang hiện tại
                                        onChange={(e, value) => {
                                            console.log(e)
                                            setPage(value)
                                            console.log(page)
                                        }}

                                        variant="outlined" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Grow>
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

export default BlogPage;