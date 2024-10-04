import React, { useState } from "react";
import Dlayout from "../../Components/DLayout/Dlayout";
import style from "./admin.module.css";
import { Container } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { BiPlus } from "react-icons/bi";
import AddBranch from "../../Components/AddBranch/AddBranch";
import { useSelector } from "react-redux";
import {
  useAll_branchesQuery,
  useBranchesByAdminQuery,
} from "../../redux/Branch/Branch";
import { useNavigate } from "react-router-dom";
import UpdateBranch from "../../Components/UpdateBranch/UpdateBranch";
import AssignBranch from "../../Components/AssignBranch/AssignBranch";
import { FcInvite } from "react-icons/fc";
import { RxUpdate } from "react-icons/rx";
import { MdRemoveRedEye } from "react-icons/md";

const Branches = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [addAdmin, setAddAdmin] = useState(false);
  const [isUpdateBranch, setIsUpdateBranch] = useState(false);
  const [assignBranch, setAssignBranch] = useState(false);
  const [branchDetail, setBranchDetail] = useState(false);

  const selector = useSelector((state) => state?.userData);
  const role = selector?.data?.user?.role[0];
  const userID = selector?.data?.user?._id;

  //All Branch API
  const all_Branches_API = useAll_branchesQuery(userID, { skip: !userID });
  const All_branches = all_Branches_API?.data?.allbranches;

  const branchesByAdminQuery = useBranchesByAdminQuery(userID, {
    skip: !userID || role !== "Admin",
  });
  const branchesByAdminData = branchesByAdminQuery?.data?.findAdminBranches;

  const endOffset = itemOffset + 6;
  const pageCount = Math.ceil(All_branches?.length / 6);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 6) % All_branches?.length;
    setItemOffset(newOffset);
  };

  const handleBranchDetail = (item) => {
    setIsUpdateBranch(true);
    setBranchDetail(item);
  };
  const handleAssignBranchDetail = (item) => {
    setAssignBranch(true);
    setBranchDetail(item);
  };

  const navigation = useNavigate();

  return (
    <div>
      <Dlayout pageName="Branches" search={search} setSearch={setSearch}>
        <Container className={style.admin_wrapper}>
          {role === "SuperAdmin" && (
            <div className={style.add_admin_wrapper}>
              <h4 className={`f-bold ${style.add_btn_heading} `}>
                <span
                  className={style.add_btn}
                  onClick={() => setAddAdmin(true)}
                >
                  <BiPlus className={style.plus_sambol} />
                </span>
                Add New Branch
              </h4>
            </div>
          )}
          <div className={`${style.table_wrapper}`}>
            <div className={style.admin_head}>
              <h4>Branches</h4>
              <div className={style.task_head_dots} title="Branche's">
                <BsThreeDots className={style.icon} />
              </div>
            </div>
            <div className={style.table_div}>
              {role === "SuperAdmin" ? (
                <table className={`${style.table_container}`}>
                  <thead className={`${style.table_header}`}>
                    <tr>
                      <th>NAME</th>
                      <th>NUMBER</th>
                      <th>ADDRESS</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className={`${style.table_body}`}>
                    {All_branches?.filter((item) =>
                      item?.branch_name
                        ?.toLowerCase()
                        ?.includes(search?.toLowerCase())
                    )
                      ?.slice(itemOffset, endOffset)
                      ?.map((user, index) => (
                        <tr key={index}>
                          <td className="d-flex align-items-center">
                            {user?.branch_name}
                          </td>
                          <td>
                            <div className={style.status}>
                              {user?.branch_contact_number}
                            </div>
                          </td>
                          <td>{user?.branch_address}</td>

                          <td>
                            <span className="d-flex gap-2">
                              <FcInvite
                                color="#D8788C"
                                onClick={() => handleAssignBranchDetail(user)}
                                style={{ cursor: "pointer" }}
                              />
                              <RxUpdate
                                color="#D8788C"
                                onClick={() => handleBranchDetail(user)}
                                style={{ cursor: "pointer" }}
                              />
                              <MdRemoveRedEye
                                color="#D8788C"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  navigation(
                                    `/dashboard/branch/single-branch/${user?._id}`
                                  )
                                }
                              />
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <table className={`${style.table_container}`}>
                  <thead className={`${style.table_header}`}>
                    <tr>
                      <th>NAME</th>
                      <th>NUMBER</th>
                      <th>ADDRESS</th>
                      {/* <th>EDIT</th>
                        <th>INVITE ADMIN</th> */}
                    </tr>
                  </thead>
                  <tbody className={`${style.table_body}`}>
                    {branchesByAdminData
                      ?.filter((item) =>
                        item?.branch_name
                          ?.toLowerCase()
                          ?.includes(search?.toLowerCase())
                      )
                      ?.slice(itemOffset, endOffset)
                      ?.map((user, index) => (
                        <tr key={index}>
                          <td className="d-flex align-items-center">
                            {user?.branch_name}
                          </td>
                          <td>
                            <div className={style.status}>
                              {user?.branch_contact_number}
                            </div>
                          </td>
                          <td>{user?.branch_address}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          {All_branches?.length >= 6 && (
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
      {addAdmin && <AddBranch setAddAdmin={setAddAdmin} />}
      {isUpdateBranch && (
        <UpdateBranch
          setIsUpdateBranch={setIsUpdateBranch}
          branchDetail={branchDetail}
        />
      )}
      {assignBranch && (
        <AssignBranch
          setAssignBranch={setAssignBranch}
          branchDetail={branchDetail}
        />
      )}
    </div>
  );
};

export default Branches;
