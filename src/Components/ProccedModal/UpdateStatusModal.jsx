import React, { useState } from "react";
import { useAssign_ParcelMutation, useUpdate_assign_ParcelMutation } from "../../redux/Parcel/Parcel";
import { NotificationAlert } from "../NotificationAlert/NotificationAlert";
import { useSelector } from "react-redux";
import { useAll_RidersQuery } from "../../redux/Rider/rider";

const UpdateStatusModal = ({ setModal, assignmentID }) => {
    const [status, setStatus] = useState();
    const [reason, setReason] = useState("")

    const selector = useSelector((state) => state?.userData);
    const id = selector?.data?.user?._id;
    const assignArray = ["Transfer", "Collected", "Shipped", "Delivered", "Cancelled", "Return to Depot"]

    console.log({ status, reason })

    const [update_assign_parcel, { isLoading }] = useUpdate_assign_ParcelMutation();

    const handleGetStatus = (value) => {
        setStatus(value)
        if (status === "Cancelled" || status === "Return to Depot") {
            setReason("")
        }
    }

    const handlePArcelAssign = async (e) => {
        e.preventDefault();
        try {
            const res = await update_assign_parcel({
                assignmentID: assignmentID,
                data: { status: [status], reason: reason },
            });
            if (!res.error) {
                NotificationAlert("Parcel Status Updated", "success");
                setModal(null)
            } else {
                NotificationAlert(res?.error?.data?.message);
            }
            console.log(res);
        } catch (error) {
            NotificationAlert("Error");
        }
    };

    return (
        <div className="modal_wrapper">
            <div className="modal_box">
                <div className="modal_head d-flex justify-content-center">
                    <h2 className="f-bold pb-3">Update Assign Status</h2>
                    <span className="modal_close_btn" onClick={() => setModal(null)}>
                        X
                    </span>
                </div>
                <form
                    className="mt-1 modal_form d-flex flex-column gap-2"
                    onSubmit={handlePArcelAssign} >
                    <select
                        name="group"
                        className="text-dark bg-light"
                        onChange={(e) => handleGetStatus(e.target.value)}
                    >
                        <option value={status} disabled defaultValue className="text-dark">
                            Select Group
                        </option>
                        {assignArray?.map((item, i) => (
                            <option value={item} key={i} className="text-dark">
                                {item}
                            </option>
                        ))}

                    </select>
                    {(status === "Cancelled" || status === "Return to Depot") &&
                        <textarea
                            placeholder="reason"
                            name="reason"
                            className="text-dark bg-light"
                            style={{ padding: 2, borderRadius: 5 }}
                            rows={5}
                            onChange={(e) => setReason(e.target.value)}
                            value={reason}
                        />
                    }
                    {isLoading ? (
                        <button className="modal_sumbit_btn mt-3" disabled>
                            Submiting
                        </button>
                    ) : (
                        <button className="modal_sumbit_btn mt-3 " >Submit</button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default UpdateStatusModal;
