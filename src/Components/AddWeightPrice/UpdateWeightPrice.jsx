import React, { useState } from "react";
import {
  useCreate_Parcel_PriceMutation,
  useGet_All_Parcel_PriceQuery,
  useUpdate_Parcel_PriceMutation,
} from "../../redux/ParcelPrice/ParcelPrice";
import { NotificationAlert } from "../NotificationAlert/NotificationAlert";
import { useSelector } from "react-redux";
import style from "./weightPrice.module.css";
import ListLoader from "../Loader/ListLoader";

const UpdateWeightPrice = ({ setUpdateWeightPeice }) => {
  const [perKg, setPerKg] = useState("");
  const [perKgID, setPerKgID] = useState("");

  // handle user Data
  const selector = useSelector((state) => state?.userData);
  const branchID = selector?.data?.user?.branchID;
  const id = selector?.data?.user?._id;
  const token = selector?.data?.token;

  //API for getting Weight Pricing
  const All_Parcel_Price_API = useGet_All_Parcel_PriceQuery(branchID, {
    skip: !branchID,
  });
  const All_Parcel_Price_isloading = All_Parcel_Price_API?.isLoading;
  const All_Parcel_Price = All_Parcel_Price_API?.data?.weights;

  // API for Updating Weight Pricing
  const [Update_Weight_Pricing, { isLoading }] =
    useUpdate_Parcel_PriceMutation();

  const handleUpdatePrice = async () => {
    try {
      if (perKg !== "") {
        const res = await Update_Weight_Pricing({
          branchID,
          kgID: perKgID,
          token,
          data: { perKg },
        });
        if (!res.error) {
          NotificationAlert("Price updated successfully", "success");
          setPerKgID("");
          setPerKg("");
        } else {
          NotificationAlert("Error updating price");
        }
      } else {
        NotificationAlert("All Fields Required");
      }
    } catch (error) {
      NotificationAlert("Error updating price");
    }
  };

  return (
    <div className="modal_wrapper">
      <div className="modal_box">
        <div className="modal_head d-flex justify-content-center">
          <h2 className="f-bold pb-3">Update Tax</h2>
          <span
            className="modal_close_btn"
            onClick={() => setUpdateWeightPeice(false)}
          >
            X
          </span>
        </div>
        <div className={style.table_div}>
          <table className={`${style.table_container}`}>
            <thead className={`${style.table_header}`}>
              <tr>
                <th>TAX/PerKG</th>
                <th>UPDATE</th>
                <th>DELETE</th>
              </tr>
            </thead>
            {All_Parcel_Price_isloading ? (
              <ListLoader />
            ) : (
              All_Parcel_Price?.map((item) => (
                <tbody className={`${style.table_body}`} key={item?._id}>
                  <tr>
                    <td className="d-flex align-items-center">
                      {item?.perKg}/$
                    </td>
                    <td>
                      <button
                        className={style.status_btn_paid}
                        onClick={() => setPerKgID(item?._id)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button className={style.status_btn_paid}>Delete</button>
                    </td>
                  </tr>
                </tbody>
              ))
            )}
          </table>
          {perKgID !== "" ? (
            <>
              <input
                type="number"
                placeholder="Update Weight Price"
                className="form-control mb-3"
                onChange={(e) => setPerKg(e.target.value)}
                value={perKg}
              />
              {isLoading ? (
                <button className="modal_sumbit_btn mt-3 ">Submiting</button>
              ) : (
                <button
                  className="modal_sumbit_btn mt-3 "
                  onClick={handleUpdatePrice}
                >
                  Submit
                </button>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default UpdateWeightPrice;
