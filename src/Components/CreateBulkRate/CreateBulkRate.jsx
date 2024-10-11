import React, { useState } from 'react'
import { MdCancel } from "react-icons/md";
const CreateBulkRate = ({ isClose, setFile, isLoading }) => {

    return (
        <div className="modal_wrapper">
            <div className="modal_box">
                <div className="modal_head d-flex justify-content-center">
                    <h2 className="f-bold pb-3">Upload Bulk Ratelist</h2>
                    <span className="modal_close_btn" onClick={() => isClose(null)}>
                        <MdCancel />
                    </span>
                </div>
                <div className='d-flex w-100 align-items-center gap-2'>
                    <div className='w-100'>
                        <label htmlFor="bulkrate" className='w-100'>
                            <span className="btn p-2 rounded text-white w-100" style={{ background: '#D8788C' }} >
                                {/* {isLoading ? "Uploading" : "Bulk Ratelist"} */}
                                Upload Bulk Ratelist
                            </span>
                        </label>
                        <input type="file" id="bulkrate" className="d-none" onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateBulkRate
