import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { LoginForm } from "./form";
import { authActions } from "../../redux/store";

import styles from "./style.module.css";

import blogIllustration from "../../assets/login/blogIllustration.jpg";

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async (values) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/user/login`,
        {
          email: values.email,
          password: values.password,
        }
      );
      if (data.success) {
        setIsLoading(false);
        dispatch(authActions.login(data.user._id));
        navigate("/all-blogs");
      }
    } catch {
      alert("user not exist");
      setIsLoading(false);
    }
  };
  const onFormFailed = (errorInfo) => {};
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.leftInfo}>
        <div className={styles.TitleInfo}>
          <p>Log in to your account</p>
          <p>Welcome!</p>
        </div>
        <div className={styles.formWrapper}>
          <LoginForm
            onLogin={onLogin}
            isLoading={isLoading}
            onFormFailed={onFormFailed}
          />
        </div>
        <p className={styles.signupInfo}>
          Don't have an account?{" "}
          <span
            className={styles.signupLink}
            onClick={() => navigate("/register")}
          >
            Sign up here.
          </span>
        </p>
      </div>
      <div className={styles.rightInfo}>
        <img src={blogIllustration} alt="illustration" />
      </div>
    </div>
  );
}
