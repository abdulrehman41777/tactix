import React, { useState } from "react";
import { useAdd_branchMutation } from "../../redux/Branch/Branch";
import { NotificationAlert } from "../NotificationAlert/NotificationAlert";
import { useSelector } from "react-redux";
import {
  useAll_CityQuery,
  useAll_StateQuery,
  useAll_countryQuery,
} from "../../redux/Country/country";
import { useAll_AdminsQuery } from "../../redux/Admin/admin";

const AddBranch = ({ setAddAdmin }) => {
  const [branch_fields, setBranch_fields] = useState({
    branch_name: "",
    branch_address: "",
    branch_contact_number: "",
  });
  const [countryID, setCountryID] = useState("");
  const [stateID, setStateID] = useState("");
  // const [adminID, setAdminID] = useState([]);

  const { branch_name, branch_address, branch_contact_number } = branch_fields;

  const handleBranchFields = (e) => {
    setBranch_fields({ ...branch_fields, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setAdminID((prev) => {
      const value = e.target.value;
      if (!prev.includes(value)) {
        return [...prev, value];
      }
      return prev;
    });
  };

  const [addBranch, { isLoading }] = useAdd_branchMutation();

  const selector = useSelector((state) => state?.userData);
  const id = selector?.data?.user?._id;

  const All_Admins_API = useAll_AdminsQuery(id, { skip: !id });
  const All_Admins = All_Admins_API?.data?.createdRoles;

  const handleAddBranch = async (e) => {
    e.preventDefault();
    if (
      branch_name &&
      branch_address &&
      branch_contact_number

    ) {
      try {
        const res = await addBranch({
          superAdminID: id,
          data: {
            branch_name: branch_name,
            branch_address: branch_address,
            branch_contact_number: branch_contact_number,

          },
        });
        if (!res.error) {
          NotificationAlert("Branch added successfully", "success");
          setBranch_fields({
            branch_name: "",
            branch_address: "",
            branch_contact_number: "",
          });
          setCountryID("");
          setStateID("");
          setCityID("");
          setAddAdmin(false);
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


  return (
    <div className="modal_wrapper">
      <div className="modal_box">
        <div className="modal_head d-flex justify-content-center">
          <h2 className="f-bold pb-3">Add New Branch</h2>
          <span className="modal_close_btn" onClick={() => setAddAdmin(false)}>
            X
          </span>
        </div>
        <form className="mt-1 modal_form " onSubmit={handleAddBranch}>
          <input
            type="text"
            placeholder="Branch Name"
            className="form-control mb-3 text-white"
            name="branch_name"
            value={branch_name}
            onChange={handleBranchFields}
          />
          <input
            type="text"
            placeholder="Branch Address"
            className="form-control mb-3 text-white"
            value={branch_address}
            name="branch_address"
            onChange={handleBranchFields}
          />
          <input
            type="number"
            placeholder="Contact"
            className="form-control mb-3 text-white"
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
              Creating Branch...
            </button>
          ) : (
            <button className="modal_sumbit_btn mt-3 text-white">Submit</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddBranch;
