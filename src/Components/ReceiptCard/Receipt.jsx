import React from "react";
import logo from "../../assets/main/logo.png";
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
          onClick={() => setGetReceipt(false)}
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
            <h4>Invoice To:</h4>
            <div>
              <h6>Name</h6>
              <p>John</p>
            </div>
            <div>
              <h6>Address</h6>
              <p>
                34th Street, Happy Village Malabon, Metro Manila, 1110 United
                State
              </p>
            </div>
            <div>
              <h6>Date</h6>
              <p>Thursday,April 18,2019</p>
            </div>
            <div>
              <h6>Payment</h6>
              <p>1300/$</p>
            </div>
          </div>
          <div className={style.line_wrapper}>
            <div className={style.line}></div>
          </div>
          <div>
            <table className={`${style.table_container}`}>
              <thead className={`${style.table_header}`}>
                <tr>
                  <th>PRODUCTS</th>
                  <th>QUANTITY</th>
                  <th>AMOUNT</th>
                </tr>
              </thead>
              <tbody className={`${style.table_body}`}>
                <tr>
                  <td>Computer</td>
                  <td>12</td>
                  <td>54</td>
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
