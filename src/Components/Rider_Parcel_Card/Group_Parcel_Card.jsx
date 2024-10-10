import { useSelector } from "react-redux";
import styles from "./shipmentcard.module.css";
import ProccedModal from "../ProccedModal/ProccedModal";
import { useState } from "react";
import Update_Status from "../Update_Status/Update_Status";
import { useAcceptJobMutation } from "../../redux/Parcel/Parcel";
import { NotificationAlert } from "../NotificationAlert/NotificationAlert";

const Group_Parcel_Card = ({ data }) => {
  const [getParcelID, setGetParcelID] = useState("");
  const [updateStatus, setUpdateStatus] = useState(false);

  const handleUpdateStatus = (id) => {
    setGetParcelID(id);
    setUpdateStatus(true);
  };

  const selector = useSelector((state) => state?.userData);
  const role = selector?.data?.user?.role[0];
  const riderID = selector?.data?.user?._id;


  const [acceptJob, { isLoading }] = useAcceptJobMutation();

  const HandleAcceptJob = async () => {
    try {

      const res = await acceptJob({
        assignmentID: data?.assignment?._id,
        riderID: riderID
      });

      if (!res.error) {
        NotificationAlert(res?.data?.message, "success")
      }

    } catch (error) {
      console.log(error)
      NotificationAlert("Something went wrong")
    }
  }

  return (
    <div className={`${styles.shipment_card}`}>
      <div
        className={`${styles.shipment_card_head} d-flex justify-content-between`}
      >
        <div className={`${styles.id} d-flex pb-3`}>
          <h4>Order ID</h4>
          <span className="ms-2">{data?.trackID}</span>
        </div>
        <button
          className={styles.status_btn_progress}
          style={{ display: "flex", justifyContent: "center" }}
        >
          {console.log(data?.assignment)}
          {
            data?.assignment?.Status?.[0] === "Shipment Sorted at Delivery Facility" ?
              "Shipment Sorted" : data?.assignment?.Status?.[0]}
        </button>
        <small className={styles.order_name}>
          {" "}
          {data?.parcelName}
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
              {data?.assignment?.parcelID?.SenderAddress}
            </span>
          </div>
        </li>
        <li>
          <div
            className={`${styles.from} w-100 mt-2 d-flex gap-2 dot-content`}
          >
            <span>To: </span>
            <span>
              {data?.assignment?.parcelID?.reciverAddress}
            </span>
          </div>
        </li>
        <li>
          <div
            className={`${styles.from} w-100 mt-2 d-flex gap-2 dot-content`}
          >
            <span>COD Amount: </span>
            <span>
              {"$" + data?.assignment?.parcelID?.CodCharges}
            </span>
          </div>
        </li>
        <li>
          <div
            className={`${styles.from} w-100 mt-2 d-flex gap-2 dot-content`}
          >
            <span>Damaged: </span>
            <span>
              {data?.assignment?.parcelID?.isDamaged ? "Yes" : "No"}
            </span>
          </div>
        </li>
        <li>
          <div
            className={`${styles.from} w-100 mt-2 d-flex gap-2 dot-content`}
          >
            <span>Weight: </span>
            <span>
              {data?.assignment?.parcelID?.weight + "KG"}
            </span>
          </div>
        </li>

      </ul>

      <div className="d-flex justify-content-between">



        <button className={styles.status_btn} style={{ cursor: "default" }}>
          Cost : ${data?.assignment?.parcelID?.CodAmount ? data?.assignment?.parcelID?.CodCharges : data?.assignment?.totalPrice}
        </button>

        <button
          className={styles.status_btn}
          onClick={HandleAcceptJob}
          style={{ cursor: "pointer" }}
        >
          {isLoading ? "Accepting" : "Accept Job"}

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

export default Group_Parcel_Card;
