import React, { useState } from "react";
import Dlayout from "../../Components/DLayout/Dlayout";
import style from "./admin.module.css";
import { Container } from "react-bootstrap";
import { MdOutlineCancel } from "react-icons/md";
import { BsCheck, BsThreeDots } from "react-icons/bs";
import LineProgressBar from "../../Components/lineProgressBar/LineProgressBar";
import ReactPaginate from "react-paginate";
import { BiPlus } from "react-icons/bi";
import AddParcel from "../../Components/AddParcel/AddParcel";
import { useSelector } from "react-redux";
import { useGet_User_ParcelQuery, useTrackParcelMutation } from "../../redux/Parcel/Parcel";
import { NotificationAlert } from "../../Components/NotificationAlert/NotificationAlert";
import ViewParcelData from "../../Components/ViewParcelData/ViewParcelData";
import Receipt from "../../Components/ReceiptCard/Receipt";
import Invoice from "../../Components/ReceiptCard/Invoice";

const YoursOrders = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [isReciept, setIsReciept] = useState(null);
  const [isInvoice, setIsInvoice] = useState(null);
  const [trackID, setTrackID] = useState("");
  const [trackedData, setTrackedData] = useState({});


  // User Data
  const selector = useSelector((state) => state?.userData);
  const id = selector?.data?.user?._id;

  const [trackParcel, { isLoading }] = useTrackParcelMutation();

  const getUserParcels = useGet_User_ParcelQuery(id, { skip: !id })
  const getUserParcelData = getUserParcels?.data?.findUserParcel;

  const endOffset = itemOffset + 6;
  const pageCount = Math.ceil(getUserParcelData?.length / 6);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 6) % getUserParcelData?.length;
    setItemOffset(newOffset);
  };


  const handleTrackParcel = async () => {
    try {
      const res = await trackParcel({ trackID, userID: id });
      if (!res.error) {
        setTrackedData(res?.data?.assignment)
      }

    } catch (error) {
      console.log(error);
      NotificationAlert("Internal Server Error", "success")
    }
  }

  return (
    <div>
      <Dlayout pageName="Packages" search={search} setSearch={setSearch}>
        <Container className={style.admin_wrapper}>
          <div className={`${style.table_wrapper}`}>
            <div className={style.table_div}>
              <div className="d-flex gap-3">

                <input
                  className=" p-3 py-1 rounded"
                  type="number"
                  placeholder="123456"
                  name="trackID"
                  value={trackID}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 6) {
                      setTrackID(value);
                    }
                  }}
                />

                <button
                  name="Create Product"
                  className="btn p-3 py-2 rounded"
                  style={{ background: "#D8788C", color: "#FFFFFF" }}
                  onClick={handleTrackParcel}
                >
                  {"Track Order"}
                </button>
              </div>
              <table className={`${style.table_container}`}>
                <thead className={`${style.table_header}`}>
                  <tr>
                    <th>NAME</th>
                    <th>#Orderid</th>
                    <th>STATUS</th>
                    <th>DATE</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody className={`${style.table_body}`}>
                  {getUserParcelData
                    ?.filter((item) =>
                      item?.parcelName?.toLowerCase()?.includes(search?.toLowerCase())
                    )?.slice(itemOffset, endOffset)
                    ?.map((user, index) => (
                      <tr key={index}>
                        <td className="d-flex align-items-center">
                          {user?.parcelName}
                        </td>
                        <td>{user?.orderNumber}</td>
                        <td style={{ width: "30rem" }}>
                          <div style={{ width: "24rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                              {user?.assignment?.Status?.[0] === "Order Received" ?
                                "We've got your Shipment details, but not your package"
                                : user?.assignment?.Status?.[0] === "Shipment Collected" ? "Your package has been successfully collected. Thank you for choosing us!"
                                  : user?.assignment?.Status?.[0] === "In Transit to Origin Facility" ?
                                    "Your package is on its way to the local shipping center."
                                    : user?.assignment?.Status?.[0] === "Customs/Terminal Clearance in Origin Country" ?
                                      "Your package is going through customs and security screening in the sending country."
                                      : user?.assignment?.Status?.[0] === "Departed from Origin Country" ?
                                        "Your package has left the sending country and is on its way."
                                        : user?.assignment?.Status?.[0] === "In Transit to Destination Country" ? "Your package is traveling to the destination country."
                                          : user?.assignment?.Status?.[0] === "Arrived at Destination Country" ? "Your package has arrived in the destination country."
                                            : user?.assignment?.Status?.[0] === "Customs/Terminal Clearance in Destination Country" ? "Your package is going through customs in the receiving country."
                                              : user?.assignment?.Status?.[0] === "Shipment Sorted at Delivery Facility" ? "Your package has been sorted at the delivery facility and is being prepared for final delivery"
                                                : user?.assignment?.Status?.[0] === "Out for Delivery" ? "Your package is out for delivery and will be with you soon!"
                                                  : user?.assignment?.Status?.[0] === "Delivered" ? "Your package has been delivered. Enjoy!"
                                                    : user?.assignment?.Status?.[0] === "Undelivered" ? "Your package has been delivered to your selected [retail point/locker box] and is ready for pickup"
                                                      : user?.assignment?.Status?.[0] === "Return to Sender" ? "The package is being returned to the sender due to a failed delivery attempt or delay"
                                                        : "Order Hasn't Been Processed Yet"
                              }
                            </div>
                          </div>
                        </td>
                        <td>{user?.createdAt?.split("T")[0]}</td>
                        <td>
                          <div className="d-flex gap-2">
                            {
                              user?.assignment === null ?
                                <button className="p-2 border-0 rounded-1" style={{ backgroundColor: "var(--btn-bg)" }}>Not Processed</button> : <button onClick={() => setIsReciept(user)} className="p-2 border-0 rounded-1" style={{ backgroundColor: "var(--btn-bg)" }}>Reciept</button>
                            }


                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          {getUserParcelData?.length >= 8 &&
            <ReactPaginate
              breakLabel="..."
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              renderOnZeroPageCount={null}
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              containerClassName={"pagination"}
              previousLinkClassName={"pagination__link"}
              nextLinkClassName={"pagination__link"}
              disabledClassName={"pagination__link--disabled"}
              activeClassName={"pagination__link--active"}
            />
          }
        </Container>
      </Dlayout>
      {isReciept &&
        <Receipt setGetReceipt={setIsReciept} data={isReciept} />
      }
      {isInvoice &&
        <Invoice setGetInvoice={setIsInvoice} data={isInvoice} />
      }
    </div>
  );
};

export default YoursOrders;
