import React, { useState } from "react";
import Dlayout from "../../Components/DLayout/Dlayout";
import style from "./rider.module.css";
import { Container } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import ListLoader from "../../Components/Loader/ListLoader";
import { useAll_RidersQuery } from "../../redux/Rider/rider";
import Available from "../../Components/cards/Available";
import { useParams } from "react-router-dom";
const AllRiders = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const [search, setSearch] = useState("");

  const selector = useSelector((state) => state?.userData);
  const role = selector?.data?.user?.role[0];

  const { id: riderGroupID } = useParams()

  const allUsersApi = useAll_RidersQuery(riderGroupID);
  const isLoading = allUsersApi?.isLoading;
  const all_riders = allUsersApi?.data?.findGroupRiders;

  const endOffset = itemOffset + 6;
  const pageCount = Math.ceil(all_riders?.length / 6);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 6) % all_riders?.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <Dlayout pageName="All Drivers" search={search} setSearch={setSearch}>
        <Container className={style.admin_wrapper}>
          <div className={`${style.table_wrapper}`}>
            <div className={style.admin_head}>
              <h4>All Riders</h4>
              <div className={style.task_head_dots} title="All Drivers">
                <BsThreeDots className={style.icon} />
              </div>
            </div>
            {all_riders?.length === 0 ? (
              role === "Manager" ? (
                <Available
                  message={"No Drivers Available"}
                  buttonName={"Create Drivers"}
                />
              ) : (
                <Available message={"No Drivers Available"} />
              )
            ) : (
              <div className={style.table_div}>
                {isLoading ? (
                  <ListLoader />
                ) : (
                  <table className={`${style.table_container}`}>
                    <thead className={`${style.table_header}`}>
                      <tr>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>Join Date</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody className={`${style.table_body}`}>
                      {all_riders
                        ?.filter((item) =>
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
                            <td>{user?.email}</td>
                            <td>{user?.createdAt?.split("T")?.[0]}</td>
                            <td>
                              <button className={style.status_btn_paid}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
          {all_riders?.length >= 6 && (
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

export default AllRiders;
