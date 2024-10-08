import React from "react";
import Dlayout from "../../Components/DLayout/Dlayout";
import style from "./profile.module.css";
import profile_bg from "../../assets/profile/profile_bg.png";
import avatar from "../../assets/profile/avatar.png";
import { RiLockPasswordFill, RiUploadCloudFill } from "react-icons/ri";
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { FaCity } from "react-icons/fa";
import { BsCardChecklist, BsFillPersonVcardFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useUpdate_ProfileMutation } from "../../redux/Auth/auth";
import { NotificationAlert } from "../../Components/NotificationAlert/NotificationAlert";
import { logout } from "../../redux/features/authState";

const Profile = () => {
  const selector = useSelector((state) => state?.userData);
  const User_Data = selector?.data?.user;
  const userID = User_Data?._id;
  const Profile_Img = User_Data?.profileImage;
  const disPatch = useDispatch();

  console.log(Profile_Img)

  const [isPassTwo, setIsPassTwo] = useState(false);
  const [confirmPass, setConfirmPass] = useState(User_Data?.password);
  const [updateFields, setUpdateFields] = useState({
    name: User_Data?.name,
    email: User_Data?.email,
    phone: User_Data?.phone,
    profileImage: "",
    password: User_Data?.password,
  });

  const { name, email, password, phone, profileImage } = updateFields;

  const handleUpdateProfile = (e) => {
    setUpdateFields({ ...updateFields, [e.target.name]: e.target.value });
  };

  // Update the profile
  const [update_Profile_API, { isLoading }] = useUpdate_ProfileMutation();

  const onChangeProfile = (e) => {
    const files = e.target.files[0];
    setUpdateFields((prevFields) => ({
      ...prevFields,
      profileImage: files,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("name", name);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("profileImage", profileImage);
      const res = await update_Profile_API({
        userID,
        data: formData,
      });
      console.log(res?.data)
      if (!res.error) {
        NotificationAlert("Profile updated successfully", "success");
        // dispatch(authUser(res?.data));
        // disPatch(logout());
      } else {
        NotificationAlert("Error While updating profile");
      }
    } catch (error) {
      NotificationAlert("Error");
    }
  }

  return (
    <div>
      <Dlayout pageName="PROFILE">
        <div className={style.profile_wrapper}>
          <div className={style.profile_upperarea}>
            <div className={style.profile_box}>
              <div className={style.profile_box_imgs}>
                <img src={profile_bg} alt="no img found" />
                {Profile_Img ? (
                  <img src={Profile_Img} alt="no img found" />
                ) : (
                  <img src={avatar} alt="no img found" />
                )}
              </div>
              <div className={style.profile_name}>
                <h6>{User_Data?.name}</h6>
                <p>{User_Data?.role[0]}</p>
              </div>
              <div className={style.profile_detail}>
                <div>
                  <h5>17</h5>
                  <p>Posts</p>
                </div>
                <div>
                  <h5>9.7k</h5>
                  <p>Followers</p>
                </div>
                <div>
                  <h5>274</h5>
                  <p>Following</p>
                </div>
              </div>
            </div>
          </div>
          <div className={style.lower}>
            <form
              style={{ height: "100%", width: "100%" }}
              onSubmit={handleUpdate}
            >
              <div className={style.profile_update_wrapper}>
                <label
                  htmlFor="image"
                  style={{ width: "100%", height: "100%", cursor: "pointer" }}
                  className={style.upload_pic_label}
                >
                  <div className={style.update_profile_button}>
                    <RiUploadCloudFill className={style.upload_icon} />
                    <h3>Upload Files</h3>
                    <p className="text-center">
                      PNG, JPG and GIF files are allowed
                    </p>
                  </div>
                </label>
                <input
                  type="file"
                  name="profileImage"
                  id="image"
                  onChange={onChangeProfile}
                  multiple="multiple"
                  accept="video/png/jpeg*"
                  style={{ display: "none" }}
                />
                <div className={style.upload_detail}>
                  <h3>Complete your profile</h3>
                  <p>
                    Stay on the pulse of distributed projects with an anline
                    whiteboard to plan, coordinate and discuss
                  </p>
                </div>
              </div>
            </form>
            <div className={style.update_profile_fields_wrapper}>
              <p>Update Your Profile</p>
              <form className={style.form} onSubmit={handleUpdate}>
                <div className={style.update_profile_fields_box_wrapper}>
                  <h6>Name</h6>
                  <div className={style.update_profile_fields_box}>
                    <AiOutlineUser
                      className={style.update_profile_fields_box_icon}
                    />
                    <input
                      value={updateFields.name}
                      type="text"
                      placeholder="Enter Your Name"
                      name="name"
                      onChange={handleUpdateProfile}
                    />
                  </div>
                </div>
                <div className={style.update_profile_fields_box_wrapper}>
                  <h6>Email</h6>
                  <div className={style.update_profile_fields_box}>
                    <MdEmail className={style.update_profile_fields_box_icon} />
                    <input
                      value={updateFields.email}
                      type="email"
                      name="email"
                      onChange={handleUpdateProfile}
                      placeholder="Enter Your Email"
                    />
                  </div>
                </div>
                <div className={style.update_profile_fields_box_wrapper}>
                  <h6>Phone Number</h6>
                  <div className={style.update_profile_fields_box}>
                    <RiLockPasswordFill
                      className={style.update_profile_fields_box_icon}
                    />
                    <input
                      type={"number"}
                      name="phone"
                      onChange={handleUpdateProfile}
                      placeholder="Enter Your Password"
                      value={phone}
                    />
                  </div>
                </div>
                <div className={style.update_profile_fields_box_wrapper}>
                  <h6>Password</h6>
                  <div className={style.update_profile_fields_box}>
                    <RiLockPasswordFill
                      className={style.update_profile_fields_box_icon}
                    />
                    <input
                      type={isPassTwo ? "text" : "password"}
                      placeholder="Enter Your Password"
                      onChange={(e) => setConfirmPass(e.target.value)}
                      value={confirmPass}
                    />
                    {isPassTwo ? (
                      <AiFillEye
                        className={style.update_profile_fields_box_icon}
                        style={{ cursor: "pointer" }}
                        onClick={() => setIsPassTwo(false)}
                      />
                    ) : (
                      <AiFillEyeInvisible
                        className={style.update_profile_fields_box_icon}
                        style={{ cursor: "pointer" }}
                        onClick={() => setIsPassTwo(true)}
                      />
                    )}
                  </div>
                </div>
                {isLoading ? (
                  <button className={style.update_btn}>UPDATING</button>
                ) : (
                  <button className={style.update_btn}>UPDATE</button>
                )}
              </form>
            </div>
          </div>
        </div>
      </Dlayout>
    </div>
  );
};

export default Profile;
