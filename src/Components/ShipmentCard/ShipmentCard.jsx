import { useSelector } from "react-redux";
import styles from "./shipmentcard.module.css";
import ProccedModal from "../ProccedModal/ProccedModal";
import { useState } from "react";

const ShipmentCard = ({ data, setModal, setGetReceipt }) => {
  const [procced, setProcced] = useState(false);
  const selector = useSelector((state) => state?.userData);
  const role = selector?.data?.user?.role[0];
  const parcelID = data?._id;

  console.log(data);

  return (
    <div className={`${styles.shipment_card}`}>
      <div
        className={`${styles.shipment_card_head} d-flex justify-content-between`}
      >
        <div className={`${styles.id} d-flex pb-3`}>
          <h4>Order ID</h4>
          <span className="ms-2">{data?._id.slice(-8).toUpperCase()}</span>
        </div>
        <button className={styles.status_btn_progress}>
          <span className={`${styles.pending_btn_circle} mx-1`}></span>Pending
        </button>
        <small className={styles.order_name}>{data?.parcelName}</small>
      </div>

      {/* lines */}
      <ul className="bar pt-3">
        <li>
          <div
            className={`${styles.from} w-100 mt-2 d-flex justify-content-between dot-content`}
          >
            <span>
              {data?.fromCity?.city} , {data?.toCity?.city}
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
              {data?.fromCountry?.country} , {data?.toCountry?.country}
            </span>
            <span>10 Feb, 2023</span>
          </div>
        </li>
      </ul>

      <div className="d-flex justify-content-between">
        <button className={styles.status_btn} style={{ cursor: "default" }}>
          Cost : ${data?.price}
        </button>
        {role === "Manager" && (
          <button
            className={styles.status_btn}
            onClick={() => setProcced(true)}
          >
            Procced
          </button>
        )}
        {role === "User" && (
          <button
            className={styles.status_btn}
            onClick={() => setGetReceipt(true)}
          >
            Receipt
          </button>
        )}
      </div>
      {procced && (
        <ProccedModal
          setModal={setProcced}
          parcelID={parcelID}
          customerID={data?.customerID?._id}
        />
      )}
    </div>
  );
};

export default ShipmentCard;
