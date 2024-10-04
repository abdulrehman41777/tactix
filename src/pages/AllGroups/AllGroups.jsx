import React, { useEffect, useState } from "react";
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useCreateGroupMutation,
  useGetGroupByAdminQuery,
  useGetGroupQuery,
  useManagersQuery,
} from "../../redux/Manager/manager";
import { FaCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";

const AllGroups = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [groupData, setGroupData] = useState([]);
  const [createGroup, setCreateGroup] = useState({
    isOpen: false,
    groupname: null,
  });

  // User Data
  const selector = useSelector((state) => state?.userData);
  const role = selector?.data?.user?.role[0];
  const userID = selector?.data?.user?._id;
  const branchID = selector?.data;

  const navigate = useNavigate();

  const pathname = window.location.pathname;
  const isBranch = pathname?.split("/")?.includes("branch");

  // Get Data From Branch
  const location = useLocation();
  const data = location.state;

  // Get Group By Manager
  const Get_Group_by_manager = useGetGroupQuery(userID, {
    skip: !userID || role !== "Manager",
  });
  const Get_Groups = Get_Group_by_manager?.data?.RidersGroup;
  const isLoading = Get_Group_by_manager?.isLoading;

  // Get Group By Admin
  const Get_Group_by_Admin = useGetGroupByAdminQuery(
    { AdminId: userID },
    { skip: !userID || role !== "Admin" }
  );
  const Get_Groups_Admin = Get_Group_by_Admin?.data?.findRiderGroups;
  const AdminLoading = Get_Group_by_Admin?.isLoading;

  useEffect(() => {
    if (data?.from === "branch") {
      setGroupData(data?.groups);
    }

    if (role === "Manager") {
      setGroupData(Get_Groups);
    } else if (role === "Admin") {
      setGroupData(Get_Groups_Admin);
    }
  }, [data, Get_Group_by_manager, Get_Group_by_Admin]);

  // Create Group API
  const [createGroupAPI, { isLoading: createGroupLoad }] =
    useCreateGroupMutation();

  const handleCreateGroup = async () => {
    try {
      if (createGroupLoad) {
        return;
      }
      const res = await createGroupAPI({
        BranchManagerID: userID,
        BranchID: branchID,
        data: {
          groupname: createGroup.groupname,
        },
      });

      if (!res.error) {
        setCreateGroup((prev) => ({ ...prev, isOpen: false, groupname: "" }));
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              <div className="d-flex gap-4 align-items-center">
                {createGroup.isOpen && (
                  <input
                    type="text"
                    className="border-0 rounded-3 px-3 py-2"
                    style={{ background: "var(--light-secondary)" }}
                    placeholder="Group Name"
                    onChange={(e) =>
                      setCreateGroup((prev) => ({
                        ...prev,
                        groupname: e.target.value,
                      }))
                    }
                  />
                )}
                {role === "Manager" ? (
                  !createGroup.isOpen ? (
                    <button
                      className={style.status_btn_paid}
                      onClick={() =>
                        setCreateGroup((prev) => ({ ...prev, isOpen: true }))
                      }
                    >
                      Create Group
                    </button>
                  ) : (
                    <div className="d-flex gap-3">
                      <FaCheck
                        color="white"
                        size={20}
                        style={{ cursor: "pointer" }}
                        onClick={handleCreateGroup}
                      />
                      <MdCancel
                        color="white"
                        size={20}
                        onClick={() =>
                          setCreateGroup((prev) => ({ ...prev, isOpen: false }))
                        }
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  )
                ) : null}
              </div>
            </div>
            {groupData?.length === 0 ? (
              <Available message={"No Group Available"} />
            ) : (
              <div className={style.table_div}>
                {isLoading || AdminLoading ? (
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
                      {groupData
                        ?.filter((item) =>
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
                                      navigate(
                                        `/dashboard/groups/all-riders/${user?._id}`
                                      )
                                    }
                                  >
                                    View
                                  </button>
                                  <button
                                    className={style.status_btn_paid}
                                    onClick={() =>
                                      navigate(
                                        `/dashboard/create-rider/${user?._id}`
                                      )
                                    }
                                  >
                                    Add Rider
                                  </button>
                                </span>
                              </td>
                            ) : role === "Admin" ? (
                              <td>
                                <span className="d-flex gap-4">
                                  <button
                                    className={style.status_btn_paid}
                                    onClick={() =>
                                      navigate(
                                        `/dashboard/groups/all-riders/${user?._id}`
                                      )
                                    }
                                  >
                                    View
                                  </button>
                                </span>
                              </td>
                            ) : (
                              <button
                                className={style.status_btn_paid}
                                onClick={() =>
                                  isBranch
                                    ? navigate(
                                        `/dashboard/branch/groups/all-riders/${user?._id}`
                                      )
                                    : navigate(
                                        `/dashboard/create-rider/${user?._id}`
                                      )
                                }
                              >
                                View
                              </button>
                            )}
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
