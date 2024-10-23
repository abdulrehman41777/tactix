import React, { useState } from "react";
import { useUpdate_BranchMutation } from "../../redux/Branch/Branch";
import { NotificationAlert } from "../NotificationAlert/NotificationAlert";
import { useSelector } from "react-redux";
import ResponseToast from "../toast/Toast";

const UpdateBranch = ({ setIsUpdateBranch, branchDetail }) => {
  const [branch_fields, setBranch_fields] = useState({
    branch_name: branchDetail?.branch_name,
    branch_address: branchDetail?.branch_address,
    branch_contact_number: branchDetail?.branch_contact_number,
  });

  const { branch_name, branch_address, branch_contact_number } = branch_fields;

  const handleBranchFields = (e) => {
    setBranch_fields({ ...branch_fields, [e.target.name]: e.target.value });
  };
  const [updateBranch, { isLoading }] = useUpdate_BranchMutation();

  const selector = useSelector((state) => state?.userData);
  const token = selector?.data?.token;
  const branchID = branchDetail?._id;

  const handleAddBranch = async (e) => {
    e.preventDefault();
    if (branch_name && branch_address && branch_contact_number) {
      try {
        const res = await updateBranch({
          id: branchID,
          data: {
            branch_name: branch_name,
            branch_address: branch_address,
            branch_contact_number: branch_contact_number,
          },
        });
        ResponseToast({ res });
        if (!res.error) {
          setIsUpdateBranch(false);
        }
      } catch (error) {
        ResponseToast({ message: "Internal Server Error", success: false })
      }
    } else {
      NotificationAlert("All Fields Required");
    }
  };

  return (
    <div className="modal_wrapper">
      <div className="modal_box">
        <div className="modal_head d-flex justify-content-center">
          <h2 className="f-bold pb-3">Update Branch</h2>
          <span
            className="modal_close_btn"
            onClick={() => setIsUpdateBranch(false)}
          >
            X
          </span>
        </div>
        <form className="mt-1 modal_form " onSubmit={handleAddBranch}>
          <input
            type="text"
            placeholder="Branch Name"
            className="form-control mb-3 text-black bg-white"
            name="branch_name"
            value={branch_name}
            onChange={handleBranchFields}
          />
          <input
            type="text"
            placeholder="Branch Address"
            className="form-control mb-3 text-black bg-white"
            value={branch_address}
            name="branch_address"
            onChange={handleBranchFields}
          />
          <input
            type="number"
            placeholder="Contact"
            className="form-control mb-3 text-black bg-white"
            value={branch_contact_number}
            name="branch_contact_number"
            onChange={(e) => {
              if (/^\d{0,11}$/.test(e.target.value)) {
                handleBranchFields(e);
              }
            }}
            maxLength="11"
          />
          {isLoading ? (
            <button className="modal_sumbit_btn mt-3 text-white" disabled>
              Updating...
            </button>
          ) : (
            <button className="modal_sumbit_btn mt-3 text-white">Update</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdateBranch;
