import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import HomePage from "../pages/HomePage";
import ProductListPage from "../pages/ProductList/ProductListPage";
import ProductList from "../pages/ProductList/ProductList";
import DetailProduct from "../pages/DetailProduct/DetailProduct";
import Login from "../pages/Login";
import CartPage from "../pages/CartPage";
import OrderPage from "../pages/OrderPage";
import OrderDetailPage from "../pages/OrderDetailPage";
import PrivateRoute from "../components/PrivateRouter";
import SearchPage from "../pages/SearchPage";
import BlogPage from "../pages/BlogPage/BlogPage";
import CategoryPage from "../pages/CategoryPage";
import ContactPage from "../pages/ContactPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import ProfilePage from "../pages/ProfilePage";
import BlogDetail from "../pages/BlogPage/BlogDetail";
import BlogListPage from "../pages/BlogPage/BlogListPage";
import WishListPage from "../pages/WishListPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <HomePage />,
            },
            {
                path: "product",
                element: (<ProductListPage />),
                children: [
                    {
                        path: "",
                        element: (<ProductList />)
                    },
                    {
                        path: ":id",
                        element: (<DetailProduct />)
                    }
                ]
            },
            {
                path: "blog",
                element: <BlogListPage />,
                children: [
                    {
                        path: "",
                        element: (<BlogPage />)
                    },
                    {
                        path: ":id",
                        element: (<BlogDetail />)
                    }
                ]
            },
            {
                path: "/category/:categoryName",
                element: <CategoryPage />,
            },
            {
                path: "search",
                element: <SearchPage />,
            },

            {
                path: "contact",
                element: <ContactPage />,
            },
            {
                path: "shopping-cart",
                element: <PrivateRoute></PrivateRoute>,
                children: [
                    {
                        path: "",
                        element: (<CartPage />)
                    }
                ]
            },
            {
                path: "wish-list",
                element: <WishListPage />,
            },
            {
                path: "order",
                element: <OrderPage />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <RegisterPage />,
            },
            {
                path: "change-password",
                element: <ChangePasswordPage />,
            },
            {
                path: "profile",
                element: <ProfilePage />,
            },
            {
                path: "not-found",
                element: <NotFoundPage />,
            },
            {
                path: "*",
                element: <Navigate to="/not-found" replace />,
            },
        ],
    },
]);

export default router;
