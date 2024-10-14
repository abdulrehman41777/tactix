import React, { useState } from "react";
import {
  useAssignBranchToAdminMutation,
  useUpdate_BranchMutation,
} from "../../redux/Branch/Branch";
import { NotificationAlert } from "../NotificationAlert/NotificationAlert";
import { useSelector } from "react-redux";
import { useAll_AdminsQuery } from "../../redux/Admin/admin";
import { MdCancel } from "react-icons/md";

const AssignBranch = ({ setAssignBranch, branchDetail, isRefetch }) => {
  const [branch_fields, setBranch_fields] = useState({
    branch_name: branchDetail?.branch_name,
    branch_address: branchDetail?.branch_address,
    branch_contact_number: branchDetail?.branch_contact_number,
  });

  const [adminID, setAdminID] = useState([]);

  const [assignBranch, { isLoading }] = useAssignBranchToAdminMutation();

  const selector = useSelector((state) => state?.userData);
  const branchID = branchDetail?._id;
  const id = selector?.data?.user?._id;

  const All_Admins_API = useAll_AdminsQuery(id, { skip: !id });
  const All_Admins = All_Admins_API?.data?.createdRoles;

  const filterAdmins = All_Admins?.filter(
    (admins) => !branchDetail?.AdminsId?.includes(admins?._id)
  );

  const handleChange = (e) => {
    const selectedAdmin = e.target.value;

    if (!adminID.includes(selectedAdmin)) {
      setAdminID([...adminID, selectedAdmin]);
    }
  };

  const handleRemoveAdmin = (id) => {
    setAdminID(adminID.filter((admin) => admin !== id));
  };

  const handleAddBranch = async (e) => {
    e.preventDefault();
    try {
      if (adminID.length === 0) {
        return NotificationAlert("Select atleast one admin");
      }
      const res = await assignBranch({
        superAdminId: id,
        branchId: branchID,
        data: { AdminIds: adminID },
      });

      if (!res.error) {
        setAssignBranch(false);
        NotificationAlert("Branch Updated successfully", "success");
        isRefetch.refetch()
      } else {
        NotificationAlert(res.error.data.message);
      }
    } catch (error) {
      console.log(error);
      NotificationAlert("Something went wrong");
    }
  };

  return (
    <div className="modal_wrapper">
      <div className="modal_box">
        <div className="modal_head d-flex justify-content-center">
          <h2 className="f-bold pb-3">Assign Branch</h2>
          <MdCancel
            className="position-absolute "
            style={{ cursor: "pointer", right: 20, top: 20 }}
            size={20}
            onClick={() => setAssignBranch(false)}
          />
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
            {filterAdmins?.map((item) => (
              <option value={item?._id} className="text-dark" key={item?._id}>
                {item?.name}
              </option>
            ))}
          </select>

          <div>
            {adminID.length === 0 ? (
              <div className="py-4 text-center">
                <p>No Admin Selected Yet</p>
              </div>
            ) : (
              <div className="py-4 d-flex gap-1">
                {adminID.map((id, i) => (
                  <p
                    key={i}
                    className="p-2 d-flex gap-2 text-white rounded-4 align-items-center"
                    style={{ background: "var(--light-primary-background)" }}
                  >
                    {All_Admins.find((admin) => admin._id === id)?.name || id}
                    <MdCancel
                      onClick={() => handleRemoveAdmin(id)}
                      style={{ cursor: "pointer" }}
                    />
                  </p>
                ))}
              </div>
            )}
          </div>

          {isLoading ? (
            <button className="modal_sumbit_btn mt-3 text-white" disabled>
              Updating...
            </button>
          ) : (
            <button className="modal_sumbit_btn mt-3 text-white">Assign</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AssignBranch;
