import React, { useState } from "react";
import { Container } from "react-bootstrap";
import style from "./createparcel.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { NotificationAlert } from "../../Components/NotificationAlert/NotificationAlert";
import { useSelector } from "react-redux";
import * as EmailValidator from "email-validator";
import { useCreateParcelMutation } from "../../redux/Parcel/Parcel";
import {
  useAll_branchesQuery,
  useBranch_With_idQuery,
} from "../../redux/Branch/Branch";
import {
  useAll_CityQuery,
  useAll_StateQuery,
  useAll_countryQuery,
} from "../../redux/Country/country";

const CreateParcel = () => {
  const [branchID, setBranchID] = useState("");
  const [CountryID, setCountryID] = useState("");

  const [StateID, setStateID] = useState("");
  const [CityID, setCityID] = useState("");

  const location = useLocation();
  const userEmail = location?.state?.email;

  // User Data
  const selector = useSelector((state) => state?.userData);
  const userID = selector?.data?.user?._id;
  const role = selector?.data?.user?.role[0];

  const [percelFields, setPercelFields] = useState({
    parcelName: "",
    weight: "",
    customerPhone: "",
    recieverPhone: "",
    customerEmail: role === "Manager" ? userEmail : "",
    recieverEmail: "",
    fromAddress: "",
    toAddress: "",
  });

  // All Country API
  const All_Country_API = useAll_countryQuery();
  const All_Country = All_Country_API?.data?.countries;

  // All State API
  const All_State_API = useAll_StateQuery(CountryID, { skip: !CountryID });
  const All_State = All_State_API?.data?.states;

  // All City API
  const All_City_API = useAll_CityQuery(StateID, { skip: !StateID });
  const All_City = All_City_API?.data?.cities;

  //All Branch API
  const All_Branch_API = useBranch_With_idQuery(CityID, { skip: !CityID });
  const All_branches = All_Branch_API?.data?.branches;

  const navigate = useNavigate();

  const CustomerEmail = EmailValidator.validate(percelFields.customerEmail);
  const ReciverEmail = EmailValidator.validate(percelFields.recieverEmail);

  const handleFields = (e) => {
    setPercelFields({
      ...percelFields,
      [e.target.name]: e.target.value,
    });
  };

  const [createParcel, { isLoading }] = useCreateParcelMutation();

  const handleCreateParcel = async (e) => {
    e.preventDefault();
    if (
      percelFields.parcelName &&
      percelFields.weight &&
      percelFields.customerPhone &&
      percelFields.customerEmail &&
      percelFields.recieverEmail &&
      percelFields.recieverPhone &&
      percelFields.fromAddress &&
      percelFields.toAddress &&
      branchID &&
      CountryID &&
      StateID &&
      CityID
    ) {
      if (CustomerEmail || ReciverEmail) {
        try {
          const res = await createParcel({
            parcelName: percelFields.parcelName,
            weight: percelFields.weight,
            toCity: CityID,
            toCountry: CountryID,
            customerPhone: percelFields.customerPhone,
            recieverPhone: percelFields.recieverPhone,
            customerEmail: percelFields.customerEmail,
            recieverEmail: percelFields.recieverEmail,
            fromAddress: percelFields.fromAddress,
            toAddress: percelFields.toAddress,
            customerID: userID,
            branchID: branchID,
          });

          if (!res.error) {
            NotificationAlert("Parcel Created successfully", "success");
            setPercelFields({
              parcelName: "",
              weight: "",
              customerPhone: "",
              recieverPhone: "",
              customerEmail: "",
              recieverEmail: "",
              fromAddress: "",
              toAddress: "",
            });
            navigate("/dashboard/");
          } else {
            console.log(res.error, "err message from parcel create");
            NotificationAlert("Unable to craete parcel try later", "warning");
          }
        } catch (error) {
          console.log(error, "went wrong err");
          NotificationAlert("Something went wrong! try again or later");
        }
      } else {
        NotificationAlert("Invalid Email");
      }
    } else {
      NotificationAlert("All Fields Required");
    }
  };

  return (
    <div className={style.create_wrapper}>
      <Container className={style.login_warpper}>
        <p className={style.back} onClick={() => navigate("/dashboard/")}>
          <IoIosArrowBack /> Back To Main
        </p>
        <div className={style.login_box_wrapper}>
          <div className={style.login_box_inner_wrapper}>
            <div className={style.login_box_head}>
              <h1>Create Parcel</h1>
              <p>Create A New Parcel</p>
            </div>
            <div className={style.form_wrapper}>
              <form className={style.form} onSubmit={handleCreateParcel}>
                <label className={style.label}>
                  <div className={`${style.inner_input_fields} d-flex gap-4`}>
                    <div className="d-flex gap-2 w-100 flex-column">
                      <h6>Your Name*</h6>

                      <input
                        type="text"
                        placeholder="Your Name"
                        name="parcelName"
                        value={percelFields.parcelName}
                        onChange={handleFields}
                      />
                    </div>
                    <div className="d-flex gap-2 w-100 flex-column">
                      <h6>Package Weight*</h6>

                      <input
                        type="number"
                        placeholder="Package Weight"
                        name="weight"
                        value={percelFields.weight}
                        onChange={handleFields}
                      />
                    </div>
                  </div>
                </label>
                <label className={style.label}>
                  <div className={`${style.inner_input_fields} d-flex gap-4`}>
                    <div className="d-flex gap-2 w-100 flex-column">
                      <h6>Your Email*</h6>
                      {role === "Manager" ? (
                        <input
                          type="email"
                          placeholder="Your Email"
                          name="customerEmail"
                          value={userEmail}
                          onChange={handleFields}
                          disabled
                        />
                      ) : (
                        <input
                          type="email"
                          placeholder="Your Email"
                          name="customerEmail"
                          value={percelFields.customerEmail}
                          onChange={handleFields}
                        />
                      )}
                    </div>
                    <div className="d-flex gap-2 w-100 flex-column">
                      <h6>Receiver Email*</h6>

                      <input
                        type="email"
                        placeholder="Reciever Email"
                        name="recieverEmail"
                        value={percelFields.recieverEmail}
                        onChange={handleFields}
                      />
                    </div>
                  </div>
                </label>
                <label className={style.label}>
                  <div className={`${style.inner_input_fields} d-flex gap-4`}>
                    <div className="d-flex gap-2 w-100 flex-column">
                      <h6>Your Phone*</h6>
                      <input
                        type="number"
                        placeholder="Your Phone"
                        name="customerPhone"
                        value={percelFields.customerPhone}
                        onChange={handleFields}
                      />
                    </div>
                    <div className="d-flex gap-2 w-100 flex-column">
                      <h6>Reciever Phone*</h6>
                      <input
                        type="number"
                        placeholder="Reciever Phone"
                        name="recieverPhone"
                        value={percelFields.recieverPhone}
                        onChange={handleFields}
                      />
                    </div>
                  </div>
                </label>
                <label className={style.label}>
                  <div className={`${style.inner_input_fields} d-flex gap-4`}>
                    <div className="d-flex gap-2 w-100 flex-column">
                      <h6>To Country*</h6>
                      <select
                        value={CountryID}
                        onChange={(e) => setCountryID(e.target.value)}
                      >
                        <option value="default">Select country</option>
                        {All_Country?.map((item) => (
                          <option value={item._id} key={item._id}>
                            {item.country}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="d-flex gap-2 w-100 flex-column">
                      <h6>To State*</h6>
                      <select
                        value={StateID}
                        onChange={(e) => setStateID(e.target.value)}
                      >
                        <option value="default">Select State</option>
                        {All_State?.map((item) => (
                          <option value={item._id} key={item._id}>
                            {item.state}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </label>
                <label className={style.label}>
                  <div className={`${style.inner_input_fields} d-flex gap-4`}>
                    <div className="d-flex gap-2 w-100 flex-column">
                      <h6>To City*</h6>
                      <select
                        value={CityID}
                        onChange={(e) => setCityID(e.target.value)}
                      >
                        <option value="default">Select City</option>
                        {All_City?.map((item) => (
                          <option value={item._id} key={item._id}>
                            {item.city}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="d-flex gap-2 w-100 flex-column">
                      <h6>To Branch*</h6>
                      <select
                        value={branchID}
                        onChange={(e) => setBranchID(e.target.value)}
                      >
                        <option value="default">Select branch</option>
                        {All_branches?.map((item) => (
                          <option value={item._id} key={item._id}>
                            {item.branch_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </label>

                <label className={style.label}>
                  <div className={`${style.inner_input_fields} d-flex gap-4`}>
                    <div className="d-flex gap-2 w-100 flex-column">
                      <h6>From Address*</h6>
                      <input
                        type="text"
                        placeholder="From Address"
                        name="fromAddress"
                        value={percelFields.fromAddress}
                        onChange={handleFields}
                      />
                    </div>
                    <div className="d-flex gap-2 w-100 flex-column">
                      <h6>To Address*</h6>
                      <input
                        type="text"
                        placeholder="To Address"
                        name="toAddress"
                        value={percelFields.toAddress}
                        onChange={handleFields}
                      />
                    </div>
                  </div>
                </label>

                {isLoading ? (
                  <button className={style.signin_btn} disabled>
                    Creating..
                  </button>
                ) : (
                  <button className={style.signin_btn}>Create Order</button>
                )}
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CreateParcel;
