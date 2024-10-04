import React, { useState } from "react";
import Dlayout from "../../Components/DLayout/Dlayout";
import style from "./AllUsers.module.css";
import { Container } from "react-bootstrap";
import { MdOutlineCancel } from "react-icons/md";
import { BsCheck, BsThreeDots } from "react-icons/bs";
import LineProgressBar from "../../Components/lineProgressBar/LineProgressBar";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { useAll_UserQuery } from "../../redux/User/User";
import ListLoader from "../../Components/Loader/ListLoader";
import { useNavigate } from "react-router-dom";
import { useGetAllUserByBranchQuery } from "../../redux/Auth/auth";
const AllUsers = () => {
  const [filter, setFilter] = useState("all");
  const [itemOffset, setItemOffset] = useState(0);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const selector = useSelector((state) => state?.userData);
  const id = selector?.data?.user?.branchID;
  const role = selector?.data?.user?.role?.[0];

  const allUsersApi = useGetAllUserByBranchQuery(id);
  const isLoading = allUsersApi?.isLoading;
  const all_User = allUsersApi?.data?.data;

  const endOffset = itemOffset + 6;
  const pageCount = Math.ceil(all_User?.length / 6);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 6) % all_User?.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <Dlayout pageName="All Customers" search={search} setSearch={setSearch}>
        <Container className={style.admin_wrapper}>
          <div className={style.select_allUser}
          >
            {role === "Manager" &&
              <button
                className={`btn`}
                onClick={() => navigate("/dashboard/create-customer")}
                style={{ background: '#D8788C', color: '#fff' }}
              >
                Add Customer
              </button>
            }
          </div>
          <div className={`${style.table_wrapper}`}>
            <div className={style.admin_head}>
              <h4>All Customer's</h4>
              <div className={style.task_head_dots}>
                <BsThreeDots className={style.icon} title="All User's" />
              </div>
            </div>
            <div className={style.table_div}>
              {isLoading ? (
                <ListLoader />
              ) : (
                <table className={`${style.table_container}`}>
                  <thead className={`${style.table_header}`}>
                    <tr>
                      <th>NAME</th>
                      <th>Email</th>
                      <th>Password</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className={`${style.table_body}`}>
                    {all_User
                      ?.filter(
                        (item) =>
                          item?.name
                            ?.toLowerCase()
                            ?.includes(search?.toLowerCase()) &&
                          (filter === "all" || item.role[0] === filter)
                      )

                      ?.slice(itemOffset, endOffset)
                      ?.map((user, index) => (
                        <tr key={index}>
                          <td className="d-flex align-items-center">
                            {user?.name}
                          </td>
                          <td>{user?.email}</td>
                          <td>{user?.password}</td>
                          <td>
                            <button
                              className={style.status_btn_paid}
                              onClick={() => navigate(`/dashboard/all-user/customer-profile/${user?._id}`)}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          {all_User?.length >= 6 && (
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

export default AllUsers;
