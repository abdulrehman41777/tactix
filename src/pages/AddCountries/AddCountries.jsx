import React, { useState } from "react";
import Dlayout from "../../Components/DLayout/Dlayout";
import style from "./AddCountries.module.css";
import { Container } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import ListLoader from "../../Components/Loader/ListLoader";
import { BiPlus } from "react-icons/bi";
import AddCountry from "../../Components/AddCountry/AddCountry";
import { useAll_Country_DataQuery } from "../../redux/Country/country";
import AddState from "../../Components/AddCountry/AddState";
import AddCity from "../../Components/AddCountry/AddCity";

const AddCountries = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [addCountry, setAddCountry] = useState(false);
  const [addState, setAddState] = useState(false);
  const [addCity, setAddCity] = useState(false);
  const [stateName, setStateName] = useState("");

  //All Country API
  const All_Country_API = useAll_Country_DataQuery();

  // All Managers For SuperAdmin
  const isLoading = All_Country_API?.isLoading;
  const All_Country = All_Country_API?.data?.populatedData;

  const endOffset = itemOffset + 6;
  const pageCount = Math.ceil(All_Country?.length / 6);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 6) % All_Country?.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <Dlayout pageName="Countries" search={search} setSearch={setSearch}>
        <Container className={style.admin_wrapper}>
          <div className="d-flex justify-content-end gap-5">
            <h4
              className={`f-bold ${style.add_btn_heading} mt-5 pb-4 justify-content-end`}
            >
              <span className={style.add_btn} onClick={() => setAddCity(true)}>
                <BiPlus className={style.plus_sambol} />
              </span>
              CREATE NEW CITY
            </h4>
            <h4
              className={`f-bold ${style.add_btn_heading} mt-5 pb-4 justify-content-end`}
            >
              <span className={style.add_btn} onClick={() => setAddState(true)}>
                <BiPlus className={style.plus_sambol} />
              </span>
              CREATE NEW STATE
            </h4>
            <h4
              className={`f-bold ${style.add_btn_heading} mt-5 pb-4 justify-content-end`}
            >
              <span
                className={style.add_btn}
                onClick={() => setAddCountry(true)}
              >
                <BiPlus className={style.plus_sambol} />
              </span>
              CREATE NEW COUNTRY
            </h4>
          </div>
          <div className={`${style.table_wrapper}`}>
            <div className={style.admin_head}>
              <h4>Countries</h4>
              <div className={style.task_head_dots} title="Add Countries">
                <BsThreeDots className={style.icon} />
              </div>
            </div>
            <div className={style.table_div}>
              {/* For SuperAdmin */}

              {isLoading ? (
                <ListLoader />
              ) : (
                <table className={`${style.table_container}`}>
                  <thead className={`${style.table_header}`}>
                    <tr>
                      <th>COUNTRY NAME</th>
                      <th>STATE</th>
                      <th>CITY</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody className={`${style.table_body}`}>
                    {All_Country?.filter((item) =>
                      item?.country
                        ?.toLowerCase()
                        ?.includes(search?.toLowerCase())
                    )
                      ?.slice(itemOffset, endOffset)
                      ?.map((user, index) => (
                        <tr key={index}>
                          <td className="d-flex align-items-center">
                            {user?.country}
                          </td>
                          <td>
                            <select
                              onChange={(e) => setStateName(e.target.value)}
                              className="text-light me-3"
                              style={{
                                background: "#593bfb",
                              }}
                            >
                              <option value="default" className="text-light">
                                Select State
                              </option>
                              {user?.states?.map((item, index) => (
                                <option
                                  className="text-light"
                                  key={index}
                                  value={item.state}
                                >
                                  {item.state}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <select
                              className="text-light me-3"
                              style={{
                                background: "#593bfb",
                              }}
                              key={index}
                            >
                              {user?.states?.filter(
                                (item) => item.state === stateName
                              )?.length > 0 ? (
                                <>
                                  {user.states
                                    .filter(
                                      (item) => item.state === stateName
                                    )[0]
                                    .cities.map((city, index) => (
                                      <option
                                        className="text-light"
                                        key={index}
                                      >
                                        {city}
                                      </option>
                                    ))}
                                </>
                              ) : (
                                <option value="default" className="text-light">
                                  No Cities Available
                                </option>
                              )}
                            </select>
                          </td>
                          <td>
                            <button className={style.status_btn_paid}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          {All_Country >= 6 && (
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
      {addCountry && <AddCountry setAddAdmin={setAddCountry} />}
      {addState && <AddState setAddAdmin={setAddState} />}
      {addCity && <AddCity setAddAdmin={setAddCity} />}
    </div>
  );
};

export default AddCountries;
