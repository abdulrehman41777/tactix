import React, { useState } from "react";
import { Container } from "react-bootstrap";
import style from "./createGroup.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";
import { NotificationAlert } from "../../Components/NotificationAlert/NotificationAlert";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import * as EmailValidator from "email-validator";
import { useCreate_RiderMutation } from "../../redux/Rider/rider";

const CreateGroups = () => {
    const [showPass, setShowPass] = useState(true);
    const [createAdminFields, setCreateAdminFields] = useState({
        email: "",
        name: "",
        password: "",
        confirmpass: "",
        group: "",
    });

    const selector = useSelector((state) => state?.userData);
    const id = selector?.data?.user?._id;
    const token = selector?.data?.token;
    const branchID = selector?.data?.user?.branchID;

    const navigate = useNavigate();

    const { email, name, password, confirmpass, group } = createAdminFields;

    const validateEmail = EmailValidator.validate(email);

    const handleFields = (e) => {
        setCreateAdminFields({
            ...createAdminFields,
            [e.target.name]: e.target.value,
        });
    };

    const [createUser, { isLoading }] = useCreate_RiderMutation();

    const handleCreateRider = async (e) => {
        e.preventDefault();
        if (email && name && password && confirmpass) {
            if (password === confirmpass) {
                if (validateEmail) {
                    try {
                        const res = await createUser({
                            id,
                            branch_id: branchID,
                            token,
                            data: {
                                email: email,
                                name: name,
                                password: password,
                            },
                        });
                        if (!res.error) {
                            NotificationAlert("Driver Created successfully", "success");
                            setCreateAdminFields({
                                email: "",
                                name: "",
                                password: "",
                                confirmpass: "",
                            });
                            navigate(-1);
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
                        NotificationAlert("Driver Already Exists With This Email");
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
        <div className={style.create_wrapper}>
            <Container className={style.login_warpper}>
                <p className={style.back} onClick={() => navigate("/dashboard/")}>
                    <IoIosArrowBack /> Back To Main
                </p>
                <div className={style.login_box_wrapper}>
                    <div className={style.login_box_inner_wrapper}>
                        <div className={style.login_box_head}>
                            <h1>Create Driver</h1>
                            <p>Create A New Driver</p>
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
                                    <h6>Driver Crew*</h6>
                                    <select>
                                        <option disabled>Select Driver Crew</option>
                                        <option>Driver Crew 1</option>
                                        <option>Driver Crew 2</option>
                                        <option>Driver Crew 3</option>
                                    </select>
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
                                    <button className={style.signin_btn}>Create Driver</button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CreateGroups;
