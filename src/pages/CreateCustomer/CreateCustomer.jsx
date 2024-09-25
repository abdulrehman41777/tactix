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
import { useCreateUserMutation } from "../../redux/Auth/auth";

const CreateCustomer = () => {
  const [showPass, setShowPass] = useState(true);
  const [createAdminFields, setCreateAdminFields] = useState({
    email: "",
    name: "",
    password: "",
    // confirmpass: "",
  });

  const selector = useSelector((state) => state?.userData);
  const id = selector?.data?.user?.branchID
  ;

  console.log(id)


  const [branchID, setBranchID] = useState('');

  const navigate = useNavigate();

  const { email, name, password } = createAdminFields;

  const validateEmail = EmailValidator.validate(email);

  const handleFields = (e) => {
    setCreateAdminFields({
      ...createAdminFields,
      [e.target.name]: e.target.value,
    });
  };

  // const role = selector?.data?.user?.role[0];
  // const userID = selector?.data?.user?._id;


  // const all_Branches_API = useBranchesByAdminQuery(userID, { skip: !userID });
  // const All_branches = all_Branches_API?.data?.findAdminBranches;

  // console.log(All_branches)


  // const handleChange = (e) => {
  //   setBranchID(e.target.value)
  // };

  const [createUser, { isLoading }] = useCreateUserMutation();

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    if (email && name && password) {
        if (validateEmail) {
          try {
            const res = await createUser({
              BranchId: id,
              data: {
                email: email,
                name: name,
                password: password,
              },
            });

            console.log(res.data)
            if (!res.error) {
              NotificationAlert("User Created successfully", "success");
              setCreateAdminFields({
                email: "",
                name: "",
                password: "",
              });
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
      NotificationAlert("All Fields Required");
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
              <h1>Create Customer</h1>
              <p>Create A New Customer</p>
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


                {/* <label className={style.label}>
                  <h6>Select Branch*</h6>
                  <select
                    value={branchID}
                    onChange={handleChange}
                    className="text-dark bg-light w-100"
                  >
                    <option value="" disabled className="text-dark">
                      Select Branch
                    </option>
                    {All_branches?.map((item) => (
                      <option value={item?._id} className="text-dark" key={item?._id}>
                        {item?.branch_name}
                      </option>
                    ))}
                  </select>
                </label> */}


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
                {/* <label className={style.label}>
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
                </label> */}
                {isLoading ? (
                  <button className={style.signin_btn} disabled>
                    Creating
                  </button>
                ) : (
                  <button className={style.signin_btn}>Create User</button>
                )}
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CreateCustomer;
