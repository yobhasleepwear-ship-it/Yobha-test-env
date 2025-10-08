import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./comman/app-layout/app-layout";

// Lazy load pages
const Home = lazy(() => import("./pages/Home/home"));
const Login = lazy(()=> import("./pages/login/login"))
const Router = () => {
  const routes = [
    { path: "/", element: <Navigate to="/home" replace /> },
    { path: "/home", element: <Home /> },
    {path:'/login',element:<Login/>}
  ];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map(({ path, element }, index) => (
          <Route
            key={index}
            path={path}
            element={<AppLayout>{element}</AppLayout>}
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default Router;
