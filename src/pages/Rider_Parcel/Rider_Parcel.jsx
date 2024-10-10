import React, { useState } from "react";
import Dlayout from "../../Components/DLayout/Dlayout";
import style from "./parcel.module.css";
import { Container } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import ListLoader from "../../Components/Loader/ListLoader";
import {
  useGet_Group_ParcelQuery,
  useGet_Rider_ParcelQuery,
} from "../../redux/Parcel/Parcel";
import AddWeightPrice from "../../Components/AddWeightPrice/AddWeightPrice";
import UpdateWeightPrice from "../../Components/AddWeightPrice/UpdateWeightPrice";
import Available from "../../Components/cards/Available";
import Receipt from "../../Components/ReceiptCard/Receipt";
import Rider_Parcel_Card from "../../Components/Rider_Parcel_Card/Rider_Parcel_Card";

const Rider_Parcel = () => {
  const [checkAssign, setCheckAssign] = useState("");
  const [getReceipt, setGetReceipt] = useState(false);
  const [addWeight, setAddWeight] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [updateWeightPeice, setUpdateWeightPeice] = useState(false);

  const fitlerArray = ['Return to Sender', 'Delivered', 'Undelivered', 'Transfer', 'History']

  const selector = useSelector((state) => state?.userData);
  const riderGroupID = selector?.data?.user?.RiderGroup?._id;
  const riderID = selector?.data?.user?._id;

  const Rider_Parcel_API = useGet_Rider_ParcelQuery({ riderID: riderID, history: checkAssign }, { skip: !riderGroupID });
  const Rider_Parcel = Rider_Parcel_API?.data?.assignments;

  const endOffset = itemOffset + 6;
  const pageCount = Math.ceil(Rider_Parcel?.length / 6);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 6) % Rider_Parcel?.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <Dlayout pageName="Parcels" search={search} setSearch={setSearch}>
        <Container className={style.admin_wrapper}>
          <div className="d-flex justify-content-end pb-3">
            <select
              className="text-light me-3"
              style={{
                background: "#D8788C",
              }}
              onChange={(e) => setCheckAssign(e.target.value)}
            >
              <option value="" className="text-light">
                All
              </option>
              {fitlerArray?.map((item, i) => (
                <option value={item} key={i} className="text-light">
                  {item}
                </option>
              ))}

            </select>
          </div>
          <div className={`${style.table_wrapper}`}>
            <div className={style.admin_head}>
              <h4>Parcels</h4>
              <div className={style.task_head_dots} title="Parcel's">
                <BsThreeDots className={style.icon} />
              </div>
            </div>

            {Rider_Parcel?.length === 0 ? (
              <Available message={"No Parcel Available"} />
            ) : (
              <div className={`row ${style.card_wrapper}`}>
                {false ? (
                  <ListLoader />
                ) : (
                  Rider_Parcel?.slice(itemOffset, endOffset)?.map(
                    (data, index) => (
                      <Rider_Parcel_Card
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
          {Rider_Parcel?.length >= 6 && (
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

export default Rider_Parcel;
