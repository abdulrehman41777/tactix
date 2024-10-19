import React from "react";
import logo from "../../assets/main/logo=.png";
import style from "./receipt.module.css";
import { MdCancel } from "react-icons/md";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const Receipt = ({ setGetReceipt, data }) => {
  const printReceipt = useRef();
  const printResume = useReactToPrint({
    content: () => printReceipt.current,
  });


  console.log(data?.assignment)


  return (
    <div className="receipt_wrapper">
      <div className="receipt_box">
        <MdCancel
          className={style.cancel}
          onClick={() => setGetReceipt(null)}
        />
        <div id="Receipt" ref={printReceipt} className={style.receipt_div}>
          <div className={style.logo}>
            <img src={logo} alt="" className={style.receipt_logo} />
          </div>
          <div className={style.heading}>
            <div className={style.heading_color}></div>
            <div className={style.heading_name}>Payment Receipt</div>
            <div className={style.heading_color}></div>
          </div>

          <div className={style.detail}>

            <div className="d-flex justify-content-end">
              <h6>Order Number: #{data.orderNumber}</h6>
            </div>
            <div className="d-flex justify-content-end">
              <h6>Track ID: #{data.assignment?.trackID}</h6>
            </div>

            <h4>To:</h4>
            <div style={{ display: "flex", gap: 10 }} className={style.detailBox}>
              <div style={{
                width: "50%", display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}>
                {console.log(data)}
                <div>
                  <h6>Name:</h6>
                  <p>{data?.receiverName}</p>
                </div>

                <div>
                  <h6>Email:</h6>
                  <p>{data?.recieverEmail}</p>
                </div>

              </div>
              <div style={{
                width: "50%", display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}>
                <div>
                  <h6>Contact:</h6>
                  <p>{data?.recieverPhone}</p>
                </div>
                {/* <div>
                  <h6>Shipment Type:</h6>
                  <p>{data?.rateList?.shipmentType?.[0]}</p>
                </div>
                {
                  data?.CodAmount ?
                    <div>
                      <h6>COD:</h6>
                      <p>
                        {data?.CodCharges} USD
                      </p>
                    </div> : ''
                } */}

                <div>
                  <h6>Address:</h6>
                  <p>
                    {data?.reciverAddress}
                  </p>
                </div>
                <div>
                  <h6>Postal Code:</h6>
                  <p>
                    {data?.ReciverPostCode}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={style.line_wrapper}>
            <div className={style.line}></div>
          </div>
          <div className={style.detail}>
            <h4>From:</h4>
            <div style={{ display: "flex", gap: 10 }} className={style.detailBox}>
              <div style={{
                width: "50%", display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}>
                <div>
                  <h6>Name:</h6>
                  <p>{data?.assignment?.customerID?.name}</p>
                </div>

                <div>
                  <h6>Email:</h6>
                  <p>{data?.assignment?.customerID?.email}</p>
                </div>

              </div>
              <div style={{
                width: "50%", display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}>
                <div>
                  <h6>Contact:</h6>
                  <p>{data.SenderPhone}</p>
                </div>

                <div>
                  <h6>Postal Code:</h6>
                  <p>
                    {data?.SenderPostCode}
                  </p>
                </div>

                <div>
                  <h6>Address:</h6>
                  <p>
                    {data?.SenderAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={style.line_wrapper}>
            <div className={style.line}></div>
          </div>
          <div className={style.detail}>
            <h4>Shipment Information:</h4>
            <div style={{ display: "flex", gap: 10 }} className={style.detailBox}>
              <div style={{
                width: "50%", display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}>
                <div>
                  <h6>Parcel Name:</h6>
                  <p>{data.parcelName}</p>
                </div>
                <div>
                  <h6>Dangerous Goods:</h6>
                  <p>{data?.dangerousGoods ? "Yes" : "No"}</p>
                </div>
                <div>
                  <h6>Weight:</h6>
                  <p>{data?.weight + "kg"}</p>
                </div>
                <div>
                  <h6>Dimension:</h6>
                  <p>{data?.Dimension?.width}x{data?.Dimension?.height}cm</p>
                </div>

                <div>
                  <h6>Shipment Type:</h6>
                  <p>{data?.rateList?.shipmentType?.[0]}</p>
                </div>

              </div>
              <div style={{
                width: "50%", display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}>

                <div>
                  <h6>Date:</h6>
                  <p>
                    {data?.assignment?.createdAt?.split("T")[0]}
                  </p>
                </div>
                <div>
                  <h6>is Damaged:</h6>
                  <p>
                    {data.isDamaged ? "Yes" : "No"}
                  </p>
                </div>
                <div>
                  <h6>COD:</h6>
                  <p>
                    {data?.CodAmount ? "Yes" : "No"}
                  </p>
                </div>

                <div>
                  <h6>Delivery Charges:</h6>
                  <p>
                    {data?.rateList?.price * data.weight} USD
                  </p>
                </div>

                {
                  data?.CodAmount ?
                    <>
                      <div>
                        <h6>COD Charges:</h6>
                        <p>
                          {data?.CodCharges}
                        </p>
                      </div>
                      <div>
                        <h6>Total Charges:</h6>
                        <p>
                          {data?.rateList?.price * data.weight + data?.CodCharges} USD
                        </p>
                      </div>
                    </>
                    : <div>
                      <h6>Total Charges:</h6>
                      <p>
                        {data?.rateList?.price * data.weight} USD
                      </p>
                    </div>
                }


              </div>
            </div>
            <div className="d-flex flex-column">
              <h6>Parcel Description:</h6>
              <p>
                {data.description}
              </p>
            </div>
          </div>
          <div className={style.line_wrapper}>
            <div className={style.line}></div>
          </div>
          <div>
            <table className={`${style.table_container}`}>
              <thead className={`${style.table_header}`}>
                <tr>
                  <th>Origin</th>
                  <th>Destination</th>
                </tr>
              </thead>
              <tbody className={`${style.table_body}`}>
                <tr>
                  <td>{data?.rateList?.from}</td>
                  <td>{data?.rateList?.to}</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
        <div className={style.btn_wrapper}>
          <button className={style.btn} onClick={printResume}>
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
