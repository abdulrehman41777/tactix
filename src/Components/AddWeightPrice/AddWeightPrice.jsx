import React, { useState } from "react";
import { useCreate_Parcel_PriceMutation } from "../../redux/ParcelPrice/ParcelPrice";
import { NotificationAlert } from "../NotificationAlert/NotificationAlert";
import { useSelector } from "react-redux";

const AddWeightPrice = ({ setAddWeight }) => {
  const [perKg, setPerKg] = useState("");

  // handle user Data
  const selector = useSelector((state) => state?.userData);
  const branchID = selector?.data?.user?.branchID;
  const id = selector?.data?.user?._id;
  const token = selector?.data?.token;

  const [Add_Weight_Price, { isLoading }] = useCreate_Parcel_PriceMutation();

  const handleAddWeight = async (e) => {
    e.preventDefault();
    try {
      if (perKg !== "") {
        const res = await Add_Weight_Price({
          id: id,
          branchID: branchID,
          token: token,
          data: { perKg },
        });
        if (!res.error) {
          NotificationAlert("Weight Price Added Successfully", "success");
          setPerKg("");
          setAddWeight(false);
        } else {
          NotificationAlert("Error Adding Weight Price");
        }
      } else {
        NotificationAlert("All Fields Required");
      }
    } catch (error) {
      NotificationAlert("Error adding weight");
    }
  };

  return (
    <div className="modal_wrapper">
      <div className="modal_box">
        <div className="modal_head d-flex justify-content-center">
          <h2 className="f-bold pb-3">Add Tax</h2>
          <span className="modal_close_btn" onClick={() => setAddWeight(false)}>
            X
          </span>
        </div>
        <form className="mt-1 modal_form " onSubmit={handleAddWeight}>
          <input
            type="number"
            placeholder="Enter Weight Price"
            className="form-control mb-3"
            name="category_name"
            value={perKg}
            onChange={(e) => setPerKg(e.target.value)}
          />
          {isLoading ? (
            <button className="modal_sumbit_btn mt-3 text-dark" disabled>
              Submiting
            </button>
          ) : (
            <button className="modal_sumbit_btn mt-3 text-dark">Submit</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddWeightPrice;
