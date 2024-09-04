import React, { useState } from "react";
import { useAdd_countryMutation } from "../../redux/Country/country";
import { NotificationAlert } from "../NotificationAlert/NotificationAlert";
import { useSelector } from "react-redux";

const AddCountry = ({ setAddAdmin }) => {
  const [countryName, setCountryName] = useState("");

  const [Add_Country_API, { isLoading }] = useAdd_countryMutation();

  const selector = useSelector((state) => state?.userData);
  const id = selector?.data?.user?._id;
  const token = selector?.data?.token;

  const handleAddCountry = async (e) => {
    e.preventDefault();
    try {
      if (countryName) {
        const res = await Add_Country_API({
          id,
          token,
          data: { country: countryName },
        });
        if (!res.error) {
          NotificationAlert("Country Added Successfully", "success");
          setCountryName("");
          setAddAdmin(false);
        } else {
          NotificationAlert(res?.error?.data?.message);
        }
      } else {
        NotificationAlert("Add Country Name Please");
      }
    } catch (error) {
      NotificationAlert("Error");
    }
  };

  return (
    <div className="modal_wrapper">
      <div className="modal_box">
        <div className="modal_head d-flex justify-content-center">
          <h2 className="f-bold pb-3">Add New Country</h2>
          <span className="modal_close_btn" onClick={() => setAddAdmin(false)}>
            X
          </span>
        </div>
        <form className="mt-1 modal_form " onSubmit={handleAddCountry}>
          <input
            type="text"
            placeholder="Country Name"
            className="form-control mb-3"
            onChange={(e) => setCountryName(e.target.value)}
            value={countryName}
          />
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

export default AddCountry;
