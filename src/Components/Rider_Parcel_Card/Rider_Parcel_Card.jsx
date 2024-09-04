import { useSelector } from "react-redux";
import styles from "./shipmentcard.module.css";
import ProccedModal from "../ProccedModal/ProccedModal";
import { useState } from "react";
import Update_Status from "../Update_Status/Update_Status";

const Rider_Parcel_Card = ({ data }) => {
  const [getParcelID, setGetParcelID] = useState("");
  const [updateStatus, setUpdateStatus] = useState(false);

  const handleUpdateStatus = (id) => {
    setGetParcelID(id);
    setUpdateStatus(true);
  };

  return (
    <div className={`${styles.shipment_card}`}>
      <div
        className={`${styles.shipment_card_head} d-flex justify-content-between`}
      >
        <div className={`${styles.id} d-flex pb-3`}>
          <h4>Order ID</h4>
          <span className="ms-2">{data?._id.slice(16, -1).toUpperCase()}</span>
        </div>
        <button
          className={styles.status_btn_progress}
          style={{ display: "flex", justifyContent: "center" }}
        >
          {data?.Status[0]}
        </button>
        <small className={styles.order_name}>
          {" "}
          {data?.parcelID?.parcelName}
        </small>
      </div>

      {/* lines */}
      <ul className="bar pt-3">
        <li>
          <div
            className={`${styles.from} w-100 mt-2 d-flex justify-content-between dot-content`}
          >
            <span>
              {data?.parcelID?.fromCity?.city} , {data?.parcelID?.toCity?.city}
            </span>
            <span>
              <span>{data?.createdAt.split("T")[0]}</span>
            </span>
          </div>
        </li>
        <li>
          <div
            className={` ${styles.to} w-100 mt-2 d-flex justify-content-between`}
          >
            <span>
              {data?.parcelID?.fromCountry?.country} ,{" "}
              {data?.parcelID?.toCountry?.country}
            </span>
            <span>10 Feb, 2023</span>
          </div>
        </li>
      </ul>

      <div className="d-flex justify-content-between">
        <button className={styles.status_btn} style={{ cursor: "default" }}>
          Cost : ${data?.totalPrice}
        </button>
        <button
          className={styles.status_btn}
          onClick={() => handleUpdateStatus(data?._id)}
          style={{ cursor: "pointer" }}
        >
          Update Status
        </button>
      </div>
      {updateStatus && (
        <Update_Status
          setAddAdmin={setUpdateStatus}
          getParcelID={getParcelID}
        />
      )}
    </div>
  );
};

export default Rider_Parcel_Card;
