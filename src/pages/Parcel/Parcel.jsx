import React, { useState } from "react";
import Dlayout from "../../Components/DLayout/Dlayout";
import style from "./parcel.module.css";
import { Container } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import ListLoader from "../../Components/Loader/ListLoader";
import ShipmentCard from "../../Components/ShipmentCard/ShipmentCard";
import AddWeightPrice from "../../Components/AddWeightPrice/AddWeightPrice";
import UpdateWeightPrice from "../../Components/AddWeightPrice/UpdateWeightPrice";
import Available from "../../Components/cards/Available";
import Receipt from "../../Components/ReceiptCard/Receipt";
import { useGetParcelsQuery } from "../../redux/Parcel/Parcel";

const Parcel = () => {
  const [checkAssign, setCheckAssign] = useState("all");
  const [getReceipt, setGetReceipt] = useState(false);
  const [addWeight, setAddWeight] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [updateWeightPeice, setUpdateWeightPeice] = useState(false);

  const selector = useSelector((state) => state?.userData);
  const id = selector?.data?.user?._id;
  const role = selector?.data?.user?.role[0];

  const getParcelsApi = useGetParcelsQuery(id);
  const getParcelsLoading = getParcelsApi?.isLoading;

  console.log(getParcelsApi.data, "Helloo World")

  let Data = [];
  if (role === "SuperAdmin") {
    Data = getParcelsApi?.data?.parcels;
  } else if (role === "Admin" || role === "Manager") {
    Data = getParcelsApi?.data?.parcels;
  } else if (role === "User") {
    Data = getParcelsApi?.data?.parcels;
  }

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
          {role === "Manager" ? (
            <div className="d-flex justify-content-end pb-3">
              <select
                className="text-light me-3"
                style={{
                  background: "#D8788C",
                }}
                onChange={(e) => setCheckAssign(e.target.value)}
              >
                <option value="all" className="text-light">
                  All
                </option>
                <option value="Order Assigned" className="text-light">
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
            {checkAssign === "all" && (
              (
                <div className={`row ${style.card_wrapper}`}>
                  {
                    getParcelsLoading ? (
                      <ListLoader />
                    ) : (Data?.length === 0 || Data === undefined ? (
                      <Available message={"No Parcel Available"} />
                    ) : (
                      Data?.slice(itemOffset, endOffset)?.map((data, index) => (
                        <ShipmentCard
                          data={data}
                          key={index}
                          setGetReceipt={setGetReceipt}
                        />
                      ))
                    ))
                  }
                </div>
              )
            )}

            {checkAssign === "Order Assigned" &&
              <div className={`row ${style.card_wrapper}`}>
                {getParcelsLoading ?
                  <ListLoader />
                  : (Data?.filter(item => item?.assignment !== null)?.length === 0) ?
                    <Available message={"No Parcel Available"} /> :
                    (
                      Data?.filter(item => item?.assignment !== null)
                        ?.slice(itemOffset, endOffset)
                        ?.map((data, index) => (
                          <ShipmentCard
                            data={data}
                            key={index}
                            setGetReceipt={setGetReceipt}
                          />
                        ))
                    )}
              </div>
            }


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
