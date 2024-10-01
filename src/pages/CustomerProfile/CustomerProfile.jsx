import React, { useEffect } from "react";
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
  useGetAllUserByBranchQuery,
  useGetSingleUserByIDQuery,
  useUpdate_ProfileMutation,
} from "../../redux/Auth/auth";
import { NotificationAlert } from "../../Components/NotificationAlert/NotificationAlert";
import { logout } from "../../redux/features/authState";
import style_table from "./AllUsers.module.css";
import {
  useBulk_ParcelMutation,
  useCreate_Bulk_ParcelMutation,
  useGet_User_ParcelQuery,
  useGetSingleParcelsQuery,
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
  const [isUpload, setIsUpload] = useState(0);
  const [bulkData, setBulkData] = useState([]);
  const [rateList, setRateList] = useState([]);
  const [isView, setIsView] = useState(null);
  const [orderData, setOrderData] = useState({});

  const handleUploadFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBulkFile(file);
    }
  };

  const handleRateList = ({ id, rateListID }) => {
    setBulkData((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, rateListID: rateListID } : item
      )
    );
  };

  const { data: parcelData, isLoading: getParcelData } =
    useGetSingleParcelsQuery(isView, {
      skip: !isView,
    });

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
        if (
          res?.data?.invalidData?.length === 0 ||
          res?.data?.invalidData === null
        ) {
          setBulkFile("");
          NotificationAlert("Bulk Order Create Successfully", "success");
          setIsUpload(2);
          setRateList(res?.data?.rateList?.rateList);
          setBulkData(res?.data?.validData);
        } else {
          setBulkFile("");
          NotificationAlert("Uplaod Correct Csv");
        }
      }
      console.log(res);
    } catch (error) {
      NotificationAlert("Something Went Wrong!");
    }
  };

  const [bulkParcelApi, { isLoading: bulkLoading }] = useBulk_ParcelMutation();

  const handleCreateBulkParcel = async () => {
    try {
      const res = await bulkParcelApi({
        userId: userId,
        branchID: branchId,
        data: { data: bulkData },
      });
      if (!res.error) {
        setIsUpload(0);
      }
    } catch (error) {
      NotificationAlert("Something Went Wrong!");
    }
  };

  const search = "";
  const filter = "all";
  const isLoading = false;
  const itemOffset = 0;
  const endOffset = 5;

  useEffect(() => {
    if (isView && parcelData) {
      setOrderData(parcelData?.parcel);
    }
  }, [isView, parcelData]);

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
                    onClick={() => setIsUpload(1)}
                    disabled={bulkParcelLoading}
                  >
                    Create Bulk Order
                  </button>
                </div>
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
                        <button
                          className={style_table.status_btn_paid}
                          onClick={() =>
                            // navigate(
                            //   `/dashboard/all-user/customer-profile/single-parcel/${userId}/${item?._id}`
                            // )
                            setIsView(item?._id)
                          }
                        >
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
      {isUpload === 1 && (
        <div className="modal_wrapper">
          <div className="modal_box">
            <div className="modal_head d-flex justify-content-center">
              <h2 className="f-bold pb-3">Upload File Here</h2>
              <span
                className="modal_close_btn"
                onClick={() => setIsUpload(false)}
              >
                X
              </span>
            </div>
            <form className="mt-1 modal_form ">
              <span className={`${style_table.status_btn_paid}`}>
                <input
                  type="file"
                  className="hidden"
                  name="logo"
                  onChange={handleUploadFile}
                />
              </span>

              <button
                className="modal_sumbit_btn mt-3"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmitBulk();
                }}
              >
                {bulkParcelLoading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
      {isUpload === 2 && (
        <div className="modal_wrapper">
          <div className="modal_box w-75">
            <div className="modal_head d-flex justify-content-center">
              <h2 className="f-bold pb-3">Bulk Order</h2>
              <span className="modal_close_btn" onClick={() => setIsUpload(0)}>
                X
              </span>
            </div>
            <form className="mt-1 modal_form ">
              <table className={`${style_table.table_container}`}>
                <thead className={`${style_table.table_header}`}>
                  <tr>
                    <th>Parcel Name</th>
                    <th>Solid/Liquid</th>
                    <th>Cash on Delivery</th>
                    <th>Weight</th>
                    <th>Dimensions(WxH)</th>
                    <th>Rate List</th>
                  </tr>
                </thead>
                <tbody className={`${style_table.table_body}`}>
                  {bulkData?.map((item, index) => (
                    <tr key={index}>
                      <td className="d-flex align-items-center">
                        {item?.parcelName}
                      </td>
                      <td>{item?.Solid_Liquid}</td>
                      <td>{item?.CodAmount ? "Yes" : "No"}</td>
                      <td>{item?.weight} kg</td>
                      <td>
                        ({item?.Dimension?.width}cmx{item?.Dimension?.height}cm)
                      </td>
                      <td>
                        <select
                          name="rateListID"
                          onChange={(e) =>
                            handleRateList({
                              id: item._id,
                              rateListID: e.target.value,
                            })
                          }
                        >
                          <option value="">Select One </option>
                          {rateList?.map((rate) => (
                            <option value={rate._id} key={rate._id}>
                              {" "}
                              {rate.from},{rate.to},{rate.price}{" "}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button
                className="modal_sumbit_btn mt-3"
                onClick={(e) => {
                  e.preventDefault();
                  handleCreateBulkParcel();
                }}
              >
                {bulkLoading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
      {isView && (
        <div className="modal_wrapper">
          <div className="modal_box">
            <div className="modal_head d-flex justify-content-center">
              <h2 className="f-bold pb-3">Customer Order</h2>
              <span
                className="modal_close_btn"
                onClick={() => setIsView(false)}
              >
                X
              </span>
            </div>
            <div className="mt-1 d-flex flex-column gap-2">
              <div className="d-flex justify-content-between align-items-center">
                <span>Parcel Name:</span>
                <span>{orderData.parcelName}</span>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <span>Weight:</span>
                <span>{orderData.weight} kg</span>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <span>Solid or Liquid:</span>
                <span>{orderData.Solid_Liquid}</span>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <span>Width:</span>
                <span>{orderData.Dimension?.width} cm</span>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <span>Height:</span>
                <span>{orderData.Dimension?.height} cm</span>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <span>Reciever Phone:</span>
                <span>{orderData?.recieverPhone}</span>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <span>Reciver Address:</span>
                <span>{orderData?.reciverAddress}</span>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <span>Reciver Post Code:</span>
                <span>{orderData?.ReciverPostCode}</span>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <span>Sender Phone:</span>
                <span>{orderData?.SenderPhone}</span>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <span>Sender Address:</span>
                <span>{orderData?.SenderAddress}</span>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <span>Sender Post Code:</span>
                <span>{orderData?.SenderPostCode}</span>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <span>Cash on Delivery:</span>
                <span>{orderData?.CodAmount ? "Yes" : "No"}</span>
              </div>

              {orderData?.ratelist?.map((item, index) => (
                <div key={index} className="d-flex flex-column gap-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <span>From:</span>
                    <span>{item?.from}</span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <span>To:</span>
                    <span>{item?.to}</span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <span>Price:</span>
                    <span>{item?.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerProfile;
