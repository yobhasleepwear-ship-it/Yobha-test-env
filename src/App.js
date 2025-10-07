import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import "./App.css";
import AxiosInterceptorProvider from "./interceptors/axiosInterceptorProvider";

function App() {
  return (
    <div>
      <BrowserRouter>
       <AxiosInterceptorProvider>
        <Router />
        </AxiosInterceptorProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
