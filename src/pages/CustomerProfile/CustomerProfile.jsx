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
import {
  useGetSingleUserByIDQuery,
  useUpdate_ProfileMutation,
} from "../../redux/Auth/auth";
import { NotificationAlert } from "../../Components/NotificationAlert/NotificationAlert";
import { logout } from "../../redux/features/authState";
import style_table from "./AllUsers.module.css";
import {
  useCreate_Bulk_ParcelMutation,
  useGet_User_ParcelQuery,
} from "../../redux/Parcel/Parcel";
import { useNavigate, useParams } from "react-router-dom";

const CustomerProfile = () => {
  const selector = useSelector((state) => state?.userData);
  const branchId = selector?.data?.user?.branchID;

  const { id: userId } = useParams();
  const navigate = useNavigate();

  const GetUserById = useGetSingleUserByIDQuery(userId);
  const User_Data = GetUserById?.data?.findUser;
  const Profile_Img = User_Data?.profileImage;

  const parcels = useGet_User_ParcelQuery(userId);
  const allParcels = parcels?.data?.findUserParcel;

  const [bulkFile, setBulkFile] = useState("");
  const [isUpload, setIsUpload] = useState(false);

  const handleUploadFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBulkFile(file);
    }
  };

  const [createBulkParcelApi, { isLoading: bulkParcelLoading }] =
    useCreate_Bulk_ParcelMutation();

  const handleSubmitBulk = async () => {
    try {
      if (bulkFile === "") {
        return NotificationAlert("Upload File");
      }

      const formData = new FormData();
      formData.append("file", bulkFile);

      const res = await createBulkParcelApi({
        userId: userId,
        branchID: branchId,
        data: formData,
      });
      if (!res.error) {
        setBulkFile("");
        NotificationAlert("Bulk Order Create Successfully", "success");
        setIsUpload(false);
      }
    } catch (error) {
      NotificationAlert("Something Went Wrong!");
    }
  };

  //   const allUsersApi = useGetAllUserByBranchQuery(id);
  // const rateList = allUsersApi?.data?.data;

  // console.log(all_User?.rateList)

  //   const [isPassOne, setIsPassOne] = useState(false);
  //   const [isPassTwo, setIsPassTwo] = useState(false);
  //   const [confirmPass, setConfirmPass] = useState(User_Data?.password);
  //   const [updateFields, setUpdateFields] = useState({
  //     name: User_Data?.name,
  //     email: User_Data?.email,
  //     profileImage: "",
  //     password: User_Data?.password,
  //   });

  //   const { name, email, password, profileImage } = updateFields;

  //   const handleUpdateProfile = (e) => {
  //     setUpdateFields({ ...updateFields, [e.target.name]: e.target.value });
  //   };

  // Update the profile
  //   const [update_Profile_API, { isLoading }] = useUpdate_ProfileMutation();

  //   const onChangeProfile = (e) => {
  //     const files = e.target.files[0];
  //     setUpdateFields((prevFields) => ({
  //       ...prevFields,
  //       profileImage: files,
  //     }));
  //   };

  //   const handleUpdate = async (e) => {
  //     e.preventDefault();
  //     if (updateFields.password === confirmPass) {
  //       try {
  //         const formData = new FormData();
  //         formData.append("email", email);
  //         formData.append("name", name);
  //         formData.append("password", password);
  //         formData.append("profileImage", profileImage);
  //         const res = await update_Profile_API({
  //           userID,
  //           data: formData,
  //         });
  //         if (!res.error) {
  //           NotificationAlert("Profile updated successfully", "success");
  //           disPatch(logout());
  //         } else {
  //           NotificationAlert("Error While updating profile");
  //         }
  //       } catch (error) {
  //         NotificationAlert("Error");
  //       }
  //     } else {
  //       NotificationAlert("Password Should Be Same");
  //     }
  //   };

  const search = ""; // or the search term you're looking for
  const filter = "all"; // or "customer", "admin", etc.
  const isLoading = false; // change to true if you want to simulate loading
  const itemOffset = 0; // pagination start index
  const endOffset = 5; // pagination end index (or any number you want to limit results)

  return (
    <div>
      <Dlayout pageName="Customer Profile">
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
                <p>{User_Data?.email}</p>
              </div>
              <div
                className={`d-flex gap-3`}
                style={{
                  marginTop: "-2rem",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* <div>
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
                </div> */}
                <div className="d-flex gap-4">
                  <button
                    className={`${style_table.status_btn_paid}`}
                    onClick={() =>
                      navigate(
                        `/dashboard/all-user/customer-profile/create-customer-order/${userId}/${branchId}`
                      )
                    }
                    style={{ padding: "0.4rem 0.5rem" }}
                  >
                    Create Order
                  </button>
                  <button
                    className={`${style_table.status_btn_paid}`}
                    style={{ padding: "0.4rem 0.5rem" }}
                    onClick={() =>
                      isUpload ? handleSubmitBulk() : setIsUpload(true)
                    }
                    disabled={bulkParcelLoading}
                  >
                    {isUpload
                      ? bulkParcelLoading
                        ? "Loading..."
                        : "Submit"
                      : "Create Bulk Order"}
                  </button>
                </div>
                {isUpload && (
                  <span className={`${style_table.status_btn_paid}`}>
                    <input
                      type="file"
                      className="hidden"
                      name="logo"
                      onChange={handleUploadFile}
                    />
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className={style_table.table_div} style={{ width: "100%" }}>
            {isLoading ? (
              <ListLoader />
            ) : (
              <table className={`${style_table.table_container}`}>
                <thead className={`${style_table.table_header}`}>
                  <tr>
                    <th>Parcel Name</th>
                    <th>Solid/Liquid</th>
                    <th>Cash on Delivery</th>
                    <th>Weight</th>
                    <th>Dimensions(WxH)</th>
                    <th>Status</th>
                    <th className="d-flex justify-content-center">Action</th>
                  </tr>
                </thead>
                <tbody className={`${style_table.table_body}`}>
                  {allParcels?.map((item, index) => (
                    <tr key={index}>
                      <td className="d-flex align-items-center">
                        {item?.parcelName}
                      </td>
                      <td>{item?.Solid_Liquid[0]}</td>
                      <td>{item?.CodAmount ? "Yes" : "No"}</td>
                      <td>{item?.weight} kg</td>
                      <td>
                        ({item?.Dimension?.width}cmx{item?.Dimension?.height}cm)
                      </td>
                      <td>{item?.status[0]}</td>
                      <td className="d-flex justify-content-center">
                        <button className={style_table.status_btn_paid}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* <div className={style.lower}>
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
                  <h6>Password</h6>
                  <div className={style.update_profile_fields_box}>
                    <RiLockPasswordFill
                      className={style.update_profile_fields_box_icon}
                    />
                    <input
                      type={isPassOne ? "text" : "password"}
                      name="password"
                      onChange={handleUpdateProfile}
                      placeholder="Enter Your Password"
                      value={password}
                    />
                    {isPassOne ? (
                      <AiFillEye
                        className={style.update_profile_fields_box_icon}
                        style={{ cursor: "pointer" }}
                        onClick={() => setIsPassOne(false)}
                      />
                    ) : (
                      <AiFillEyeInvisible
                        className={style.update_profile_fields_box_icon}
                        style={{ cursor: "pointer" }}
                        onClick={() => setIsPassOne(true)}
                      />
                    )}
                  </div>
                </div>
                <div className={style.update_profile_fields_box_wrapper}>
                  <h6>Confirm Password</h6>
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
          </div> */}
        </div>
      </Dlayout>
    </div>
  );
};

export default CustomerProfile;
