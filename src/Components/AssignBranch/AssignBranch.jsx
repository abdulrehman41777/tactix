import React, { useState } from "react";
import { useAssignBranchToAdminMutation, useUpdate_BranchMutation } from "../../redux/Branch/Branch";
import { NotificationAlert } from "../NotificationAlert/NotificationAlert";
import { useSelector } from "react-redux";
import { useAll_AdminsQuery } from "../../redux/Admin/admin";

const AssignBranch = ({ setAssignBranch, branchDetail }) => {
  const [branch_fields, setBranch_fields] = useState({
    branch_name: branchDetail?.branch_name,
    branch_address: branchDetail?.branch_address,
    branch_contact_number: branchDetail?.branch_contact_number,
  });

  const { branch_name, branch_address, branch_contact_number } = branch_fields;

  const [adminID, setAdminID] = useState([]);


  const handleBranchFields = (e) => {
    setBranch_fields({ ...branch_fields, [e.target.name]: e.target.value });
  };
  const [assignBranch, { isLoading }] = useAssignBranchToAdminMutation();

  const selector = useSelector((state) => state?.userData);
  const branchID = branchDetail?._id;
  const id = selector?.data?.user?._id;

  console.log(branchDetail, "branchDetail")

  const All_Admins_API = useAll_AdminsQuery(id, { skip: !id });
  const All_Admins = All_Admins_API?.data?.createdRoles;


  // const handleChange = (e) => {
  //   setAdminID((prev) => {
  //     const value = e.target.value;
  //     if (!prev.includes(value)) {
  //       return [...prev, value];
  //     }
  //     return prev;
  //   });
  // };

  const handleChange = (e) => {
    const selectedAdmin = e.target.value;
    // Check if admin is already selected to avoid duplicates
    if (!adminID.includes(selectedAdmin)) {
      setAdminID([...adminID, selectedAdmin]);
    }
  };

  const handleRemoveAdmin = (id) => {
    // Filter out the admin by ID and update the state
    setAdminID(adminID.filter((admin) => admin !== id));
  };

  const handleAddBranch = async (e) => {
    e.preventDefault();
    if (adminID.length !== 0) {
      try {
        const res = await assignBranch({
          superAdminId: id,
          branchId: branchID,
          data: { AdminIds: adminID },
        });
        console.log(res.error)
        if (!res.error) {
          NotificationAlert("Branch Updated successfully", "success");
          setAssignBranch(false);
        } else if (
          res.error.data.errors.find(
            (err) => err.path === "branch_contact_number"
          )
        ) {
          NotificationAlert("Invalid Contact Number");
        }
      } catch (error) {
        NotificationAlert("Something went wrong");
      }
    } else {
      NotificationAlert("All Fields Required");
    }
  };

  console.log(adminID)


  return (
    <div className="modal_wrapper">
      <div className="modal_box">
        <div className="modal_head d-flex justify-content-center">
          <h2 className="f-bold pb-3">Assign Branch</h2>
          <span
            className="modal_close_btn"
            onClick={() => setAssignBranch(false)}
          >
            X
          </span>
        </div>
        <form className="mt-1 modal_form " onSubmit={handleAddBranch}>
          <select
            value={adminID.length === 0 ? "" : adminID[adminID.length - 1]}
            onChange={handleChange}
            className="text-dark bg-light w-100"
          >
            <option value="" disabled className="text-dark">
              Assign To Admins
            </option>
            {All_Admins?.map((item) => (
              <option value={item?._id} className="text-dark" key={item?._id}>
                {item?.name}
              </option>
            ))}
          </select>


          <div>
            {adminID.length === 0 ? (
              <div className="py-4">
                <p>No Admin Selected Yet</p>
              </div>
            ) : (
              <div className="py-4 d-flex">
                {adminID.map((id, i) => (
                  <p key={i} className="px-2 d-flex gap-2 text-white">
                    {All_Admins.find((admin) => admin._id === id)?.name || id}

                    <span role="button" onClick={() => handleRemoveAdmin(id)}>
                      X
                    </span>
                  </p>
                ))}
              </div>

            )}
          </div>

          {isLoading ? (
            <button className="modal_sumbit_btn mt-3 text-dark" disabled>
              Updating...
            </button>
          ) : (
            <button className="modal_sumbit_btn mt-3 text-dark">Assign</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AssignBranch;
