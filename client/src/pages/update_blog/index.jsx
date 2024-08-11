import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { UpdateBlogForm } from "./form";
import { Loader } from "../../components/Loader/Loader";

import styles from "./style.module.css";

export const UpdateBlog = () => {
  const navigate = useNavigate();
  const { loginInfo } = useSelector((state) => ({
    loginInfo: state.auth.loginInfo,
  }));
  const blogId = useParams().id;
  const [blogData, setBlogData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getBlogData();
  }, []);

  const getBlogData = async () => {
    setIsFetching(true);
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/blog/get-blog/${blogId}`
    );
    if (data.success) {
      setIsFetching(false);
      setBlogData(data.blog);
    }
  };

  const onBlogUpdate = async (values) => {
    setIsLoading(true);
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/blog/update-blog`,
        {
          userId: loginInfo.id,
          blogId: blogId,
          title: values.title,
          description: values.description,
          image: values.image,
        }
      );
      if (data.success) {
        setIsLoading(false);
        navigate("/user-blogs");
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const onFormFailed = (errorInfo) => {};

  return (
    <React.Fragment>
      {isFetching ? (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      ) : (
        <div className={styles.createBlogContainer}>
          <p className={styles.title}>Update a Blog</p>
          <div className={styles.formWrapper}>
            <UpdateBlogForm
              onFormFailed={onFormFailed}
              onFormUpdate={onBlogUpdate}
              blogData={blogData}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
