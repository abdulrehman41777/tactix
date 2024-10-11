import React, { useState } from 'react'
import { MdCancel } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";
import exportFromJSON from 'export-from-json';

const CreateBulkRate = ({ isClose, setFile, isLoading, handleBulkUpload, bulkRateList }) => {

    const filterItems = [
        {
            to: "USA",
            from: "UK",
            price: 200,
            shipmentType: "Premium",
        },
        {
            to: "PK",
            from: "Dubai",
            price: 250,
            shipmentType: "Economy",
        },
        {
            to: "UK",
            from: "PK",
            price: 300,
            shipmentType: "Express",
        },
    ]

    const handleClose = () => {
        isClose(false)
        setFile(null)
    }

    const exportFile = () => {
        const data = filterItems
        const fileName = 'Sample File'
        const exportType = exportFromJSON.types.csv
        exportFromJSON({ data, fileName, exportType })
    }

    return (
        <div className="modal_wrapper">
            <div className="modal_box">
                <div className="modal_head d-flex justify-content-center">
                    <h2 className="f-bold pb-3">Upload Bulk Ratelist</h2>
                    <span className="modal_close_btn" onClick={handleClose}>
                        <MdCancel />
                    </span>
                </div>
                <div className='d-flex flex-column gap-2'>
                    <div className='d-flex w-100 align-items-center gap-2'>
                        <div className='w-100'>
                            <label htmlFor="bulkrate" className='d-flex align-items-center justify-content-center'>
                                <span className="btn p-2 rounded text-white d-flex gap-2 align-items-center justify-content-center" style={{ background: 'var(--card-para)' }} >
                                    <FaFileUpload color='black' />

                                    <p className='text-black' style={{ fontWeight: "800" }}>
                                        {bulkRateList ? bulkRateList?.name?.split(".")[0]
                                            :
                                            "Select"
                                        }

                                    </p>
                                </span>

                            </label>
                            <input type="file" id="bulkrate" className="d-none" onChange={(e) => setFile(e.target.files[0])} accept=".csv, .xlsx" />
                        </div>
                    </div>
                    <div className='d-flex gap-2'>
                        <button
                            name="Create Product"
                            className="btn p-2 rounded text-white w-100"
                            style={{ background: '#D8788C' }}
                            onClick={handleBulkUpload}
                        >
                            {isLoading ? "Uploading..." :
                                "Upload"
                            }
                        </button>
                        <button
                            name="Create Product"
                            className="btn p-2 rounded text-white w-100"
                            style={{ background: '#D8788C' }}
                            onClick={exportFile}
                        >
                            Sample File
                        </button>
                    </div>
                </div>
                {/* } */}
            </div>
        </div>
    )
}

export default CreateBulkRate
