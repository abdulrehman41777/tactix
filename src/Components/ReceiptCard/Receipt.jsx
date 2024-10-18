import React from "react";
import logo from "../../assets/main/logo=.png";
import style from "./receipt.module.css";
import { MdCancel } from "react-icons/md";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const Receipt = ({ setGetReceipt }) => {
  const printReceipt = useRef();
  const printResume = useReactToPrint({
    content: () => printReceipt.current,
  });
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
            <h4>To:</h4>
            <div style={{ display: "flex", gap: 10 }} className={style.detailBox}>
              <div style={{
                width: "50%", display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}>
                <div>
                  <h6>Name:</h6>
                  <p>John</p>
                </div>

                <div>
                  <h6>Email:</h6>
                  <p>johnsmith@gmail.com</p>
                </div>
                <div>
                  <h6>Contact:</h6>
                  <p>+92 9638527410</p>
                </div>
              </div>
              <div style={{
                width: "50%", display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}>
                <div>
                  <h6>Description:</h6>
                  <p>Special Handling</p>
                </div>
                <div>
                  <h6>COD:</h6>
                  <p>
                    USD 40
                  </p>
                </div>
                <div>
                  <h6>Address:</h6>
                  <p>
                    34th Street, Happy Village Malabon, Metro Manila, 1110 United
                    State
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
                  <p>John</p>
                </div>

                <div>
                  <h6>Email:</h6>
                  <p>johnsmith@gmail.com</p>
                </div>

              </div>
              <div style={{
                width: "50%", display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}>
                <div>
                  <h6>Contact:</h6>
                  <p>+92 9638527410</p>
                </div>

                <div>
                  <h6>Address:</h6>
                  <p>
                    34th Street, Happy Village Malabon, Metro Manila, 1110 United
                    State
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
                  <h6>Description:</h6>
                  <p>T-shirt</p>
                </div>

                <div>
                  <h6>Weight:</h6>
                  <p>1Kg</p>
                </div>
                <div>
                  <h6>TrackID:</h6>
                  <p>123456</p>
                </div>
                <div>
                  <h6>Dimension:</h6>
                  <p>15x25x5cm</p>
                </div>

              </div>
              <div style={{
                width: "50%", display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}>
                <div>
                  <h6>Price:</h6>
                  <p>
                    25 USD
                  </p>
                </div>
                <div>
                  <h6>Date:</h6>
                  <p>
                    10/5/2024
                  </p>
                </div>
                <div>
                  <h6>Quantity:</h6>
                  <p>
                    1/1
                  </p>
                </div>
              </div>
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
                  <td>SG</td>
                  <td>SIN</td>
                </tr>
                <tr>
                  <td>US</td>
                  <td>JFK</td>
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
