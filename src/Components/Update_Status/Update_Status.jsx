import React from "react";
import { useState } from "react";
import { useParcel_StatusMutation, useUpdate_assign_ParcelMutation } from "../../redux/Parcel/Parcel";
import { NotificationAlert } from "../NotificationAlert/NotificationAlert";
import { GiStorkDelivery } from "react-icons/gi";
import ResponseToast from "../toast/Toast";

const Update_Status = ({ setAddAdmin, getParcelID }) => {
  const [addStatus, setAddStatus] = useState("");
  const [completionPicture, setCompletionPicture] = useState(null);
  const status = ["Out for Delivery", "Delivered", "Undelivered"];
  const [updateStatus, { isLoading }] = useUpdate_assign_ParcelMutation();

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {

      if (addStatus === "Delivered" && (completionPicture === null || !completionPicture || completionPicture === undefined)) {
        return NotificationAlert("Please upload a completion picture");
      }

      const formData = new FormData()
      formData.append("status", [addStatus]);
      formData.append("completionPicture", completionPicture);

      const res = await updateStatus({
        assignmentID: getParcelID,
        data: formData,
      });
      ResponseToast({ res })
      if (!res.error) {
        setAddAdmin(false);
      }
    } catch (error) {
      ResponseToast({ message: "Internal Server Error", success: false })
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
          {addStatus === "Delivered" &&
            <div className="mt-2 justify-content-center align-items-center d-flex " >
              <div className="p-2 justify-content-center align-items-center d-flex rounded-2" style={{ backgroundColor: "var(--btn-bg)", cursor: "pointer" }}>

                <label htmlFor="pod" style={{ cursor: "pointer" }}>
                  <div className="d-flex gap-2 justify-content-center align-items-center">
                    <GiStorkDelivery size={24} />
                    <p className="text-white">
                      {!completionPicture ?
                        "Proof of Delivery"
                        :
                        completionPicture?.name?.split(".")[0]
                      }
                    </p>
                  </div>
                </label>
                <input type="file" id="pod" className="d-none" onChange={(e) => setCompletionPicture(e.target.files[0])} />
              </div>
            </div>
          }
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
