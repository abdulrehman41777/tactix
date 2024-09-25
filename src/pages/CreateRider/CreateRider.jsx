import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import style from "./signup.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router";
import { NotificationAlert } from "../../Components/NotificationAlert/NotificationAlert";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import * as EmailValidator from "email-validator";
import { useCreate_RiderMutation } from "../../redux/Rider/rider";

const CreateUser = () => {
  const [showPass, setShowPass] = useState(true);
  const [createRiderFields, setCreateRiderFields] = useState({
    email: "",
    name: "",
    password: "",
    RiderGroupId: "",
    branchID: ""
  });

  const selector = useSelector((state) => state?.userData);
  const id = selector?.data?.user?._id;
  const branchID = selector?.data?.user?.branchID;

  const navigate = useNavigate();
  const { id: riderGroupID } = useParams()

  const { email, name, password, RiderGroupId } = createRiderFields;

  // Save Data in state
  useEffect(() => {
    setCreateRiderFields((prev) => ({
      ...prev,
      branchID: branchID,
      RiderGroupId: riderGroupID
    }))
  }, [selector])

  const validateEmail = EmailValidator.validate(email);

  const handleFields = (e) => {
    setCreateRiderFields({
      ...createRiderFields,
      [e.target.name]: e.target.value,
    });
  };

  const [createRider, { isLoading }] = useCreate_RiderMutation();

  const handleCreateRider = async (e) => {
    e.preventDefault();

    if (!email && !name && !password) {
      return NotificationAlert("All Fields Required");
    }

    if (!validateEmail) {
      return NotificationAlert("Invalid Email");
    }

    try {
      const res = await createRider({
        managerID: id,
        data: createRiderFields,
      });
      if (!res.error) {
        NotificationAlert("Rider Created successfully", "success");
        setCreateRiderFields({
          email: "",
          name: "",
          password: "",
        });
        navigate(-1);
      }
    } catch (error) {
      NotificationAlert("Rider Already Exists With This Email");
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
              <h1>Create Rider</h1>
              <p>Create A New Rider</p>
            </div>
            <div className={style.form_wrapper}>
              <form className={style.form} onSubmit={handleCreateRider}>
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
                  <button className={style.signin_btn}>Create Rider</button>
                )}
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CreateUser;
