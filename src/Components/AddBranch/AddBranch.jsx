import React, { useState } from "react";
import { useAdd_branchMutation } from "../../redux/Branch/Branch";
import { NotificationAlert } from "../NotificationAlert/NotificationAlert";
import { useSelector } from "react-redux";
import {
  useAll_CityQuery,
  useAll_StateQuery,
  useAll_countryQuery,
} from "../../redux/Country/country";

const AddBranch = ({ setAddAdmin }) => {
  const [branch_fields, setBranch_fields] = useState({
    branch_name: "",
    branch_address: "",
    branch_contact_number: "",
  });
  const [countryID, setCountryID] = useState("");
  const [stateID, setStateID] = useState("");
  const [cityID, setCityID] = useState("");

  const { branch_name, branch_address, branch_contact_number } = branch_fields;

  const handleBranchFields = (e) => {
    setBranch_fields({ ...branch_fields, [e.target.name]: e.target.value });
  };

  const [addBranch, { isLoading }] = useAdd_branchMutation();

  const selector = useSelector((state) => state?.userData);
  const id = selector?.data?.user?._id;
  const token = selector?.data?.token;

  //All Country API
  const All_Country_API = useAll_countryQuery();
  const All_Country = All_Country_API?.data?.countries;

  //All State API
  const All_State_API = useAll_StateQuery(countryID, { skip: !countryID });
  const All_State = All_State_API?.data?.states;
  //All State API
  const All_City_API = useAll_CityQuery(stateID, { skip: !stateID });
  const All_City = All_City_API?.data?.cities;

  const handleAddBranch = async (e) => {
    e.preventDefault();
    if (
      branch_name &&
      branch_address &&
      branch_contact_number &&
      countryID &&
      countryID !== "default" &&
      stateID &&
      stateID !== "default" &&
      cityID &&
      cityID !== "default"
    ) {
      try {
        const res = await addBranch({
          id,
          token,
          data: {
            branch_name: branch_name,
            branch_address: branch_address,
            branch_contact_number: branch_contact_number,
            countryID,
            stateID,
            cityID,
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
            className="form-control mb-3"
            name="branch_name"
            value={branch_name}
            onChange={handleBranchFields}
          />
          <input
            type="text"
            placeholder="Branch Address"
            className="form-control mb-3"
            value={branch_address}
            name="branch_address"
            onChange={handleBranchFields}
          />
          <input
            type="number"
            placeholder="Contact"
            className="form-control mb-3"
            value={branch_contact_number}
            name="branch_contact_number"
            onChange={(e) => {
              if (/^\d{0,11}$/.test(e.target.value)) {
                handleBranchFields(e);
              }
            }}
            maxLength="11"
          />
          <select
            value={countryID}
            onChange={(e) => setCountryID(e.target.value)}
            className="text-dark bg-light"
          >
            <option value="default" className="text-dark">
              Select a country
            </option>
            {All_Country?.map((item) => (
              <option value={item._id} className="text-dark" key={item._id}>
                {item.country}
              </option>
            ))}
          </select>
          <select
            value={stateID}
            onChange={(e) => setStateID(e.target.value)}
            className="text-dark bg-light ms-2 "
          >
            <option value="default" className="text-dark">
              Select a State
            </option>
            {All_State?.map((item) => (
              <option value={item._id} className="text-dark" key={item._id}>
                {item.state}
              </option>
            ))}
          </select>
          <select
            value={cityID}
            onChange={(e) => setCityID(e.target.value)}
            className="text-dark bg-light ms-2"
          >
            <option value="default" className="text-dark">
              Select a City
            </option>
            {All_City?.map((item) => (
              <option value={item._id} className="text-dark" key={item._id}>
                {item.city}
              </option>
            ))}
          </select>
          {isLoading ? (
            <button className="modal_sumbit_btn mt-3 text-dark" disabled>
              Creating Branch...
            </button>
          ) : (
            <button className="modal_sumbit_btn mt-3 text-dark">Submit</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddBranch;
