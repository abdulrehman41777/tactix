import React, { useState } from "react";
import Dlayout from "../../Components/DLayout/Dlayout";
import style from "./parcel.module.css";
import { Container } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import ListLoader from "../../Components/Loader/ListLoader";
import { useAll_RidersQuery } from "../../redux/Rider/rider";
import ShipmentCard from "../../Components/ShipmentCard/ShipmentCard";
import {
  useAll_parcelQuery,
  useBranch_parcelQuery,
  useParcel_AssignedQuery,
  useUser_parcelQuery,
} from "../../redux/Parcel/Parcel";
import ProccedModal from "../../Components/ProccedModal/ProccedModal";
import { BiPlus } from "react-icons/bi";
import AddWeightPrice from "../../Components/AddWeightPrice/AddWeightPrice";
import { useGet_All_Parcel_PriceQuery } from "../../redux/ParcelPrice/ParcelPrice";
import UpdateWeightPrice from "../../Components/AddWeightPrice/UpdateWeightPrice";
import Available from "../../Components/cards/Available";
import Receipt from "../../Components/ReceiptCard/Receipt";
import Assigned_Parcel from "../../Components/Assigned_Parcel/Assigned_Parcel";

const Parcel = () => {
  const [checkAssign, setCheckAssign] = useState("all");
  const [getReceipt, setGetReceipt] = useState(false);
  const [addWeight, setAddWeight] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [updateWeightPeice, setUpdateWeightPeice] = useState(false);

  const selector = useSelector((state) => state?.userData);
  const id = selector?.data?.user?._id;
  const branchID = selector?.data?.user?.branchID;
  const role = selector?.data?.user?.role[0];

  // API for SuperAdmin only
  const All_Parcel_API = useAll_parcelQuery();
  const Superadmin_isLoading = All_Parcel_API?.isLoading;
  const All_Parcel = All_Parcel_API?.data?.parcels;

  // API for manager or admin with branch ID
  const Branch_Parcel_API = useBranch_parcelQuery(branchID, {
    skip: !branchID,
  });
  const Admin_isLoading = Branch_Parcel_API?.isLoading;
  const Branch_Parcel = Branch_Parcel_API?.data?.parcel;
  console.log(Branch_Parcel);
  //API for User only with UserID
  const User_Parcel_API = useUser_parcelQuery(id, { skip: !id });
  const User_isLoading = User_Parcel_API?.isLoading;
  const User_Parcel = User_Parcel_API?.data?.parcels;

  let Data = [];

  if (role === "SuperAdmin") {
    Data = All_Parcel;
  } else if (role === "Admin" || role === "Manager") {
    Data = Branch_Parcel;
  } else if (role === "User") {
    Data = User_Parcel;
  }

  //API for getting Weight Pricing
  const All_Parcel_Price_API = useGet_All_Parcel_PriceQuery(branchID, {
    skip: !branchID,
  });
  const All_Parcel_Price = All_Parcel_Price_API?.data?.weights.length === 0;

  // Already Assigned Parcel
  const Parcel_Assigned_API = useParcel_AssignedQuery(branchID, {
    skip: !branchID,
  });
  const Parcel_Assigned = Parcel_Assigned_API?.data?.assignments;

  // pagination
  const endOffset = itemOffset + 6;
  const pageCount = Math.ceil(Data?.length / 6);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 6) % Data?.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <Dlayout pageName="Parcels" search={search} setSearch={setSearch}>
        <Container className={style.admin_wrapper}>
          {role === "Admin" && (
            <div className="d-flex justify-content-end gap-5">
              {All_Parcel_Price === false ? (
                <h4
                  className={`f-bold ${style.add_btn_heading} mt-5 pb-4 justify-content-end`}
                  onClick={() => setUpdateWeightPeice(true)}
                >
                  <span className={style.add_btn}>
                    <BiPlus className={style.plus_sambol} />
                  </span>
                  Update Parcel Price
                </h4>
              ) : (
                <h4
                  className={`f-bold ${style.add_btn_heading} mt-5 pb-4 justify-content-end`}
                  onClick={() => setAddWeight(true)}
                >
                  <span className={style.add_btn}>
                    <BiPlus className={style.plus_sambol} />
                  </span>
                  Add Parcel Price
                </h4>
              )}
            </div>
          )}
          {role === "Manager" ? (
            <div className="d-flex justify-content-end pb-3">
              <select
                className="text-light me-3"
                style={{
                  background: "#593bfb",
                }}
                onChange={(e) => setCheckAssign(e.target.value)}
              >
                <option value="all" className="text-light">
                  All
                </option>
                <option value="assigned" className="text-light">
                  Assigned
                </option>
              </select>
            </div>
          ) : null}
          <div className={`${style.table_wrapper}`}>
            <div className={style.admin_head}>
              <h4>Parcels</h4>
              <div className={style.task_head_dots} title="Parcel's">
                <BsThreeDots className={style.icon} />
              </div>
            </div>
            {checkAssign === "all" ? (
              Data?.length === 0 ? (
                <Available message={"No Parcel Available"} />
              ) : (
                <div className={`row ${style.card_wrapper}`}>
                  {Admin_isLoading || Superadmin_isLoading || User_isLoading ? (
                    <ListLoader />
                  ) : (
                    Data?.slice(itemOffset, endOffset)?.map((data, index) => (
                      <ShipmentCard
                        data={data}
                        key={index}
                        setGetReceipt={setGetReceipt}
                      />
                    ))
                  )}
                </div>
              )
            ) : Parcel_Assigned?.length === 0 ? (
              <Available message={"No Parcel Available"} />
            ) : (
              <div className={`row ${style.card_wrapper}`}>
                {Admin_isLoading || Superadmin_isLoading || User_isLoading ? (
                  <ListLoader />
                ) : (
                  Parcel_Assigned?.slice(itemOffset, endOffset)?.map(
                    (data, index) => (
                      <Assigned_Parcel
                        data={data}
                        key={index}
                        setGetReceipt={setGetReceipt}
                      />
                    )
                  )
                )}
              </div>
            )}
          </div>
          {Data?.length >= 6 && (
            <ReactPaginate
              breakLabel="..."
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              renderOnZeroPageCount={null}
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              containerClassName={"pagination"}
              previousLinkClassName={"pagination__link"}
              nextLinkClassName={"pagination__link"}
              disabledClassName={"pagination__link--disabled"}
              activeClassName={"pagination__link--active"}
            />
          )}
        </Container>
      </Dlayout>
      {addWeight && <AddWeightPrice setAddWeight={setAddWeight} />}
      {updateWeightPeice && (
        <UpdateWeightPrice setUpdateWeightPeice={setUpdateWeightPeice} />
      )}
      {getReceipt && <Receipt setGetReceipt={setGetReceipt} />}
    </div>
  );
};

export default Parcel;
