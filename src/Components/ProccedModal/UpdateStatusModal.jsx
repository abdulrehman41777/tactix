import React, { useState } from "react";
import { useAssign_ParcelMutation, useUpdate_assign_ParcelMutation } from "../../redux/Parcel/Parcel";
import { NotificationAlert } from "../NotificationAlert/NotificationAlert";
import { useSelector } from "react-redux";
import { useAll_RidersQuery } from "../../redux/Rider/rider";

const UpdateStatusModal = ({ setModal, assignmentID }) => {
    const [status, setStatus] = useState();

    const selector = useSelector((state) => state?.userData);
    const id = selector?.data?.user?._id;
    console.log(status)
    const assignArray = ["Transfer", "Collected", "Shipped", "Delivered", "Cancelled", "Return to Depot"]

    const [update_assign_parcel, { isLoading }] = useUpdate_assign_ParcelMutation();

    const handlePArcelAssign = async (e) => {
        e.preventDefault();
        try {
            const res = await update_assign_parcel({
                assignmentID: assignmentID,
                data: { status: [status] },
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
                        onChange={(e) => setStatus(e.target.value)}
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
                    {/* {All_Rider && (
                        <select
                            name="rider"
                            className="text-dark bg-light"
                            onChange={(e) => handlePackageDetail(e)}
                            value={rider}
                        >
                            <option value="" disabled defaultValue className="text-dark">
                                Select Rider
                            </option>
                            {All_Rider?.map((item) => (
                                <option value={item?._id} key={item?._id} className="text-dark">
                                    {item?.name}
                                </option>
                            ))}
                        </select>
                    )} */}
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
