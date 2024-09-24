import React, { useState } from "react";
import Dlayout from "../../Components/DLayout/Dlayout";
import style from "./AllGroups.module.css";
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
import { useGetGroupQuery, useManagersQuery } from "../../redux/Manager/manager";

const AllGroups = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const [search, setSearch] = useState("");

  // User Data
  const selector = useSelector((state) => state?.userData);
  const role = selector?.data?.user?.role[0];
  const userID = selector?.data?.user?._id

  const navigate = useNavigate();

  const Get_Group_by_manager = useGetGroupQuery(userID, { skip: !userID });
  const Get_Groups = Get_Group_by_manager?.data?.RidersGroup;
  const isLoading = Get_Group_by_manager?.isLoading;


  const endOffset = itemOffset + 6;
  const pageCount = Math.ceil(Get_Groups?.length / 6);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 6) % Get_Groups?.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <Dlayout pageName="Groups" search={search} setSearch={setSearch}>
        <Container className={style.admin_wrapper}>
          <div className={`${style.table_wrapper}`}>
            <div className={style.admin_head}>
              <h4>Group's</h4>
              <button
                className={style.status_btn_paid}
              >
                Create Group
              </button>
            </div>
            {Get_Groups?.length === 0 ? (
              <Available message={"No Group Available"} />
            ) : (
              <div className={style.table_div}>
                {isLoading ? (
                  <ListLoader />
                ) : (
                  <table className={`${style.table_container}`}>
                    <thead className={`${style.table_header}`}>
                      <tr>
                        <th>Group Name</th>
                        <th>Created By</th>
                        <th>created time</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody className={`${style.table_body}`}>
                      {Get_Groups?.filter((item) =>
                        item?.groupname
                          ?.toLowerCase()
                          ?.includes(search?.toLowerCase())
                      )
                        ?.slice(itemOffset, endOffset)
                        ?.map((user, index) => (
                          <tr key={index}>
                            <td className="d-flex align-items-center">
                              {user?.groupname}
                            </td>
                            <td>{user?.BranchManagerID?.name}</td>
                            <td>{user?.createdAt?.split("T")?.[0]}</td>
                            {role === "Manager" ? (
                              <td>
                                <span className="d-flex gap-4">

                                  <button
                                    className={style.status_btn_paid}
                                    onClick={() =>
                                      navigate(`/dashboard/create-orders`, {
                                        state: { email: user?.email },
                                      })
                                    }
                                  >
                                    View
                                  </button>
                                  <button
                                    className={style.status_btn_paid}
                                    onClick={() =>
                                      navigate(`/dashboard/create-orders`, {
                                        state: { email: user?.email },
                                      })
                                    }
                                  >
                                    Add Rider
                                  </button>
                                </span>
                              </td>
                            ) :
                              (<button
                                className={style.status_btn_paid}
                                onClick={() =>
                                  navigate(`/dashboard/create-orders`, {
                                    state: { email: user?.email },
                                  })
                                }
                              >
                                View
                              </button>)
                            }
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
          {Get_Groups >= 6 && (
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

export default AllGroups;
