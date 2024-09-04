import React from "react";

const AddParcel = ({ setAddAdmin }) => {
  return (
    <div className="modal_wrapper">
      <div className="modal_box">
        <div className="modal_head d-flex justify-content-center">
          <h2 className="f-bold pb-3">Add New Parcel</h2>
          <span className="modal_close_btn" onClick={() => setAddAdmin(false)}>
            X
          </span>
        </div>
        <form className="mt-1 modal_form ">
          <input
            type="text"
            placeholder="Package Title"
            className="form-control mb-3"
            name="category_name"
          />
          <input
            type="number"
            placeholder="Package Price"
            className="form-control mb-3"
            name="price"
          />
          <select
            name="period"
            defaultValue={"default"}
            className="text-dark bg-light"
          >
            <option value="default" disabled className="text-dark">
              Select Period
            </option>
            <option value="Year" className="text-dark">
              Year
            </option>
            <option value="Monthly" className="text-dark">
              Month
            </option>
          </select>

          <button className="modal_sumbit_btn mt-3 text-dark">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddParcel;
