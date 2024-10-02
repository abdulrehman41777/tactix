import { useSelector } from "react-redux";
import styles from "./shipmentcard.module.css";
import ProccedModal from "../ProccedModal/ProccedModal";
import { useState } from "react";
import { useGetRiderGroupQuery } from "../../redux/Manager/manager";

const ShipmentCard = ({ data, setModal, setGetReceipt }) => {
  const [procced, setProcced] = useState(null);
  const [apidata, setApiData] = useState({});
  const selector = useSelector((state) => state?.userData);
  const role = selector?.data?.user?.role[0];
  const parcelID = data?._id;

  const { data: group, isLoading: groupLoading } = useGetRiderGroupQuery(
    procced,
    {
      skip: !procced,
    }
  );
  const groupData = group?.findRiderGroups;

  const handleProceed = (parcelID, customerID, branchID) => {
    setProcced(branchID);
    setApiData({
      customerID: customerID,
      parcelID: parcelID,
    });
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
        <button className={styles.status_btn_progress}>
          <span className={`${styles.pending_btn_circle} mx-1`}></span>
          {data?.status}
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
            Cost : ${item?.price * data?.weight}
          </button>
        ))}
        {role === "Manager" &&
          (data?.status[0] === "pending" ? (
            <button
              className={styles.status_btn}
              onClick={() => handleProceed(data?._id, data?.userId, data?.branchID)}
            >
              Procced
            </button>
          ) : (
            <button className={styles.status_btn}>Update Status</button>
          ))}
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
          branchID={procced}
          groupData={groupData}
          customerID={apidata.customerID}
          parcelID={apidata.parcelID}
        />
      )}
    </div>
  );
};

export default ShipmentCard;
