import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./comman/app-layout/app-layout";

// Lazy load pages
const Home = lazy(() => import("./pages/Home/home"));
const Login = lazy(() => import("./pages/login/login"))
const ProductsPage = lazy(() => import("./pages/product/product"));
const ProductDescription = lazy(()=>import("./pages/product-description/product-description"))
const Router = () => {
  const routes = [
    { path: "/", element: <Navigate to="/home" replace /> },
    { path: "/home", element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: "/products/:category?", element: <ProductsPage /> },
    {path:"/productDetail/:id?",element:<ProductDescription/>}
  ];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map(({ path, element }, index) => (
          <Route
            key={index}
            path={path}
            element={path === "/login" ? element : <AppLayout>{element}</AppLayout>}
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default Router;
