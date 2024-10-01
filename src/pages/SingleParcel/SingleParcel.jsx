import React, { useState } from "react";
import { Container } from "react-bootstrap";
import style from "./signup.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";
import { NotificationAlert } from "../../Components/NotificationAlert/NotificationAlert";
import { useSelector } from "react-redux";
import { useGetSingleUserByIDQuery } from "../../redux/Auth/auth";
import { useParams } from "react-router-dom";
import {
  useCreate_User_ParcelMutation,
  useGetSingleParcelsQuery,
} from "../../redux/Parcel/Parcel";

const SingleParcel = () => {
  const selector = useSelector((state) => state?.userData);
  const id = selector?.data?.user?.branchID;
  const manager_id = selector?.data?.user?._id;
  // console.log(selector);

  const { userId: userId, parcelID } = useParams();
  const navigate = useNavigate();

  const getSingleParcelApi = useGetSingleParcelsQuery(parcelID);
  const getSingleParcelLoading = getSingleParcelApi?.isLoading;
  const parcel = getSingleParcelApi?.data?.parcel;
  console.log(parcel);

  const [rateListID, setRateListID] = useState("");
  const [formData, setFormData] = useState({
    parcelName: "",
    weight: "",
    Solid_Liquid: "",
    recieverPhone: "",
    recieverEmail: "",
    reciverAddress: "",
    ReciverPostCode: "",
    SenderPhone: "",
    SenderPostCode: "",
    SenderAddress: "",
    CodAmount: false,
    Dimension: {
      width: "",
      height: "",
    },
  });

  const {
    parcelName,
    weight,
    Solid_Liquid,
    recieverPhone,
    recieverEmail,
    reciverAddress,
    ReciverPostCode,
    SenderPhone,
    SenderPostCode,
    SenderAddress,
    CodAmount,
    Dimension,
  } = formData;

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
              <h1>Customer Order</h1>
            </div>
            <div className={style.form_wrapper}>
              <div className="d-flex flex-column justify-content-center align-items-center gap-3">
                <div className="d-flex flex-column w-100 gap-3">
                  <div className="row g-3">
                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <h5 style={{ color: "#a3b1c2" }}>
                        Parcel Name: {parcel?.parcelName}
                      </h5>
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <h5 style={{ color: "#a3b1c2" }}>
                        Weight: {parcel?.weight} kg
                      </h5>
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <h5 style={{ color: "#a3b1c2" }}>
                        {parcel?.Solid_Liquid}
                      </h5>
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <h5 style={{ color: "#a3b1c2" }}>
                        Width: {parcel?.Dimension?.width} cm
                      </h5>
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <h5 style={{ color: "#a3b1c2" }}>
                        Height: {parcel?.Dimension?.height} cm
                      </h5>
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <h5 style={{ color: "#a3b1c2" }}>
                        Reciever Phone: {parcel?.recieverPhone}
                      </h5>
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <h5 style={{ color: "#a3b1c2" }}>
                        Reciever Email: {parcel?.recieverEmail}
                      </h5>
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <h5 style={{ color: "#a3b1c2" }}>
                        Reciver Address: {parcel?.reciverAddress}
                      </h5>
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <h5 style={{ color: "#a3b1c2" }}>
                        Reciver Post Code: {parcel?.ReciverPostCode}
                      </h5>
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <h5 style={{ color: "#a3b1c2" }}>
                        Sender Phone: {parcel?.SenderPhone}
                      </h5>
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <h5 style={{ color: "#a3b1c2" }}>
                        Sender Address: {parcel?.SenderAddress}
                      </h5>
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <h5 style={{ color: "#a3b1c2" }}>
                        Sender Post Code: {parcel?.SenderPostCode}
                      </h5>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center w-75">
                  <div className={`col-sm-4 gap-0 ${style.label}`}>
                    <h5 style={{ color: "#a3b1c2" }}>
                      Cash on Delivery: {parcel?.CodAmount ? "Yes" : "No"}
                    </h5>
                  </div>

                  <div className={`col-sm-4 gap-0 ${style.label}`}>
                    <h5 style={{ color: "#a3b1c2" }}>
                      From: {parcel?.ratelist?.from}
                    </h5>
                  </div>

                  <div className={`col-sm-4 gap-0 ${style.label}`}>
                    <h5 style={{ color: "#a3b1c2" }}>
                      To: {parcel?.rateList?.to}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SingleParcel;
