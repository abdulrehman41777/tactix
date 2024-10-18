import React, { useState } from "react";
import { Container } from "react-bootstrap";
import style from "./createparcel.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";
import { NotificationAlert } from "../../Components/NotificationAlert/NotificationAlert";
import { useSelector } from "react-redux";
import { useGetSingleUserByIDQuery } from "../../redux/Auth/auth";
import { useParams } from "react-router-dom";
import { useCreate_User_ParcelMutation } from "../../redux/Parcel/Parcel";

const CreateParcel = () => {
  const selector = useSelector((state) => state?.userData);
  const branchID = selector?.data?.user?.BranchID;
  const userID = selector?.data?.user?._id;

  const navigate = useNavigate();

  const GetUserById = useGetSingleUserByIDQuery(userID);
  const rateList = GetUserById?.data?.rateList?.rateList;

  const [rateListID, setRateListID] = useState("");


  const [formData, setFormData] = useState({
    parcelName: "",
    weight: "",
    dangerousGoods: "",
    receiverName: "",
    description: "",
    recieverPhone: "",
    recieverEmail: "",
    reciverAddress: "",
    CodCharges: "",
    ReciverPostCode: "",
    SenderPhone: "",
    SenderPostCode: "",
    SenderAddress: "",
    CodAmount: false,
    Dimension: {
      width: "",
      height: "",
    },
    isDamaged: false,
  });

  const {
    parcelName,
    weight,
    dangerousGoods,
    receiverName,
    description,
    recieverPhone,
    recieverEmail,
    reciverAddress,
    ReciverPostCode,
    SenderPhone,
    CodCharges,
    SenderPostCode,
    SenderAddress,
    CodAmount,
    Dimension,
    isDamaged,
  } = formData;


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "width" || name === "height") {
      setFormData((prevData) => ({
        ...prevData,
        Dimension: {
          ...prevData.Dimension,
          [name]: value,
        },
      }));
    } else if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (name === "dangerousGoods") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const [createUserParcelApi, { isLoading }] = useCreate_User_ParcelMutation();

  const handleSubmit = async () => {
    try {
      if (
        parcelName === "" ||
        weight === "" ||
        receiverName === "" ||
        recieverPhone === "" ||
        recieverEmail === "" ||
        reciverAddress === "" ||
        ReciverPostCode === "" ||
        SenderPhone === "" ||
        SenderPostCode === "" ||
        Dimension.width === "" ||
        Dimension.height === "" ||
        rateListID === ""
      ) {
        return NotificationAlert("All Field Rquired");
      }
      const res = await createUserParcelApi({
        userId: userID,
        BranchId: branchID,
        rateListID: rateListID,
        data: formData,
      });
      if (!res.error) {
        navigate(-1);
        NotificationAlert("Parcel Created Successfully", "success");
      }
    } catch (error) {
      NotificationAlert("Something Went Wrong!");
    }
  };

  return (
    <div className={style.create_wrapper}>
      <Container className={style.login_warpper}>
        <p className={style.back} onClick={() => navigate(-1)}>
          <IoIosArrowBack /> Back To Main
        </p>
        <div className={style.login_box_wrapper}>
          <div
          // className={style.login_box_inner_wrapper}
          >
            <div className={style.login_box_head}>
              <h1>Create Order</h1>
              <p>Create A New Order</p>
            </div>
            <div className={style.form_wrapper}>
              <div className="d-flex flex-column justify-content-center align-items-center gap-3">
                <div className="d-flex flex-column w-100 gap-3">
                  <div className="row g-3">
                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>Parcel Name</label>
                      <input
                        type="text"
                        placeholder="Parcel Name"
                        name="parcelName"
                        value={parcelName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>Weight</label>
                      <input
                        type="number"
                        placeholder="Weight"
                        name="weight"
                        value={weight}
                        onChange={handleChange}
                      />
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>
                        Fragile or Non-Fragile
                      </label>
                      <select
                        name="dangerousGoods"
                        value={dangerousGoods}
                        onChange={handleChange}
                      >
                        <option value=""> Select One </option>
                        <option value="yes"> Yes </option>
                        <option value="no"> No </option>
                      </select>
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>Width</label>
                      <input
                        type="number"
                        placeholder="Width"
                        name="width"
                        value={Dimension.width}
                        onChange={handleChange}
                      />
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>Height</label>
                      <input
                        type="number"
                        placeholder="Height"
                        name="height"
                        value={Dimension.height}
                        onChange={handleChange}
                      />
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>Reciever Name</label>
                      <input
                        type="text"
                        placeholder="Reciever Phone"
                        name="receiverName"
                        value={receiverName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>Reciever Phone</label>
                      <input
                        type="number"
                        placeholder="Reciever Phone"
                        name="recieverPhone"
                        value={recieverPhone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>Reciever Email</label>
                      <input
                        type="text"
                        placeholder="Reciever Email"
                        name="recieverEmail"
                        value={recieverEmail}
                        onChange={handleChange}
                      />
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>
                        Reciver Address
                      </label>
                      <input
                        type="text"
                        placeholder="Reciver Address"
                        name="reciverAddress"
                        value={reciverAddress}
                        onChange={handleChange}
                      />
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>
                        Reciver Post Code
                      </label>
                      <input
                        type="number"
                        placeholder="Reciver Post Code"
                        name="ReciverPostCode"
                        value={ReciverPostCode}
                        onChange={handleChange}
                      />
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>Sender Phone</label>
                      <input
                        type="number"
                        placeholder="Sender Phone"
                        name="SenderPhone"
                        value={SenderPhone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>Sender Address</label>
                      <input
                        type="text"
                        placeholder="Sender Address"
                        name="SenderAddress"
                        value={SenderAddress}
                        onChange={handleChange}
                      />
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>
                        Sender Post Code
                      </label>
                      <input
                        type="number"
                        placeholder="Sender Post Code"
                        name="SenderPostCode"
                        value={SenderPostCode}
                        onChange={handleChange}
                      />
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>
                        Description
                      </label>
                      <textarea
                        placeholder="write a short description about the parcel"
                        name="description"
                        className="text-dark bg-light"
                        style={{ padding: 2, borderRadius: 5 }}
                        rows={5}
                        onChange={handleChange}
                        value={description}
                      />
                    </div>

                    {CodAmount &&
                      <div className={`col-sm-4 gap-0 ${style.label}`}>
                        <label style={{ color: "#a3b1c2" }}>
                          COD Charges
                        </label>
                        <input
                          type="number"
                          placeholder="Sender Post Code"
                          name="CodCharges"
                          value={CodCharges}
                          onChange={handleChange}
                        />
                      </div>
                    }

                    <div className={`col-sm-4 gap-2 d-flex align-items-center`}>
                      <label className={style.cyberpunk_checkbox_label}>
                        <input
                          type="checkbox"
                          name="isDamaged"
                          checked={isDamaged}
                          onChange={handleChange}
                          className={style.cyberpunk_checkbox}
                        />
                        is Damaged?
                      </label>
                    </div>

                    <div className={`col-sm-4 gap-2 d-flex align-items-center`}>
                      <label className={style.cyberpunk_checkbox_label}>
                        <input
                          type="checkbox"
                          name="CodAmount"
                          checked={CodAmount}
                          onChange={handleChange}
                          className={style.cyberpunk_checkbox}
                        />
                        Cash on Delivery
                      </label>
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>Rate List</label>
                      <select
                        name="rateListID"
                        value={rateListID}
                        onChange={(e) => setRateListID(e.target.value)}
                      >
                        <option value=""> Select One </option>
                        {rateList?.map((item) => (
                          <option value={item._id} key={item._id}>
                            {" "}
                            {item.from},{item.to},{item.price}{" "}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  name="Create Product"
                  className="btn p-3 py-2 rounded"
                  onClick={handleSubmit}
                  style={{ background: "#D8788C", color: "#FFFFFF" }}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Create Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CreateParcel;
