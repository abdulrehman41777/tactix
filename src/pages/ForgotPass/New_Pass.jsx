import React, { useState } from "react";
import { Container } from "react-bootstrap";
import style from "./forgotpass.module.css";
import { FcLock } from "react-icons/fc";
import { useNavigate } from "react-router";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import ResponseToast from "../../Components/toast/Toast";

const New_Pass = () => {
  const [showPass, setShowPass] = useState(true);
  const [loginFields, setLoginFields] = useState({
    password: "",
    confirm_password: "",
  });
  const navigate = useNavigate();

  const { password, confirm_password } = loginFields;

  const handleLoginFields = (e) => {
    setLoginFields({ ...loginFields, [e.target.name]: e.target.value });
  };

  const handleNewPass = (e) => {
    e.preventDefault();
    try {
      navigate("/dashboard/login");
    } catch (error) {
      ResponseToast({ message: "Internal Server Error", success: false });
    }
  };

  const isLoading = "";
  return (
    <div className={style.login_wrapper_bg}>
      <Container className={style.login_warpper}>
        <div className={style.login_box_wrapper}>
          <div className={style.login_box_inner_wrapper}>
            <div className={style.login_box_head}>
              <FcLock className={style.icon} />
              <h3>Reset Password</h3>
              <p className="text-center">
                Enter new password and then repeat it
              </p>
            </div>

            <div className={style.form_wrapper}>
              <form className={style.form} onSubmit={handleNewPass}>
                <label className={style.label}>
                  <h6>Password*</h6>
                  <div className={style.password_fields}>
                    <input
                      type={showPass ? "password" : "text"}
                      placeholder="Password"
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
                <label className={style.label}>
                  <h6>Confirm Password*</h6>
                  <div className={style.password_fields}>
                    <input
                      type={showPass ? "password" : "text"}
                      placeholder="Confirm Password"
                      name="confirm_password"
                      value={confirm_password}
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

                {isLoading ? (
                  <button className={style.signin_btn} disabled>
                    Submitting...
                  </button>
                ) : (
                  <button className={style.signin_btn}>Submit</button>
                )}
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default New_Pass;
