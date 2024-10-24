import React, { useState } from "react";
import { useTransfer_ParcelMutation, useUpdate_assign_ParcelMutation } from "../../redux/Parcel/Parcel";
import { NotificationAlert } from "../NotificationAlert/NotificationAlert";
import { useSelector } from "react-redux";
import { useAll_RidersQuery } from "../../redux/Rider/rider";
import { useEffect } from "react";
import ResponseToast from "../toast/Toast";

const UpdateStatusModal = ({ setModal, assignmentID, groupData, selectedStatus }) => {
    const [packageDetail, setPackageDetail] = useState({
        groupID: "",
        riderID: "",
    });
    const [status, setStatus] = useState(selectedStatus[0]);
    const [reason, setReason] = useState("")
    const { groupID, riderID } = packageDetail;
    console.log(status)
    const selector = useSelector((state) => state?.userData);
    const userID = selector?.data?.user?._id;

    const assignArray = [
        "Shipment Collected",
        "In Transit to Origin Facility",
        "Customs/Terminal Clearance in Origin Country",
        "Departed from Origin Country",
        "In Transit to Destination Country",
        "Arrived at Destination Country",
        "Customs/Terminal Clearance in Destination Country",
        "Shipment Sorted at Delivery Facility",
        "Transfer",
        "Out for Delivery",
        "Delivered",
        "Undelivered",
        "Return to Sender"
    ];

    const [availableOptions, setAvailableOptions] = useState([]);
    const [arrIndex, setArrayIndex] = useState();

    const handleGetStatus = (value) => {
        setStatus(value);



        if (value === "Cancelled" || value === "Return to Depot") {
            setReason("");
        }

        // Find the index of the selected status
        const currentIndex = assignArray.indexOf(value);

        // If a valid status is selected
        if (currentIndex !== -1) {
            // Get only the statuses that are before or up to the selected status
            const newOptions = assignArray.slice(0, currentIndex + 1);

            // Update the available options with only the current and previous statuses
            setAvailableOptions(newOptions);
        }
    };

    useEffect(() => { handleGetStatus() }, [selectedStatus])

    const handlePackageDetail = (e) => {
        setPackageDetail({ ...packageDetail, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        for (let i = 0; i < assignArray.length; i++) {
            if (selectedStatus[0] === assignArray[i]) {
                setArrayIndex(i);
                break;
            }
        }
    }, [])
    console.log(arrIndex, "array index")

    // All Rider
    const All_Rider_API = useAll_RidersQuery(groupID, { skip: !groupID });
    const All_Rider = All_Rider_API?.data?.findGroupRiders;

    const [update_assign_parcel, { isLoading }] = useUpdate_assign_ParcelMutation();



    const handlePArcelAssign = async (e) => {
        e.preventDefault();
        try {

            if (status === "" || status === undefined) {
                return NotificationAlert("Select Status");
            }

            const res = await update_assign_parcel({
                assignmentID: assignmentID,
                data: { status: [status === "Transfer" ? "Order Assigned" : status], reason: reason, groupID: groupID },
            });
            ResponseToast({ res });
            if (!res.error) {
                setModal(null)
            }
        } catch (error) {
            ResponseToast({ message: "Internal Server Error", success: false })
        }
    };

    const [tranferParcel, { isLoading: transferLoading }] = useTransfer_ParcelMutation()

    // const handleTransferParcel = async (e) => {
    //     e.preventDefault();
    //     try {
    //         if (groupID === "") {
    //             return NotificationAlert("Select Driver Crew First");
    //         }
    //         if (riderID === "") {
    //             return NotificationAlert("Select Driver");
    //         }

    //         const res = await tranferParcel({
    //             assignmentID: assignmentID,
    //             newRiderID: riderID,
    //             newriderGroupID: groupID,
    //             assignedFromManager: userID,
    //         });
    //         if (!res.error) {
    //             NotificationAlert(res.data.message, "success");
    //             setModal(null)
    //         } else {
    //             NotificationAlert(res?.error?.data?.message);
    //         }
    //     } catch (error) {
    //         NotificationAlert("Error");
    //     }
    // };




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
                    {/* <select
                        name="status"
                        className="text-dark bg-light"
                        onChange={(e) => handleGetStatus(e.target.value)}
                    >
                        <option value={status} defaultValue className="text-dark">
                            Select Status
                        </option>
                        {assignArray?.map((item, i) => (
                            <option value={item} key={i} className="text-dark">
                                {item}
                            </option>
                        ))}

                    </select> */}


                    <select
                        name="status"
                        className="text-dark bg-light"
                        value={status}
                        onChange={(e) => handleGetStatus(e.target.value)}
                    >
                        <option value="" defaultValue className="text-dark">
                            Select Status
                        </option>
                        {assignArray.map((item, i) => (
                            <option value={item} key={i} className="text-dark" style={arrIndex >= i ? { display: "none" } : {}} >
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
                    {(status === "Transfer") &&
                        <>
                            <select
                                name="groupID"
                                className="text-dark bg-light"
                                onChange={(e) => handlePackageDetail(e)}
                                value={groupID}
                            >
                                <option value="" disabled defaultValue className="text-dark">
                                    Select Driver Crew
                                </option>
                                {groupData?.map((item) => (
                                    <option value={item?._id} key={item?._id} className="text-dark">
                                        {item?.groupname}
                                    </option>
                                ))}
                            </select>

                            <textarea className="bg-white text-black p-1 rounded-2" rows={5} style={{ outline: "none" }} placeholder="Reason" onChange={(e) => setReason(e.target.value)}
                                value={reason} />
                        </>
                    }
                    {(isLoading || transferLoading) ? (
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
