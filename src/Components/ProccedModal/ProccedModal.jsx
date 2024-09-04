import React, { useState } from "react";
import { useAssign_ParcelMutation } from "../../redux/Parcel/Parcel";
import { NotificationAlert } from "../NotificationAlert/NotificationAlert";
import { useSelector } from "react-redux";
import { useAll_RidersQuery } from "../../redux/Rider/rider";
import { useGet_TaxesQuery } from "../../redux/Taxes/taxes";

const ProccedModal = ({ setModal, parcelID, customerID }) => {
  const [packageDetail, setPackageDetail] = useState({
    tax: "",
    rider: "",
    message: "",
  });
  console.log(customerID);
  const selector = useSelector((state) => state?.userData);
  const branchID = selector?.data?.user?.branchID;
  const id = selector?.data?.user?._id;

  const { tax, rider, message } = packageDetail;

  const handlePackageDetail = (e) => {
    setPackageDetail({ ...packageDetail, [e.target.name]: e.target.value });
  };

  // All Taxes
  const All_Taxes_API = useGet_TaxesQuery();
  const All_Taxes = All_Taxes_API?.data?.taxDetails;
  console.log(All_Taxes);
  // All Rider
  const All_Rider_API = useAll_RidersQuery(branchID, { skip: !branchID });
  const All_Rider = All_Rider_API?.data?.riders;

  const [assign_parcel, { isLoading }] = useAssign_ParcelMutation();

  const handlePArcelAssign = async (e) => {
    e.preventDefault();
    try {
      const res = await assign_parcel({
        branchID,
        parcelID,
        data: {
          assignedFromManager: id,
          riderID: packageDetail.rider,
          taxID: packageDetail.tax,
          parcelID: parcelID,
          customerID: customerID,
        },
      });
      if (!res.error) {
        NotificationAlert("Parcel Assinged", "success");
      } else {
        NotificationAlert("Error");
      }
    } catch (error) {
      NotificationAlert("Error");
    }
  };

  return (
    <div className="modal_wrapper">
      <div className="modal_box">
        <div className="modal_head d-flex justify-content-center">
          <h2 className="f-bold pb-3">Add Package Detail</h2>
          <span className="modal_close_btn" onClick={() => setModal(false)}>
            X
          </span>
        </div>
        <form
          className="mt-1 modal_form d-flex flex-column gap-2"
          onSubmit={handlePArcelAssign}
        >
          <select
            name="rider"
            className="text-dark bg-light"
            onChange={(e) => handlePackageDetail(e)}
            value={rider}
          >
            <option value="" disabled defaultValue className="text-dark">
              Select Rider
            </option>
            {All_Rider?.map((rider) => (
              <option value={rider?._id} key={rider?._id} className="text-dark">
                {rider?.name}
              </option>
            ))}
          </select>
          <select
            name="tax"
            defaultValue={"default"}
            onChange={(e) => handlePackageDetail(e)}
            className="text-dark bg-light"
          >
            <option value="default" disabled className="text-dark">
              Select Tax
            </option>
            {All_Taxes?.map((tax) => (
              <option value={tax?._id} key={tax?._id} className="text-dark">
                {tax?.taxType} (Tax:{tax?.tax})
              </option>
            ))}
          </select>
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
