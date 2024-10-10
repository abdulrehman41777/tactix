import React, { useState } from 'react'
import style from "./Accept.module.css";
import ListLoader from '../Loader/ListLoader';
import { NotificationAlert } from '../NotificationAlert/NotificationAlert';

const AcceptJobs = ({ isClose, data, HandleAcceptJob, AcceptLoading }) => {
    const [verifyTrachID, setVerifyTrachID] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [trackID, setTrackID] = useState(null)

    console.log(trackID === data?.assignment?.trackID.toString())
    console.log(isLoading, "load")
    console.log(verifyTrachID, "verifyTrachID")

    const handleVerify = () => {
        try {
            if (trackID === null) {
                return NotificationAlert("Please enter track ID")
            }
            setIsLoading(true);
            if (trackID === data?.assignment?.trackID.toString()) {
                setTimeout(() => {
                    setVerifyTrachID(true);
                    setIsLoading(false);
                }, 1000);
            } else {
                setTimeout(() => {
                    setIsLoading(false);
                    NotificationAlert("Wrong track ID")

                }, 1000);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    return (
        <div className="modal_wrapper">
            <div className="modal_box">
                <div className="modal_head d-flex justify-content-center">
                    <h2 className="f-bold pb-3">Accept Job</h2>
                    <span className="modal_close_btn" onClick={() => isClose(null)}>
                        X
                    </span>
                </div>
                <div className='d-flex w-100 align-items-center gap-2'>
                    {isLoading ?
                        <div className='w-100 align-items-center justify-content-center d-flex'>
                            <ListLoader />
                        </div>
                        : verifyTrachID === false ?
                            <>
                                <input
                                    type="number"
                                    placeholder="Search order"
                                    className={style.header_input_wrapper}
                                    style={{ width: "80%" }}
                                    onChange={(e) => setTrackID(e.target.value)}
                                    value={trackID}
                                />
                                <button className='p-2 rounded-2 border-0' style={{ backgroundColor: "var(--btn-bg)" }}
                                    onClick={handleVerify}>Check</button>
                            </> :
                            <button className='p-2 rounded-2 border-0' style={{ backgroundColor: "var(--btn-bg)", width: "100%" }} onClick={HandleAcceptJob} >
                                {AcceptLoading ? "Accepting" : "Accept"}

                            </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default AcceptJobs
