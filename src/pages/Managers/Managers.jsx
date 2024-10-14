import React, { useState } from "react";
import Dlayout from "../../Components/DLayout/Dlayout";
import style from "./manager.module.css";
import { Container } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import ListLoader from "../../Components/Loader/ListLoader";
import { useManagersQuery } from "../../redux/Manager/manager";
import { useNavigate } from "react-router-dom";
import Available from "../../Components/cards/Available";

const Managers = () => {
    const [itemOffset, setItemOffset] = useState(0);
    const [search, setSearch] = useState("");

    const selector = useSelector((state) => state?.userData);
    const id = selector?.data?.user?._id;
    const role = selector?.data?.user?.role[0];

    const navigate = useNavigate();

    // All Managers for Admin branch
    const branch_Managers = useManagersQuery({ adminID: id }, { skip: !id });
    const isLoading = branch_Managers?.isLoading;

    const Manager_Branch = branch_Managers?.data?.managers?.filter(
        (item) => item.role[0] === "Manager"
    );

    const endOffset = itemOffset + 6;
    const pageCount = Math.ceil(
        branch_Managers?.data?.managers?.filter((item) =>
            item?.name?.toLowerCase()?.includes(search?.toLowerCase())
        )?.length / 6
    );

    const handlePageClick = (event) => {
        const newOffset =
            (event.selected * 6) %
            branch_Managers?.data?.managers?.filter((item) =>
                item?.name?.toLowerCase()?.includes(search?.toLowerCase())
            )?.length;
        setItemOffset(newOffset);
    };

    function convertToDate(isoString) {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    return (
        <div>
            <Dlayout pageName="Managers" search={search} setSearch={setSearch}>
                <Container className={style.admin_wrapper}>
                    <div className={`${style.table_wrapper}`}>
                        <div className={style.admin_head}>
                            <h4>Managers</h4>
                        </div>
                        {(branch_Managers?.data?.managers?.length === 0) &&
                            <Available message={"No Managers Available"} />
                        }
                        <div className={style.table_div}>
                            {isLoading ? (
                                <ListLoader />
                            ) : (branch_Managers?.data?.managers?.length !== 0 && branch_Managers?.data?.managers !== undefined) ? (
                                <table className={`${style.table_container}`}>
                                    <thead className={`${style.table_header}`}>
                                        <tr>
                                            <th>NAME</th>
                                            <th>JOINED DATE</th>
                                            <th>ROLE</th>
                                            <th>ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody className={`${style.table_body}`}>
                                        {branch_Managers?.data?.managers?.filter((item) =>
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
                                                    <td>{convertToDate(user?.createdAt)}</td>
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
                            ) : null}

                        </div>
                    </div>
                    {branch_Managers?.data?.managers?.length >= 6 && (
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
    )
}

export default Managers
