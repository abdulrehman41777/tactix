import React from "react";
import logo from "../../assets/main/logo=.png";
import style from "./receipt.module.css";
import { MdCancel } from "react-icons/md";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const Invoice = ({ setGetInvoice, data }) => {
    console.log(data)
    const printReceipt = useRef();
    const printResume = useReactToPrint({
        content: () => printReceipt.current,
    });
    return (
        <div className="receipt_wrapper">
            <div className="receipt_box">
                <MdCancel
                    className={style.cancel}
                    onClick={() => setGetInvoice(null)}
                />
                <div id="Receipt" ref={printReceipt} className={style.receipt_div}>
                    <div className={style.logo}>
                        <img src={logo} alt="" className={style.receipt_logo} />
                    </div>
                    <div className={style.heading}>
                        <div className={style.heading_color}></div>
                        <div className={style.heading_name}>INVOICE</div>
                        <div className={style.heading_color}></div>
                    </div>
                    <div className={style.detail}>
                        <span className="d-flex align-items-center gap-2">
                            <h4>Date Of Export:</h4>
                            <p className="mt-1 text-black">{data?.assignment?.updatedAt?.split("T")[0]}</p>
                        </span>
                        <span className="d-flex align-items-center gap-2">
                            <h4>Tracking Number:</h4>
                            <p className="mt-1 text-black">{data?.assignment?.trackID}</p>
                        </span>
                        <h4>Consignee:</h4>
                        <div style={{ display: "flex", gap: 10 }} className={style.detailBox}>
                            <div style={{
                                width: "50%", display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem",
                            }}>
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
                                    <h6>Country:</h6>
                                    <p>
                                        United States (US)
                                    </p>
                                </div> */}
                                <div>
                                    <h6>Address:</h6>
                                    <p>
                                        {data?.reciverAddress}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.line_wrapper}>
                        <div className={style.line}></div>
                    </div>
                    <div className={style.detail}>
                        <h4>Shipper:</h4>
                        <div style={{ display: "flex", gap: 10 }} className={style.detailBox}>
                            <div style={{
                                width: "50%", display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem",
                            }}>
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
                                    <p>{data?.SenderPhone}</p>
                                </div>

                                {/* <div>
                                    <h6>Country:</h6>
                                    <p>
                                        Singapore (SG)
                                    </p>
                                </div> */}
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
                    <div>
                        <table className={`${style.table_container}`}>
                            <thead className={`${style.table_header}`}>
                                <tr>
                                    <th>Decsription Of Goods</th>
                                    <th>weight (KG)</th>
                                    <th>Quantity</th>
                                    <th>Unit Value</th>
                                    <th>Total Value</th>
                                </tr>
                            </thead>
                            <tbody className={`${style.table_body}`}>
                                <tr>
                                    <td>T-shirt</td>
                                    <td>0.05</td>
                                    <td>3</td>
                                    <td>5 SGD</td>
                                    <td>15 SGD</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* <div className={style.line_wrapper}>
                        <div className={style.line}></div>
                    </div> */}
                    {/* <div>
                        <table className={`${style.table_container}`}>
                            <thead className={`${style.table_header}`}>
                                <tr>
                                    <th>Total Packages</th>
                                    <th>Total Weight</th>
                                    <th>Dimension</th>
                                    <th>Total Value</th>
                                </tr>
                            </thead>
                            <tbody className={`${style.table_body}`}>
                                <tr>
                                    <td>1</td>
                                    <td>1 Kg</td>
                                    <td>15x25x5cm</td>
                                    <td>25 SGD</td>
                                </tr>
                            </tbody>
                        </table>
                    </div> */}
                </div>
                <div className={style.btn_wrapper}>
                    <button className={style.btn} onClick={printResume}>
                        Print
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Invoice
