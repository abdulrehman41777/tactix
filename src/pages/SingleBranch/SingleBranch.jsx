import React, { useEffect, useState } from "react";
import Dlayout from "../../Components/DLayout/Dlayout";
import style from "./singleBranch.module.css";
import { ImStatsBars2 } from "react-icons/im";
import { BiDollar } from "react-icons/bi";
import { GiCheckMark } from "react-icons/gi";
import flag from "../../assets/home/sidebar-flag.png";
import { BsFileTextFill } from "react-icons/bs";
import LineC from "../../Components/lineChart/LineC";
import BarC from "../../Components/barCharts/BarC";
import Task from "../../Components/task/Task";
import Calender from "../../Components/calender/Calender";
import Visitors from "../../Components/Visitors/Visitors";
import PieChart from "../../Components/PieChart/PieChart";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleBranchQuery } from "../../redux/Branch/Branch";
import { MdRemoveRedEye } from "react-icons/md";

const SingleBranch = () => {
    const [branchDetails, setBranchDetails] = useState({
        branchAdmins: [],
        parcels: [],
        groups: [],
        users: []
    })

    const { id } = useParams()

    const navigation = useNavigate()

    const getSingleBranchAPI = useGetSingleBranchQuery(id, { skip: !id })
    const getBranchData = getSingleBranchAPI?.data?.findBranch
    const getBranch = getSingleBranchAPI?.data

    useEffect(() => {
        setBranchDetails({
            branchAdmins: getBranchData?.AdminsId,
            parcels: getBranch?.parcels,
            groups: getBranch?.riders_group,
            users: getBranch?.users
        })
    }, [getSingleBranchAPI])

    return (
        <Dlayout pageName={getBranchData?.branch_name || "Name"}>
            <div className={style.home_header_wrapper}>
                <div className={style.home_slider_wrapper}>
                    <div className={style.home_slider_box}>
                        <div>
                            <p>Total Admins</p>
                            <h2>{getBranchData?.AdminsId?.length || "0"}</h2>
                        </div>
                        <span>
                            <MdRemoveRedEye color="#D8788C" style={{ cursor: "pointer" }} size={24} onClick={() => navigation(`/dashboard/branch/admins`, { state: branchDetails?.branchAdmins })} />
                        </span>
                    </div>
                    <div className={style.home_slider_box}>
                        <div>
                            <p>Total Parcels</p>
                            <h2>{getBranch?.parcels?.length || "0"}</h2>
                        </div>
                        <span>
                            <MdRemoveRedEye color="#D8788C" style={{ cursor: "pointer" }} size={24} />
                        </span>
                    </div>
                    <div className={style.home_slider_box}>
                        <div>
                            <p>Total Rider Groups</p>
                            <h2>{getBranch?.riders_group?.length || "0"}</h2>
                        </div>
                        <span>
                            <MdRemoveRedEye color="#D8788C" style={{ cursor: "pointer" }} size={24} onClick={() => navigation(`/dashboard/branch/groups`, { state: { groups: branchDetails?.groups, from: "branch" } })} />
                        </span>
                    </div>
                    <div className={style.home_slider_box}>
                        <div>
                            <p>Total Users</p>
                            <h2>{getBranch?.users?.length || "0"}</h2>
                        </div>
                        <span>
                            <MdRemoveRedEye color="#D8788C" style={{ cursor: "pointer" }} size={24} />
                        </span>
                    </div>
                </div>
                <div className={style.first_bars_row}>
                    <LineC />
                </div>
                <div className={style.second_bars_row}>
                    <BarC />
                    <Task />
                </div>
            </div>
        </Dlayout>
    )
}

export default SingleBranch
