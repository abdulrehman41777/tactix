import React, { useState } from "react";
import { Container } from "react-bootstrap";
import style from "./signup.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";
import { NotificationAlert } from "../../Components/NotificationAlert/NotificationAlert";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import * as EmailValidator from "email-validator";
import { useCreate_ManagerMutation } from "../../redux/Manager/manager";
import { useAll_branchesQuery, useBranchesByAdminQuery } from "../../redux/Branch/Branch";
import ResponseToast from "../../Components/toast/Toast";

const CreateManager = () => {
  const [showPass, setShowPass] = useState(true);
  const [createAdminFields, setCreateAdminFields] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
    confirmpass: "",
  });

  const selector = useSelector((state) => state?.userData);
  const id = selector?.data?.user?._id;
  const branchID = selector?.data?.user?.branchID;

  const navigate = useNavigate();

  const { email, name, phone, password, confirmpass } = createAdminFields;

  const validateEmail = EmailValidator.validate(email);

  const handleFields = (e) => {
    setCreateAdminFields({
      ...createAdminFields,
      [e.target.name]: e.target.value,
    });
  };

  const [createManager, { isLoading }] = useCreate_ManagerMutation();

  const handleCreateManagers = async (e) => {
    e.preventDefault();


    if (!email && !name && !password && !confirmpass && !phone) {
      return NotificationAlert("All Fields Required");
    }
    if (password !== confirmpass) {
      return NotificationAlert("Password Must Be Same");
    }
    if (!validateEmail) {
      return NotificationAlert("Invalid Email");
    }
    try {
      const res = await createManager({
        adminID: id,
        data: {
          branchID: branchID,
          email: email,
          phone: phone,
          name: name,
          password: password,
        },
      });

      ResponseToast({ res })

      if (!res.error) {
        setCreateAdminFields({
          email: "",
          name: "",
          password: "",
          confirmpass: "",
        });
        navigate("/dashboard/manager")
      }
    } catch (error) {
      ResponseToast({ message: "Internal Server Error", success: false })
    }
  };


  return (
    <div className={style.create_wrapper}>
      <Container className={style.login_warpper}>
        <p className={style.back} onClick={() => navigate("/dashboard/")}>
          <IoIosArrowBack /> Back To Main
        </p>
        <div className={style.login_box_wrapper}>
          <div className={style.login_box_inner_wrapper}>
            <div className={style.login_box_head}>
              <h1>Create Manager</h1>
              <p>Create A New Manager</p>
            </div>
            <div className={style.form_wrapper}>
              <form className={style.form} onSubmit={handleCreateManagers}>
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
                    placeholder="Phone number"
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
                  <button className={style.signin_btn}>Create Manager</button>
                )}
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CreateManager;
