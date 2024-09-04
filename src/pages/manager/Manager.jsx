import React, { useState } from "react";
import Dlayout from "../../Components/DLayout/Dlayout";
import style from "./admin.module.css";
import { Container } from "react-bootstrap";
import { MdOutlineCancel } from "react-icons/md";
import { BsCheck, BsThreeDots } from "react-icons/bs";
import LineProgressBar from "../../Components/lineProgressBar/LineProgressBar";
import ReactPaginate from "react-paginate";
import ListLoader from "../../Components/Loader/ListLoader";
import { useUsersQuery } from "../../redux/Auth/auth";
import Available from "../../Components/cards/Available";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Manager = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const [search, setSearch] = useState("");

  // User Data
  const selector = useSelector((state) => state?.userData);
  const role = selector?.data?.user?.role[0];

  const navigate = useNavigate();

  const All_Users_API = useUsersQuery();
  const All_Users = All_Users_API?.data?.user;
  const isLoading = All_Users_API?.isLoading;

  const endOffset = itemOffset + 6;
  const pageCount = Math.ceil(All_Users?.length / 6);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 6) % All_Users?.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <Dlayout pageName="Customer" search={search} setSearch={setSearch}>
        <Container className={style.admin_wrapper}>
          <div className={`${style.table_wrapper}`}>
            <div className={style.admin_head}>
              <h4>Customer's</h4>
              <div className={style.task_head_dots}>
                <BsThreeDots className={style.icon} title="All Customers" />
              </div>
            </div>
            {All_Users?.length === 0 ? (
              <Available message={"No Customer Available"} />
            ) : (
              <div className={style.table_div}>
                {isLoading ? (
                  <ListLoader />
                ) : (
                  <table className={`${style.table_container}`}>
                    <thead className={`${style.table_header}`}>
                      <tr>
                        <th>NAME</th>
                        <th>ROLE</th>
                        <th>STATUS</th>
                        {role === "Manager" ? <th>ACTION</th> : null}
                      </tr>
                    </thead>
                    <tbody className={`${style.table_body}`}>
                      {All_Users?.filter((item) =>
                        item?.name
                          ?.toLowerCase()
                          ?.includes(search?.toLowerCase())
                      )
                        ?.slice(itemOffset, endOffset)
                        ?.map((user, index) => (
                          <tr key={index}>
                            <td className="d-flex align-items-center">
                              {user?.name}
                            </td>
                            <td>{user?.role[0]}</td>
                            <td>{user?.status[0]}</td>
                            {role === "Manager" ? (
                              <td>
                                {console.log(user?.email)}
                                <button
                                  className={style.status_btn_paid}
                                  onClick={() =>
                                    navigate(`/dashboard/create-orders`, {
                                      state: { email: user?.email },
                                    })
                                  }
                                >
                                  Create Parcel
                                </button>
                              </td>
                            ) : null}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
          {All_Users >= 6 && (
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
    </div>
  );
};

export default Manager;
