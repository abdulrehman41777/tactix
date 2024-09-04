import React from "react";
import { useState } from "react";
import { useParcel_StatusMutation } from "../../redux/Parcel/Parcel";
import { NotificationAlert } from "../NotificationAlert/NotificationAlert";

const Update_Status = ({ setAddAdmin, getParcelID }) => {
  const [addStatus, setAddStatus] = useState("");
  const status = ["Collected", "Shipped", "Delivered", "Cancelled"];

  const [updateStatus, { isLoading }] = useParcel_StatusMutation();

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      const res = await updateStatus({
        assignmentID: getParcelID,
        data: {
          Status: addStatus,
        },
      });
      if (!res.error) {
        NotificationAlert("Status updated", "success");
        setAddAdmin(false);
      } else {
        NotificationAlert("Error updating status");
      }
    } catch (error) {
      NotificationAlert("Error");
    }
  };

  return (
    <div className="modal_wrapper">
      <div className="modal_box">
        <div className="modal_head d-flex justify-content-center">
          <h2 className="f-bold pb-3">Update Status</h2>
          <span className="modal_close_btn" onClick={() => setAddAdmin(false)}>
            X
          </span>
        </div>
        <form className="mt-1 modal_form " onSubmit={handleUpdateStatus}>
          <select
            name="period"
            defaultValue={"default"}
            className="text-dark bg-light w-100"
            onChange={(e) => setAddStatus(e.target.value)}
          >
            <option value="default" disabled className="text-dark">
              Update Status
            </option>
            {status.map((status, index) => (
              <option key={index} value={status} className="text-dark">
                {status}
              </option>
            ))}
          </select>
          {isLoading ? (
            <button className="modal_sumbit_btn mt-3 " disabled>
              Submiting
            </button>
          ) : (
            <button className="modal_sumbit_btn mt-3 ">Submit</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Update_Status;
