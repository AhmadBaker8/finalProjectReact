import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, Slide, toast } from "react-toastify";
import styles from "./Login.module.css";
import loginPicture from "../../../assets/images/loginPicture.jpg";
import logoLogin from "../../../assets/images/logoLogin.svg";
import arrowLeft from "../../../assets/images/arrow-left.png";



export default function Login() {
  const goToHome = () =>{
    navigate("/");
  };
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const registerUser = async (value) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BURL}/auth/signin`,
        value
      );
      if (response.status == 200) {
        localStorage.setItem("userToken",response.data.token);
        toast.success("You have logged in...", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        navigate("/");
      }
    } catch (error) {
      setServerError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }

  

  };

  return (
    <>
      <div className="loginForm d-flex ">
        <div className={`col-md-6 ${styles.imageDiv}`}>
          <img className={styles.loginImage} src={loginPicture} alt="" />
          <div className={styles.contentImage}>
            <h1>Welcome again!</h1>
            <p>Access to your store with a single click</p>
          </div>
        </div>
        <div className={`col-md-6 d-flex flex-column align-items-center justify-content-center gap-5 ${styles.formDiv}`}>
          <div className="logo d-flex justify-content-center">
            <img src={logoLogin} alt="" />
          </div>
          <div className={styles.form}>
            <form className={styles.FormForm} onSubmit={handleSubmit(registerUser)}>
              <div className={styles.inputForm}>
                <input
                  id="email" placeholder="Email Address"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && <div className="text-danger">{errors.email.message}</div>}
              </div>

              <div className={styles.inputForm}>
                <input
                  id="password" placeholder="Password"
                  type="password"
                  {...register("password", { required: "Password is required" })}
                />
                {errors.password && <div className="text-danger">{errors.password.message}</div>}
              </div>

              <div className="text-end">
                <a className={styles.forgetPassword} href="">Forgot your password?</a>
              </div>

              <div className="bttn text-center py-3">
              <button className="btn btn-secondary" type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Login"}
              </button>
              </div>

              <div className={styles.haveAccount}>
                <p>Don't have an account? <Link to={'/auth/register'}>Register Now</Link></p>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.backHome} onClick={goToHome}>
          <img src={arrowLeft} alt="" />
          <a>Home</a>
        </div>
      </div>
    </>
  );
}
