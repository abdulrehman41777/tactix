import React, { useState } from "react";
import { Container } from "react-bootstrap";
import style from "./login.module.css";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import { useLoginMutation } from "../../redux/Auth/auth";
import { NotificationAlert } from "../../Components/NotificationAlert/NotificationAlert";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { authUser } from "../../redux/features/authState";
import * as EmailValidator from "email-validator";
import { BiLogoGmail } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import ResponseToast from "../../Components/toast/Toast";

const Login = () => {
  const [showPass, setShowPass] = useState(true);
  const [loginFields, setLoginFields] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, password } = loginFields;

  const handleLoginFields = (e) => {
    setLoginFields({ ...loginFields, [e.target.name]: e.target.value });
  };

  const [login, { isLoading }] = useLoginMutation();
  const validateEmail = EmailValidator.validate(email);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(loginFields);

      ResponseToast({ res })

      if (!res.error) {
        dispatch(authUser(res?.data));
        navigate("/dashboard/main");
        setLoginFields({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
      ResponseToast({ message: "Internal Server Error", success: false })
    }
  };

  return (
    <div className={style.login_wrapper_bg}>
      <Container className={style.login_warpper}>
        <p
          role="button"
          className={style.home_btn}
          onClick={() => navigate("/")}
        >
          <IoIosArrowBack /> Home
        </p>
        <div className={style.login_box_wrapper}>
          <div className={style.login_box_inner_wrapper}>
            <div className={style.login_box_head}>
              <h1>Sign in</h1>
              <p>Enter your email and password to sign in!</p>
            </div>
            <div className={style.form_wrapper}>
              <form className={style.form} onSubmit={handleLogin} method="POST">
                <div className="d-flex flex-column gap-3">
                  <label className={style.label}>
                    <h6>Email*</h6>
                    <div className={style.password_fields}>
                      <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={handleLoginFields}
                        className={style.password_input}
                      />
                      <BiLogoGmail />
                    </div>
                  </label>

                  <label className={style.label}>
                    <h6>Password*</h6>
                    <div className={style.password_fields}>
                      <input
                        type={showPass ? "password" : "text"}
                        placeholder="Min. 8 Characters"
                        name="password"
                        value={password}
                        onChange={handleLoginFields}
                        className={style.password_input}
                      />
                      {showPass ? (
                        <AiFillEyeInvisible
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowPass(false)}
                        />
                      ) : (
                        <AiFillEye
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowPass(true)}
                        />
                      )}
                    </div>
                  </label>
                </div>
                {isLoading ? (
                  <button className={style.signin_btn} disabled>
                    Signing In...
                  </button>
                ) : (
                  <button className={style.signin_btn}>Sign In</button>
                )}
              </form>


            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
