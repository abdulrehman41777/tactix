import React, { useState } from "react";
import Dlayout from "../../Components/DLayout/Dlayout";
import style from "./parcel.module.css";
import { Container } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import ListLoader from "../../Components/Loader/ListLoader";
import {
    useGet_Group_ParcelQuery,
} from "../../redux/Parcel/Parcel";
import AddWeightPrice from "../../Components/AddWeightPrice/AddWeightPrice";
import UpdateWeightPrice from "../../Components/AddWeightPrice/UpdateWeightPrice";
import Available from "../../Components/cards/Available";
import Receipt from "../../Components/ReceiptCard/Receipt";
import { BiSearchAlt2 } from "react-icons/bi";
import Group_Parcel_Card from "../../Components/Rider_Parcel_Card/Group_Parcel_Card";

const GroupParcels = () => {
    const [getReceipt, setGetReceipt] = useState(false);
    const [addWeight, setAddWeight] = useState(false);
    const [itemOffset, setItemOffset] = useState(0);
    const [search, setSearch] = useState("");
    const [searchOrders, setSearchOrders] = useState("");
    const [updateWeightPeice, setUpdateWeightPeice] = useState(false);

    const selector = useSelector((state) => state?.userData);
    const riderGroupID = selector?.data?.user?.RiderGroup?._id;

    const Rider_Parcel_API = useGet_Group_ParcelQuery(riderGroupID, { skip: !riderGroupID });
    const Rider_Parcel = Rider_Parcel_API?.data?.assignments;

    const endOffset = itemOffset + 6;
    const pageCount = Math.ceil(Rider_Parcel?.length / 6);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * 6) % Rider_Parcel?.length;
        setItemOffset(newOffset);
    };

    return (
        <div>
            <Dlayout pageName="Group Parcels" search={search} setSearch={setSearch}>
                <Container className={style.admin_wrapper}>
                    <div className={`${style.table_wrapper}`}>
                        <div className={style.admin_head}>
                            <h4>Group Parcels</h4>

                            <div className={style.header_input_wrapper}>
                                <BiSearchAlt2 />
                                <input
                                    type="text"
                                    placeholder="Search order"
                                    onChange={(e) => setSearchOrders(e.target.value)}
                                    value={searchOrders}
                                />
                            </div>
                        </div>
                        {Rider_Parcel?.length === 0 ? (
                            <Available message={"No Parcel Available"} />
                        ) : (
                            <div className={`row ${style.card_wrapper}`}>
                                {false ? (
                                    <ListLoader />
                                ) : (
                                    Rider_Parcel?.filter(item => item?.assignment?.trackID?.toString()?.includes(searchOrders))?.slice(itemOffset, endOffset)?.map(
                                        (data, index) => (
                                            <Group_Parcel_Card
                                                data={data}
                                                key={index}
                                                setGetReceipt={setGetReceipt}
                                            />
                                        )
                                    )
                                )}
                            </div>
                        )}
                    </div>
                    {Rider_Parcel?.length >= 6 && (
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
            {addWeight && <AddWeightPrice setAddWeight={setAddWeight} />}
            {updateWeightPeice && (
                <UpdateWeightPrice setUpdateWeightPeice={setUpdateWeightPeice} />
            )}
            {getReceipt && <Receipt setGetReceipt={setGetReceipt} />}
        </div>
    )
}

export default GroupParcels
