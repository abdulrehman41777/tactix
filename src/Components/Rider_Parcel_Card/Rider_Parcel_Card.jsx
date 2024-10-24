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

  console.log(data)


  const date = new Date(data?.assignment?.deliveryStartTime ? data?.assignment?.deliveryStartTime?.toString() : null);
  const formattedStartDate = date.toISOString().slice(0, 10);

  const Enddate = new Date(data?.assignment?.deliveryEndTime ? data?.assignment?.deliveryEndTime?.toString() : null);
  const formattedEndDate = Enddate.toISOString().slice(0, 10);

  return (
    <div className={`${styles.shipment_card}`}>
      <div
        className={`${styles.shipment_card_head} d-flex justify-content-between`}
      >
        <div className={`${styles.id} d-flex pb-3`}>
          <h4>Order ID</h4>
          <span className="ms-2">{data?.assignment?.trackID}</span>
        </div>
        <button className={styles.status_btn_progress}>
          <span className={`${styles.pending_btn_circle} mx-1`}></span>
          {(data?.assignment !== null && data?.assignment) ?
            data?.assignment?.Status[0] === "Shipment Sorted at Delivery Facility" ?
              "Shipment Sorted" : data?.assignment?.Status[0]
            : data?.status
          }
        </button>
        <small className={styles.order_name}>{data?.parcelName}</small>
      </div>

      {/* lines */}
      <ul className="bar pt-3">
        <div >
          <li>
            <div
              className={`${styles.from} w-100 mt-2 d-flex justify-content-between dot-content`}
            >
              <span>From:</span>
              <span>
                <span>{data?.rateList?.from}</span>
              </span>
            </div>
          </li>
          <li>
            <div
              className={`${styles.from} w-100 mt-2 d-flex justify-content-between dot-content`}
            >
              <span>To:</span>
              <span>
                <span>{data?.rateList?.to}</span>
              </span>
            </div>
          </li>
        </div>
        <li>
          <div
            className={`${styles.from} w-100 mt-2 d-flex justify-content-between dot-content`}
          >
            <span>Order Date</span>
            <span>
              <span>{data?.assignment?.createdAt?.split("T")?.[0]}</span>
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
        {((data?.assignment?.deliveryStartTime !== "" || data?.assignment?.deliveryStartTime !== undefined) && data?.assignment?.deliveryStartTime) &&
          <li>
            <div
              className={` ${styles.to} w-100 mt-2 d-flex justify-content-between`}
            >
              <span>Pickup Time:</span>
              <span>
                {formattedStartDate}
              </span>
            </div>
          </li>
        }
        {((data?.assignment?.deliveryEndTime !== "" || data?.assignment?.deliveryEndTime !== undefined) && data?.assignment?.deliveryEndTime) &&
          <li>
            <div
              className={` ${styles.to} w-100 mt-2 d-flex justify-content-between`}
            >
              <span>Delivered Time:</span>
              <span>
                {formattedEndDate}
              </span>
            </div>
          </li>
        }
        {(data?.assignment !== null && data?.assignment) &&
          <li>
            <div
              className={` ${styles.to} w-100 mt-2 d-flex justify-content-between`}
            >
              <span>Track ID:</span>
              <span>
                {data?.assignment?.trackID}
              </span>
            </div>
          </li>
        }
      </ul>

      <div className="d-flex justify-content-between">

        <button
          className={styles.status_btn}
          style={{ cursor: "default" }}
        >
          Cost : ${!data?.CodAmount ? data?.rateList?.price * data?.weight : data?.rateList?.price * data?.weight + data?.CodCharges}
        </button>
        {
          (data?.assignment?.Status?.[0] === "Shipment Sorted at Delivery Facility" || data?.assignment?.Status?.[0] === "Out for Delivery") && <button
            className={styles.status_btn}
            onClick={() => handleUpdateStatus(data?.assignment?._id)}
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
