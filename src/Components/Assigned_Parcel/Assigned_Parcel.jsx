import { useSelector } from "react-redux";
import styles from "./shipmentcard.module.css";
import ProccedModal from "../ProccedModal/ProccedModal";
import { useState } from "react";
import Update_Status from "../Update_Status/Update_Status";

const Assigned_Parcel = ({ data }) => {
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
          <span className="ms-2">{data?._id.slice(-4).toUpperCase()}</span>
        </div>
        <button
          className={styles.status_btn_progress}
          style={{ display: "flex", justifyContent: "center" }}
        >
          {data?.status[0]}
        </button>
        <small className={styles.order_name}>{data?.parcelName}</small>
      </div>

      {/* lines */}
      <ul className="bar pt-3">
        {data?.rateList?.map((item, index) => (
          <div key={index + 1}>
            <li>
              <div
                className={`${styles.from} w-100 mt-2 d-flex justify-content-between dot-content`}
              >
                <span>From:</span>
                <span>
                  <span>{item?.from}</span>
                </span>
              </div>
            </li>
            <li>
              <div
                className={`${styles.from} w-100 mt-2 d-flex justify-content-between dot-content`}
              >
                <span>To:</span>
                <span>
                  <span>{item?.to}</span>
                </span>
              </div>
            </li>
          </div>
        ))}
        <li>
          <div
            className={`${styles.from} w-100 mt-2 d-flex justify-content-between dot-content`}
          >
            <span>Order Date</span>
            <span>
              <span>{data?.createdAt.split("T")[0]}</span>
            </span>
          </div>
        </li>
        <li>
          <div
            className={` ${styles.to} w-100 mt-2 d-flex justify-content-between`}
          >
            <span>Weight:</span>
            <span>{data?.weight} kg</span>
          </div>
        </li>
        <li>
          <div
            className={` ${styles.to} w-100 mt-2 d-flex justify-content-between`}
          >
            <span>Dimensions (W x H):</span>
            <span>
              {data?.Dimension?.width} cm x {data?.Dimension?.height} cm
            </span>
          </div>
        </li>
      </ul>

      <div className="d-flex justify-content-between">
        {data?.rateList?.map((item, index) => (
          <button
            className={styles.status_btn}
            style={{ cursor: "default" }}
            key={index + 1}
          >
            Cost : ${!data?.CodAmount ? item?.price * data?.weight : item?.price * data?.weight + data?.CodCharges}
          </button>
        ))}
        <button
          className={styles.status_btn}
          // onClick={() => handleUpdateStatus(data?._id)}
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

export default Assigned_Parcel;
