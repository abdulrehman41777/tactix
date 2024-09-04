import React from "react";
import style from "./addtax.module.css";
import Dlayout from "../../Components/DLayout/Dlayout";
import { Container } from "react-bootstrap";
import { useState } from "react";
import {
  useAdd_TaxesMutation,
  useGet_TaxesQuery,
} from "../../redux/Taxes/taxes";
import { NotificationAlert } from "../../Components/NotificationAlert/NotificationAlert";
import { BsThreeDots } from "react-icons/bs";
import ListLoader from "../../Components/Loader/ListLoader";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { IoMdAddCircle } from "react-icons/io";

const AddTax = () => {
  const [itemOffset, setItemOffset] = useState(0);

  const [fields, setFields] = useState({
    taxType: "",
    tax: "",
  });

  const { taxType, tax } = fields;

  const handleTaxFields = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  // handle user Data
  const selector = useSelector((state) => state?.userData);
  const role = selector?.data?.user?.role[0];

  const [taxes, { isLoading }] = useAdd_TaxesMutation();

  const handleAddTax = async () => {
    if (taxType !== "" && tax !== "") {
      try {
        const res = await taxes(fields);
        if (!res.error) {
          NotificationAlert("Add tax Successfully", "success");
          setFields({
            tax: "",
            taxType: "",
          });
        } else {
          NotificationAlert("Error adding tax");
        }
      } catch (error) {
        NotificationAlert("Error adding tax");
      }
    } else {
      NotificationAlert("All Fields Required");
    }
  };

  // API FOR GET ALL TAXES
  const Get_All_Taxes_API = useGet_TaxesQuery();
  const GET_TAXES_ISLOADING = Get_All_Taxes_API?.isLoading;
  const Get_All_Taxes = Get_All_Taxes_API?.data?.taxDetails;

  console.log(Get_All_Taxes);

  // Pagination
  const endOffset = itemOffset + 6;
  const pageCount = Math.ceil(Get_All_Taxes?.length / 6);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 6) % Get_All_Taxes?.length;
    setItemOffset(newOffset);
  };

  return (
    <Dlayout pageName="Add Tax">
      <Container
        style={{ paddingTop: "11rem" }}
        className={`d-flex flex-column gap-5 ${style.tax_container}`}
      >
        {role === "Admin" || role === "SuperAdmin" ? (
          <div className={style.add_tax_wrapper}>
            <div className={style.addTax_input}>
              <input
                type="text"
                placeholder="Select Tax Type"
                name="taxType"
                value={taxType}
                onChange={handleTaxFields}
              />
            </div>
            <div className={style.addTax_input}>
              <input
                type="number"
                placeholder="Add New Tax"
                name="tax"
                value={tax}
                onChange={handleTaxFields}
              />
            </div>
            {isLoading ? (
              <button className={style.status_btn_paid}>Adding</button>
            ) : (
              <button onClick={handleAddTax} className={style.status_btn_paid}>
                Add
              </button>
            )}
          </div>
        ) : null}

        <div className={style.table_wrapper}>
          <div className={style.admin_head}>
            <h4>TAXES</h4>
            <div className={style.task_head_dots}>
              <BsThreeDots className={style.icon} title="You Can Add Taxes" />
            </div>
          </div>
          <div className={style.table_div}>
            <table className={style.table_container}>
              <thead className={style.table_header}>
                <tr>
                  <th>TAX TYPE</th>
                  <th>TAX</th>
                  {role === "Manager" && <th>EDIT</th>}
                </tr>
              </thead>
              <tbody className={style.table_body}>
                {GET_TAXES_ISLOADING ? (
                  <ListLoader />
                ) : (
                  Get_All_Taxes?.slice(itemOffset, endOffset)?.map(
                    (user, index) => (
                      <tr key={index}>
                        <td className="d-flex align-items-center">
                          {user?.taxType}
                        </td>
                        <td>
                          <div className={style.status}>{user?.tax}</div>
                        </td>
                        {role === "Manager" && (
                          <td>
                            <button className={style.status_btn_paid}>
                              Update
                            </button>
                          </td>
                        )}
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
        {Get_All_Taxes?.length >= 6 && (
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
  );
};

export default AddTax;
