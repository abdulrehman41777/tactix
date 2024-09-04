import React, { useState } from "react";
import { Container } from "react-bootstrap";
import style from "./forgotpass.module.css";
import { useNavigate } from "react-router";
import { RiErrorWarningLine } from "react-icons/ri";
import { BiLogoGmail } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";

const Forgot_Pass = () => {
  const [loginFields, setLoginFields] = useState({
    email: "",
  });
  const navigate = useNavigate();

  const { email } = loginFields;

  const handleLoginFields = (e) => {
    setLoginFields({ ...loginFields, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // if (validateEmail) {
    //   try {

    //   } catch (error) {}
    // } else {
    //   NotificationAlert("Invalid email");
    // }
    navigate("/dashboard/new-password");
  };
  const isLoading = "";

  return (
    <div className={style.login_wrapper_bg}>
      <Container className={style.login_warpper}>
        <div className={style.login_box_wrapper}>
          <div className={style.login_box_inner_wrapper}>
            <div className={style.login_box_head}>
              <RiErrorWarningLine className={style.icon} />
              <h3>Forget Password</h3>
              <p className="text-center">
                Enter your email and we'll send you a link to reset your
                password
              </p>
            </div>

            <div className={style.form_wrapper}>
              <form className={style.form} onSubmit={handleLogin} method="POST">
                <label className={style.label}>
                  <h6>Email*</h6>
                  <div className={style.password_fields}>
                    <input
                      type="text"
                      placeholder="Enter Your Email"
                      name="email"
                      value={email}
                      onChange={handleLoginFields}
                      className={style.password_input}
                    />
                    <BiLogoGmail />
                  </div>
                </label>

                {isLoading ? (
                  <button className={style.signin_btn} disabled>
                    Submitting...
                  </button>
                ) : (
                  <button className={style.signin_btn}>Submit</button>
                )}
              </form>

              <div className={style.not_sign_in}>
                <p onClick={() => navigate("/dashboard/login")} role="button">
                  <IoIosArrowBack /> Back to login
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Forgot_Pass;
