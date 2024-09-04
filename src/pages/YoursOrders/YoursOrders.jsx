import React, { useState } from "react";
import Dlayout from "../../Components/DLayout/Dlayout";
import style from "./admin.module.css";
import { Container } from "react-bootstrap";
import { MdOutlineCancel } from "react-icons/md";
import { BsCheck, BsThreeDots } from "react-icons/bs";
import LineProgressBar from "../../Components/lineProgressBar/LineProgressBar";
import ReactPaginate from "react-paginate";
import { BiPlus } from "react-icons/bi";
import AddParcel from "../../Components/AddParcel/AddParcel";
import { useUser_parcelQuery } from "../../redux/Parcel/Parcel";
import { useSelector } from "react-redux";

const YoursOrders = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const [search, setSearch] = useState("");

  // User Data
  const selector = useSelector((state) => state?.userData);
  const id = selector?.data?.user?._id;

  const userData = [
    {
      NAME: "Ups",
      STATUS: true,
      DATE: "2023-09-27",
      orderID: "#321nb32n1b",
    },
    {
      NAME: "Computer",
      STATUS: false,
      DATE: "2023-09-26",
      orderID: "#321nb32n1b",
    },
    {
      NAME: "Mouse",
      STATUS: true,
      DATE: "2023-09-25",
      orderID: "#321nb32n1b",
    },
    {
      NAME: "HeadPhone",
      STATUS: true,
      DATE: "2023-09-24",
      orderID: "#321nb32n1b",
    },
    {
      NAME: "Keyboard",
      STATUS: false,
      DATE: "2023-09-23",
      orderID: "#321nb32n1b",
    },
    {
      NAME: "Vape",
      STATUS: true,
      DATE: "2023-09-27",
      orderID: "#321nb32n1b",
    },
    {
      NAME: "Monitor",
      STATUS: false,
      DATE: "2023-09-26",
      orderID: "#321nb32n1b",
    },
    {
      NAME: "Keyboard",
      STATUS: false,
      DATE: "2023-09-23",
      orderID: "#321nb32n1b",
    },
    {
      NAME: "Vape",
      STATUS: true,
      DATE: "2023-09-27",
      orderID: "#321nb32n1b",
    },
    {
      NAME: "Monitor",
      STATUS: false,
      DATE: "2023-09-26",
      orderID: "#321nb32n1b",
    },
  ];

  //API for User only with UserID
  const User_Parcel_API = useUser_parcelQuery(id, { skip: !id });
  const User_isLoading = User_Parcel_API?.isLoading;
  const User_Parcel = User_Parcel_API?.data?.parcels;

  console.log(User_Parcel);

  const endOffset = itemOffset + 6;
  const pageCount = Math.ceil(userData?.length / 6);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 6) % userData?.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <Dlayout pageName="Packages" search={search} setSearch={setSearch}>
        <Container className={style.admin_wrapper}>
          <div className={`${style.table_wrapper}`}>
            <div className={style.table_div}>
              <table className={`${style.table_container}`}>
                <thead className={`${style.table_header}`}>
                  <tr>
                    <th>NAME</th>
                    <th>Order No.</th>
                    <th>STATUS</th>
                    <th>DATE</th>
                  </tr>
                </thead>
                <tbody className={`${style.table_body}`}>
                  {userData
                    ?.filter((item) =>
                      item?.NAME?.toLowerCase()?.includes(search?.toLowerCase())
                    )
                    ?.slice(itemOffset, endOffset)
                    ?.map((user, index) => (
                      <tr key={index}>
                        <td className="d-flex align-items-center">
                          {user?.NAME}
                        </td>
                        <td>{user?.orderID}</td>
                        <td>
                          {user?.STATUS ? (
                            <div className={style.status}>
                              <div className={style.status_check}>
                                <BsCheck />
                              </div>
                              Approved
                            </div>
                          ) : (
                            <div className={style.status}>
                              <div className={style.status_cancel}>
                                <MdOutlineCancel />
                              </div>
                              Disable
                            </div>
                          )}
                        </td>
                        <td>{user?.DATE}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
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
        </Container>
      </Dlayout>
    </div>
  );
};

export default YoursOrders;
