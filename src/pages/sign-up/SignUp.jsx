import React, { useState } from "react";
import { Container } from "react-bootstrap";
import style from "./signup.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import * as EmailValidator from "email-validator";
import { useSignupMutation } from "../../redux/Auth/auth";
import { NotificationAlert } from "../../Components/NotificationAlert/NotificationAlert";

const SignUp = () => {
  const [showPass, setShowPass] = useState(true);

  const navigate = useNavigate();
  const [signupFields, setSignupFields] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const { name, email, password, confirmPass } = signupFields;

  const handleFields = (e) => {
    setSignupFields({ ...signupFields, [e.target.name]: e.target.value });
  };

  const validateEmail = EmailValidator.validate(email);

  const [signUp, { isLoading }] = useSignupMutation();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (email && name && password && confirmPass) {
      if (password === confirmPass) {
        if (validateEmail) {
          try {
            const res = await signUp({
              email,
              name,
              password,
            });
            if (!res.error) {
              NotificationAlert("Account Created successfully", "success");
              setSignupFields({
                name: "",
                email: "",
                password: "",
                confirmPass: "",
              });
              navigate("/dashboard/login");
            } else if (
              res.error.data.errors.find((err) => err.path === "name")
            ) {
              NotificationAlert("Name must be at least 5 characters");
            } else if (
              res.error.data.errors.find((err) => err.path === "password")
            ) {
              NotificationAlert("Password Must Contain Atleast 8 Chars");
            }
          } catch (error) {
            NotificationAlert("User Already Exists With This Email");
          }
        } else {
          NotificationAlert("Invalid Email");
        }
      } else {
        NotificationAlert("Password Must Be Same");
      }
    } else {
      NotificationAlert("All Fields Required");
    }
  };

  return (
    <div className={style.signup_wrapper_bg}>
      <Container className={style.login_warpper}>
        <p className={style.back} onClick={() => navigate("/dashboard/login")}>
          <IoIosArrowBack /> Back To Main
        </p>
        <div className={style.login_box_wrapper}>
          <div className={style.login_box_inner_wrapper}>
            <div className={style.login_box_head}>
              <h1>Sign up</h1>
              <p>Create A Free Account</p>
            </div>
            <div className={style.form_wrapper}>
              <form className={style.form} onSubmit={handleSignup}>
                <label className={style.label}>
                  <h6>Name*</h6>
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={handleFields}
                  />
                </label>
                <label className={style.label}>
                  <h6>Email*</h6>
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleFields}
                  />
                </label>
                <label className={style.label}>
                  <h6>Password*</h6>
                  <div className={style.password_fields}>
                    <input
                      type={showPass ? "password" : "text"}
                      placeholder="Min. 8 Characters"
                      name="password"
                      value={password}
                      onChange={handleFields}
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
                <label className={style.label}>
                  <h6>Confirm Password*</h6>
                  <div className={style.password_fields}>
                    <input
                      type={showPass ? "password" : "text"}
                      placeholder="Min. 8 Characters"
                      name="confirmPass"
                      value={confirmPass}
                      onChange={handleFields}
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
                {isLoading ? (
                  <button className={style.signin_btn} disabled>
                    Creating...
                  </button>
                ) : (
                  <button className={style.signin_btn}>Sign Up</button>
                )}
              </form>
              <div className={style.not_sign_in}>
                <p>Already Have Account?</p>
                <p onClick={() => navigate("/dashboard/login")}>Log In</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SignUp;
