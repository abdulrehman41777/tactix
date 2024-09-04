import React, { useState } from "react";
import {
  useAdd_StateMutation,
  useAll_countryQuery,
} from "../../redux/Country/country";
import { NotificationAlert } from "../NotificationAlert/NotificationAlert";
import { useSelector } from "react-redux";

const AddState = ({ setAddAdmin }) => {
  const [stateName, setstateName] = useState("");
  const [countryID, setCountryID] = useState("");

  //Add State
  const [Add_State_API, { isLoading }] = useAdd_StateMutation();

  //All Country API
  const All_Country_API = useAll_countryQuery();

  // All country
  const All_Country = All_Country_API?.data?.countries;
  const selector = useSelector((state) => state?.userData);
  const id = selector?.data?.user?._id;
  const token = selector?.data?.token;

  const handleAddCountry = async (e) => {
    e.preventDefault();
    try {
      if (stateName && countryID && countryID !== "default") {
        const res = await Add_State_API({
          id,
          token,
          data: { countryID, state: stateName },
        });
        if (!res.error) {
          NotificationAlert("Country Added Successfully", "success");
          setstateName("");
          setAddAdmin(false);
        } else {
          NotificationAlert(res?.error?.data?.message);
        }
      } else {
        NotificationAlert("All Fields Required");
      }
    } catch (error) {
      NotificationAlert("Error");
    }
  };

  return (
    <div className="modal_wrapper">
      <div className="modal_box">
        <div className="modal_head d-flex justify-content-center">
          <h2 className="f-bold pb-3">Add New State</h2>
          <span className="modal_close_btn" onClick={() => setAddAdmin(false)}>
            X
          </span>
        </div>
        <form className="mt-1 modal_form " onSubmit={handleAddCountry}>
          <input
            type="text"
            placeholder="State Name"
            className="form-control mb-3"
            onChange={(e) => setstateName(e.target.value)}
            value={stateName}
          />

          <select
            value={countryID}
            onChange={(e) => setCountryID(e.target.value)}
            className=" bg-light"
          >
            <option value="default" className="">
              Select a country
            </option>
            {All_Country?.map((item) => (
              <option value={item._id} className="" key={item._id}>
                {item.country}
              </option>
            ))}
          </select>
          {isLoading ? (
            <button className="modal_sumbit_btn mt-3 " disabled>
              Submitting...
            </button>
          ) : (
            <button className="modal_sumbit_btn mt-3 ">Submit</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddState;
