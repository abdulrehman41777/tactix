import React, { useState } from "react";
import {
  useAdd_CityMutation,
  useAdd_StateMutation,
  useAll_StateQuery,
  useAll_countryQuery,
} from "../../redux/Country/country";
import { NotificationAlert } from "../NotificationAlert/NotificationAlert";
import { useSelector } from "react-redux";

const AddCity = ({ setAddAdmin }) => {
  const [stateName, setstateName] = useState("");
  const [countryID, setCountryID] = useState("");
  const [stateID, setStateID] = useState("");

  const selector = useSelector((state) => state?.userData);
  const id = selector?.data?.user?._id;
  const token = selector?.data?.token;

  //Add State API
  const [Add_City_API, { isLoading }] = useAdd_CityMutation();

  //All Country API
  const All_Country_API = useAll_countryQuery();

  //All State API
  const All_State_API = useAll_StateQuery(countryID, { skip: !countryID });
  const All_State = All_State_API?.data?.states;

  // All Country
  const All_Country = All_Country_API?.data?.countries;

  //Handle API
  const handleAddCountry = async (e) => {
    e.preventDefault();
    try {
      if (
        stateName &&
        countryID &&
        countryID !== "default" &&
        stateID &&
        stateID !== "default"
      ) {
        const res = await Add_City_API({
          id,
          token,
          data: { countryID, stateID, city: stateName },
        });
        if (!res.error) {
          NotificationAlert("City Added Successfully", "success");
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
          <h2 className="f-bold pb-3">Add New City</h2>
          <span className="modal_close_btn" onClick={() => setAddAdmin(false)}>
            X
          </span>
        </div>
        <form className="mt-1 modal_form " onSubmit={handleAddCountry}>
          <input
            type="text"
            placeholder="City Name"
            className="form-control mb-3"
            onChange={(e) => setstateName(e.target.value)}
            value={stateName}
          />

          <select
            value={countryID}
            onChange={(e) => setCountryID(e.target.value)}
            className=" bg-light me-3"
          >
            <option value="default">Select a country</option>
            {All_Country?.map((item) => (
              <option value={item._id} key={item._id}>
                {item.country}
              </option>
            ))}
          </select>
          <select
            value={stateID}
            onChange={(e) => setStateID(e.target.value)}
            className=" bg-light"
          >
            <option value="default">Select a State</option>
            {All_State?.map((item) => (
              <option value={item._id} key={item._id}>
                {item.state}
              </option>
            ))}
          </select>
          {isLoading ? (
            <button className="modal_sumbit_btn mt-3 k" disabled>
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

export default AddCity;
