import React, { useState } from "react";
import { useAssign_ParcelMutation } from "../../redux/Parcel/Parcel";
import { NotificationAlert } from "../NotificationAlert/NotificationAlert";
import { useSelector } from "react-redux";
import { useAll_RidersQuery } from "../../redux/Rider/rider";
import ResponseToast from "../toast/Toast";

const ProccedModal = ({
  setModal,
  branchID,
  groupData,
  customerID,
  parcelID,
}) => {
  const [packageDetail, setPackageDetail] = useState({
    group: "",
    rider: "",
    message: "",
  });

  const { group, rider, message } = packageDetail;

  const handlePackageDetail = (e) => {
    setPackageDetail({ ...packageDetail, [e.target.name]: e.target.value });
  };

  const selector = useSelector((state) => state?.userData);
  const id = selector?.data?.user?._id;

  // All Rider
  const All_Rider_API = useAll_RidersQuery(group, { skip: !group });
  const All_Rider = All_Rider_API?.data?.findGroupRiders;

  const [assign_parcel, { isLoading }] = useAssign_ParcelMutation();

  const handlePArcelAssign = async (e) => {
    e.preventDefault();
    try {
      const res = await assign_parcel({
        branchID: branchID,
        riderGroupID: group,
        data: {
          assignedFromManager: id,
          customerID: customerID,
          parcelID: parcelID,
        },
      });
      ResponseToast({ res });
      if (!res.error) {
        setModal(null)
      }
    } catch (error) {
      ResponseToast({ message: "Internal Server Error", success: false })
    }
  };

  return (
    <div className="modal_wrapper">
      <div className="modal_box">
        <div className="modal_head d-flex justify-content-center">
          <h2 className="f-bold pb-3">Assign Parcel</h2>
          <span className="modal_close_btn" onClick={() => setModal(null)}>
            X
          </span>
        </div>
        <form
          className="mt-1 modal_form d-flex flex-column gap-2"
          onSubmit={handlePArcelAssign}
        >
          <select
            name="group"
            className="text-dark bg-light"
            onChange={(e) => handlePackageDetail(e)}
            value={group}
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
            <button className="modal_sumbit_btn mt-3 ">Submit</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProccedModal;
