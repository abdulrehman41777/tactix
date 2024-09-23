import React, { useState } from "react";
import Dlayout from "../../Components/DLayout/Dlayout";
import style from "./admin.module.css";
import { Container } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { useAll_AdminsQuery } from "../../redux/Admin/admin";
import alluser from "../../redux/User/User";
import Available from "../../Components/cards/Available";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SuperAdmin = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const [search, setSearch] = useState("");

  const selector = useSelector((state) => state?.userData);
  const userID = selector?.data?.user?._id;

  const All_Admins_API = useAll_AdminsQuery(userID, { skip: !userID });
  const All_Admins = All_Admins_API?.data?.createdRoles;

  const endOffset = itemOffset + 6;
  const pageCount = Math.ceil(All_Admins?.length / 6);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 6) % All_Admins?.length;
    setItemOffset(newOffset);
  };

  const navigate = useNavigate();


  return (
    <div>
      <Dlayout pageName="Admin" search={search} setSearch={setSearch}>
        <Container className={style.admin_wrapper}>
          <div className={`${style.table_wrapper}`}>
            <div className={style.admin_head}>
              <h4>Admin's</h4>
              <div className={style.task_head_dots}>
                {/* <BsThreeDots className={style.icon} title="All Admin" /> */}

                <button className="btn text-white" onClick={() => navigate("/dashboard/create-admin")} >
                  Add Admin
                </button>

              </div>
            </div>
            {alluser.length === 0 ? (
              <Available
                message={"No Admin Available"}
                to={"/dashboard/branch"}
                isButton={true}
                buttonName={"Create Admin"}
              />
            ) : (
              <div className={style.table_div}>
                <table className={`${style.table_container}`}>
                  <thead className={`${style.table_header}`}>
                    <tr>
                      <th>NAME</th>
                      <th>BRANCH</th>
                      <th>ROLE</th>
                      <th>PROGRESS</th>
                    </tr>
                  </thead>
                  <tbody className={`${style.table_body}`}>
                    {All_Admins?.filter((item) =>
                      item?.name?.toLowerCase()?.includes(search?.toLowerCase())
                    )
                      ?.slice(itemOffset, endOffset)
                      ?.map((user, index) => (
                        <tr key={index}>
                          <td className="d-flex align-items-center">
                            {user?.name}
                          </td>
                          <td>{user?.branchID?.branch_name}</td>
                          <td>{user?.role[0]}</td>
                          <td>
                            <button className={style.status_btn_paid}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          {All_Admins?.length >= 6 && (
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
    </div >
  );
};

export default SuperAdmin;
