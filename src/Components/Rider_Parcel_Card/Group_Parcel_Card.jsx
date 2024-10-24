import { useSelector } from "react-redux";
import styles from "./shipmentcard.module.css";
import ProccedModal from "../ProccedModal/ProccedModal";
import { useState } from "react";
import Update_Status from "../Update_Status/Update_Status";
import { useAcceptJobMutation } from "../../redux/Parcel/Parcel";
import AcceptJobs from "../Update_Status/AcceptJobs";
import ResponseToast from "../toast/Toast";

const Group_Parcel_Card = ({ data }) => {
  const [getParcelID, setGetParcelID] = useState("");
  const [updateStatus, setUpdateStatus] = useState(false);
  const [accept, setAccept] = useState(null)

  const handleUpdateStatus = (id) => {
    setGetParcelID(id);
    setUpdateStatus(true);
  };

  const selector = useSelector((state) => state?.userData);
  const riderID = selector?.data?.user?._id;

  const [acceptJob, { isLoading }] = useAcceptJobMutation();

  const HandleAcceptJob = async () => {
    try {

      const res = await acceptJob({
        assignmentID: data?.assignment?._id,
        riderID: riderID
      });

      ResponseToast({ res })

      if (!res.error) {
        setAccept(null)
      }

    } catch (error) {
      console.log(error)
      ResponseToast({ message: "Internal Server Error", success: false })
    }
  }

  return (
    <div className={`${styles.shipment_card}`}>
      <div
        className={`${styles.shipment_card_head} d-flex justify-content-between`}
      >
        <div className={`${styles.id} d-flex pb-3`}>
          <h4>Order</h4>
        </div>
        <button
          className={styles.status_btn_progress}
          style={{ display: "flex", justifyContent: "center" }}
        >

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
          Cost : ${data?.assignment?.parcelID?.CodAmount ? data?.assignment?.parcelID?.CodCharges * data?.assignment?.parcelID?.weight : data?.assignment?.totalPrice}
        </button>

        <button
          className={styles.status_btn}
          onClick={() => setAccept(data)}
          style={{ cursor: "pointer" }}
        > Accept </button>



      </div>
      {updateStatus && (
        <Update_Status
          setAddAdmin={setUpdateStatus}
          getParcelID={getParcelID}
        />
      )}
      {accept && (
        <AcceptJobs
          isClose={setAccept}
          data={accept}
          HandleAcceptJob={HandleAcceptJob}
          AcceptLoading={isLoading}
        />
      )}
    </div>
  );
};

export default Group_Parcel_Card;
