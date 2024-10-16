import React from 'react'

const ViewParcelData = ({ orderData, setIsView }) => {
    return (
        <div className="modal_wrapper">
            <div className="modal_box">
                <div className="modal_head d-flex justify-content-center">
                    <h2 className="f-bold pb-3">Customer Order</h2>
                    <span
                        className="modal_close_btn"
                        onClick={() => setIsView(null)}
                    >
                        X
                    </span>
                </div>
                <div className="mt-1 d-flex flex-column gap-2">
                    <div className="d-flex justify-content-between align-items-center">
                        <span>Parcel Name:</span>
                        <span>{orderData.parcelName}</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <span>Weight:</span>
                        <span>{orderData.weight} kg</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <span>Dangerous Goods:</span>
                        <span>{orderData.dangerousGoods ? "Yes" : "No"}</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <span>Width:</span>
                        <span>{orderData.Dimension?.width} cm</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <span>Height:</span>
                        <span>{orderData.Dimension?.height} cm</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <span>Reciever Phone:</span>
                        <span>{orderData?.receiverName}</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <span>Reciever Phone:</span>
                        <span>{orderData?.recieverPhone}</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <span>Reciver Address:</span>
                        <span>{orderData?.reciverAddress}</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <span>Reciver Post Code:</span>
                        <span>{orderData?.ReciverPostCode}</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <span>Sender Phone:</span>
                        <span>{orderData?.SenderPhone}</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <span>Sender Address:</span>
                        <span>{orderData?.SenderAddress}</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <span>Sender Post Code:</span>
                        <span>{orderData?.SenderPostCode}</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <span>Cash on Delivery:</span>
                        <span>{orderData?.CodAmount ? "Yes" : "No"}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <span>TrackID:</span>
                        <span>{orderData?.assignment?.trackID}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <span>Reason:</span>
                        <span>{orderData?.assignment?.reason}</span>
                    </div>

                    {orderData?.ratelist?.map((item, index) => (
                        <div key={index} className="d-flex flex-column gap-2">
                            <div className="d-flex justify-content-between align-items-center">
                                <span>From:</span>
                                <span>{item?.from}</span>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                <span>To:</span>
                                <span>{item?.to}</span>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                <span>Price:</span>
                                <span>{item?.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ViewParcelData
