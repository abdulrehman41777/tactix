import React, { useState } from "react";
import { Container } from "react-bootstrap";
import style from "./signup.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { NotificationAlert } from "../../Components/NotificationAlert/NotificationAlert";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import * as EmailValidator from "email-validator";
import { useCreate_AdminMutation } from "../../redux/Admin/admin";
import ResponseToast from "../../Components/toast/Toast";

const CreateAdmin = () => {
  const [showPass, setShowPass] = useState(true);
  const [createAdminFields, setCreateAdminFields] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
    confirmpass: "",
  });


  const selector = useSelector((state) => state?.userData);
  const userID = selector?.data?.user?._id;

  const navigate = useNavigate();

  const { email, name, phone, password, confirmpass } = createAdminFields;

  const validateEmail = EmailValidator.validate(email);

  const handleFields = (e) => {
    setCreateAdminFields({
      ...createAdminFields,
      [e.target.name]: e.target.value,
    });
  };

  const [createAdmin, { isLoading }] = useCreate_AdminMutation();

  const handleCreateAdmin = async (e) => {
    e.preventDefault();


    if (!email && !name && !password && !confirmpass && !phone) {
      return NotificationAlert("All Fields Required");
    }
    if (!validateEmail) {
      return NotificationAlert("Invalid Email");
    }
    if (password !== confirmpass) {
      return NotificationAlert("Password Must Be Same");
    }
    try {
      const res = await createAdmin({
        superAdminID: userID,
        data: {
          email: email,
          name: name,
          phone: phone,
          password: password,
        },
      });
      ResponseToast({ res })
      if (!res.error) {
        setCreateAdminFields({
          email: "",
          name: "",
          phone: "",
          password: "",
          confirmpass: "",
        });
        navigate('/dashboard/admin');
      }
    } catch (error) {
      ResponseToast({ message: "Internal Server Error", success: false })
    }
  };
  return (
    <div className={style.create_wrapper}>
      <Container className={style.login_warpper}>
        <p className={style.back} onClick={() => navigate(-1)}>
          <IoIosArrowBack /> Back To Main
        </p>
        <div className={style.login_box_wrapper}>
          <div className={style.login_box_inner_wrapper}>
            <div className={style.login_box_head}>
              <h1>Create Admin</h1>
              <p>Create A New Admin</p>
            </div>
            <div className={style.form_wrapper}>
              <form className={style.form} onSubmit={handleCreateAdmin}>
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
                  <h6>Phone*</h6>
                  <input
                    type="number"
                    placeholder="Phone Number"
                    name="phone"
                    value={phone}
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
                        className={style.icon}
                      />
                    ) : (
                      <AiFillEye
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPass(true)}
                        className={style.icon}
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
                      name="confirmpass"
                      value={confirmpass}
                      onChange={handleFields}
                      className={style.password_input}
                    />
                    {showPass ? (
                      <AiFillEyeInvisible
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPass(false)}
                        className={style.icon}
                      />
                    ) : (
                      <AiFillEye
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPass(true)}
                        className={style.icon}
                      />
                    )}
                  </div>
                </label>
                {isLoading ? (
                  <button className={style.signin_btn} disabled>
                    Creating
                  </button>
                ) : (
                  <button className={style.signin_btn}>Create Admin</button>
                )}
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CreateAdmin;
