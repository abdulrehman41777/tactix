import React, { useState } from "react";
import Dlayout from "../../Components/DLayout/Dlayout";
import style from "./admin.module.css";
import { Container } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { useAll_UserQuery } from "../../redux/User/User";
import { useSelector } from "react-redux";
import ListLoader from "../../Components/Loader/ListLoader";
import { useManagersQuery } from "../../redux/Manager/manager";
import { useNavigate } from "react-router-dom";
const Admin = () => {

  const [itemOffset, setItemOffset] = useState(0);
  const [search, setSearch] = useState("");

  const selector = useSelector((state) => state?.userData);
  const id = selector?.data?.user?._id;
  const role = selector?.data?.user?.role[0];

  const navigate = useNavigate();


  // All Managers for Admin branch
  const Manager_Branch_API = useManagersQuery(
    { adminID: id },
    { skip: !id }
  );

  // console.log(Manager_Branch_API?.data?.managers, "Manager_Branch_API.data")

  const Manager_Branch = Manager_Branch_API?.data?.user?.filter(
    (item) => item.role[0] === "Manager"
  );
  // All Managers For SuperAdmin
  const All_Manager_API = useAll_UserQuery(id, { skip: !id });
  const isLoading = All_Manager_API?.isLoading;
  const All_User = All_Manager_API?.data?.user?.filter(
    (item) => item.role[0] === "Manager"
  );

  const endOffset = itemOffset + 6;
  const pageCount = Math.ceil(All_User?.length / 6);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 6) % All_User?.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <Dlayout pageName="Manager" search={search} setSearch={setSearch}>
        <Container className={style.admin_wrapper}>
          <div className={`${style.table_wrapper}`}>
            <div className={style.admin_head}>
              <h4>Manager's</h4>
              <div className={style.task_head_dots}>
                <button className="btn text-white"
                  onClick={() => navigate("/dashboard/create-manager")}
                >
                  Add Manager
                </button>
              </div>
            </div>
            <div className={style.table_div}>
              {/* For SuperAdmin */}
              {role === "SuperAdmin" ? (
                isLoading ? (
                  <ListLoader />
                ) : (
                  <table className={`${style.table_container}`}>
                    <thead className={`${style.table_header}`}>
                      <tr>
                        <th>NAME</th>
                        <th>BRANCH</th>
                        <th>ROLE</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody className={`${style.table_body}`}>
                      {Manager_Branch_API?.data?.managers?.filter((item) =>
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
                            <td>{user?.branchID?.branch_name}</td>
                            <td>{user?.role}</td>
                            <td>
                              <button className={style.status_btn_paid}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )
              ) : null}
              {/* For Admin */}

              {role === "Admin" ? (
                isLoading ? (
                  <ListLoader />
                ) : (
                  <table className={`${style.table_container}`}>
                    <thead className={`${style.table_header}`}>
                      <tr>
                        <th>NAME</th>
                        <th>BRANCH</th>
                        <th>ROLE</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody className={`${style.table_body}`}>
                      {Manager_Branch_API?.data?.managers?.filter((item) =>
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
                            <td>{user?.branchID?.branch_name}</td>
                            <td>{user?.role}</td>
                            <td>
                              <button className={style.status_btn_paid}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )
              ) : null}
            </div>
          </div>
          {All_User >= 6 && (
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

export default Admin;
