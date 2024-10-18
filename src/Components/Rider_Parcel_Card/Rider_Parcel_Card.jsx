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
        </div>
        <button
          className={styles.status_btn_progress}
          style={{ display: "flex", justifyContent: "center" }}
        >
          {(data?.assignment !== null && data?.assignment) ?
            data?.assignment?.Status[0] === "Shipment Sorted at Delivery Facility" ?
              "Shipment Sorted" : data?.assignment?.Status[0]
            : data?.status
          }
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
            className={`${styles.from} w-100 mt-2 d-flex gap-2 dot-content`}
          >
            <span>From: </span>
            <span>
              {data?.parcelID?.SenderAddress}
            </span>
          </div>
        </li>
        <li>
          <div
            className={`${styles.from} w-100 mt-2 d-flex gap-2 dot-content`}
          >
            <span>To: </span>
            <span>
              {data?.parcelID?.reciverAddress}
            </span>
          </div>
        </li>
        <li>
          <div
            className={`${styles.from} w-100 mt-2 d-flex gap-2 dot-content`}
          >
            <span>COD Amount: </span>
            <span>
              {"$" + data?.parcelID?.CodCharges}
            </span>
          </div>
        </li>
        <li>
          <div
            className={`${styles.from} w-100 mt-2 d-flex gap-2 dot-content`}
          >
            <span>Damaged: </span>
            <span>
              {data?.parcelID?.isDamaged ? "Yes" : "No"}
            </span>
          </div>
        </li>
        <li>
          <div
            className={`${styles.from} w-100 mt-2 d-flex gap-2 dot-content`}
          >
            <span>Weight: </span>
            <span>
              {data?.parcelID?.weight + "KG"}
            </span>
          </div>
        </li>
      </ul>

      <div className="d-flex justify-content-between">
        <button className={styles.status_btn} style={{ cursor: "default" }}>
          Cost : ${data?.totalPrice}
        </button>
        {
          data?.Status?.[0] === "Delivered" || data?.Status?.[0] === "Undelivered" ? "" : <button
            className={styles.status_btn}
            onClick={() => handleUpdateStatus(data?._id)}
            style={{ cursor: "pointer" }}
          >
            Update Status
          </button>
        }

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
