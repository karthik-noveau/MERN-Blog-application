import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { Header } from "./components/header";
import { UserBlogs } from "./pages/blogs/user.blogs";
import { AllBlogs } from "./pages/blogs/all.blogs";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { CreateBlog } from "./pages/create_blog";
import { UpdateBlog } from "./pages/update_blog";

import "./constant.css";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  let isAuthenticated = localStorage.getItem("blog-accountDetails");
  let isAuthRoute = ["/login", "/register"].includes(location?.pathname);

  useEffect(() => {
    if (isAuthRoute) {
      !isAuthenticated && navigate("/login");
    }
    if (location.pathname === "/") {
      navigate("/all-blogs");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isAuthRoute]);

  return (
    <React.Fragment>
      {!isAuthRoute && <Header />}
      <Routes>
        <Route path="/all-blogs" element={<AllBlogs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-blogs" element={<UserBlogs />} />
        <Route path="/blog-details/:id" element={<UpdateBlog />} />
        <Route path="/create-blog" element={<CreateBlog />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
