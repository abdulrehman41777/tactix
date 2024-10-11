import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import style from "./signup.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router";
import { NotificationAlert } from "../../Components/NotificationAlert/NotificationAlert";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import * as EmailValidator from "email-validator";
import { useCreate_ManagerMutation } from "../../redux/Manager/manager";
import {
  useAll_branchesQuery,
  useBranchesByAdminQuery,
} from "../../redux/Branch/Branch";
import { useCreateUserMutation, useUpdate_ProfileMutation } from "../../redux/Auth/auth";
import { MdCancel } from "react-icons/md";

const CreateCustomer = () => {
  const selector = useSelector((state) => state?.userData);
  const id = selector?.data?.user?.branchID;
  const manager_id = selector?.data?.user?._id;
  // console.log(selector);

  const navigate = useNavigate();

  // Get Data From Branch
  const location = useLocation();
  const data = location.state;

  // State to hold input values for From, To, and Price
  const [locations, setLocations] = useState([{ from: "", to: "", price: null, shipmentType: [] }]);
  const [name, setName] = useState(data?.userData?.name || "");
  const [email, setEmail] = useState(data?.userData?.email || "");
  const [password, setPassword] = useState(data?.userData?.password || "");
  const [phone, setPhone] = useState(data?.userData?.phone || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (data?.type === "update") {
      setLocations(data?.userData?.rateList?.rateList?.map(item => ({ from: item?.from, to: item?.to, price: item?.price, shipmentType: item?.shipmentType })));
    }
  }, []);


  // Handle input change for locations
  const handleLocationChange = (index, e) => {
    const newLocations = [...locations];

    if (e.target.name === "shipmentType") {
      // Ensure shipmentType is an array
      newLocations[index][e.target.name] = [e.target.value];
    } else if (e.target.name === "price") {
      newLocations[index][e.target.name] = Number(e.target.value);
    }
    else {
      // Update other fields as strings
      newLocations[index][e.target.name] = e.target.value;
    }

    setLocations(newLocations);
  };

  // Add a new set of location fields
  const handleAdd = () => {
    setLocations([...locations, { from: "", to: "", price: "", shipmentType: [] }]);
  };

  // Remove a set of location fields
  const handleRemove = (index) => {
    const newLocations = locations.filter((_, i) => i !== index);
    setLocations(newLocations);
  };

  // Validation function
  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    // Validate static fields
    if (!name.trim()) {
      newErrors.name = "Name is required.";
      valid = false;
    }
    if (!email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    }
    if (!password.trim()) {
      newErrors.password = "Password is required.";
      valid = false;
    }
    if (!phone.trim()) {
      newErrors.password = "Phone is required.";
      valid = false;
    }

    // Validate all but the last location set
    locations.slice(0, -1).forEach((location, index) => {
      if (!location.from || !location.to || !location.price || location.shipmentType.length === 0) {
        newErrors[`location${index}`] =
          "All location fields (From, To, Price, shipmentType) are required.";
        valid = false;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const [createUser, { isLoading }] = useCreateUserMutation();

  const [updateRateList, { isLoading: updateRateListLoading }] = useUpdate_ProfileMutation();


  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const filteredLocations = locations.filter(
      (location) =>
        location.from.trim() || location.to.trim() || location.price.trim()
    );
    console.log(filteredLocations)
    // Prepare data to send
    const formData = {
      name,
      email,
      phone,
      password,
      rateList: filteredLocations,
    };

    console.log("filteredLocations", filteredLocations);

    try {
      if (data?.type === "update") {
        const res = await updateRateList({
          userID: data?.userData?._id,
          data: { rateList: filteredLocations },
        });

        if (!res.error) {
          navigate(-1)
        } else {
          console.log(res)
        }

      } else {
        const res = await createUser({
          BranchId: id,
          managerID: manager_id,
          data: formData,
        });

        if (!res.error) {
          setLocations([{ from: "", to: "", price: "", shipmentType: [] }]);
          setName("");
          setEmail("");
          setPassword("");
          navigate(-1)
        } else {
          console.log(res)
        }
      }
    } catch (error) {
      console.log(error);
    }
  };





  const rateList = ["Premium", "Express", "Economy", "Others"]



  return (
    <div className={style.create_wrapper}>
      <Container className={style.login_warpper}>
        <p className={style.back} onClick={() => navigate(-1)}>
          <IoIosArrowBack /> Back To Main
        </p>
        <div className={style.login_box_wrapper}>
          <div
          // className={style.login_box_inner_wrapper}
          >
            <div className={style.login_box_head}>
              {data?.type === "update" ?
                <h1>Update Customer</h1>
                :
                <h1>Create Customer</h1>
              }
              {data?.type === "update" ?
                null
                :
                <p>Create A New Customer</p>
              }
            </div>
            <div className={style.form_wrapper}>
              <div className="d-flex flex-column justify-content-center align-items-center gap-3">
                <div className="d-flex flex-column w-100 gap-3">
                  <div className="row g-3">
                    <div className={`col-sm-3 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>Name</label>
                      <input
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                      />
                      {errors.name && (
                        <small className="text-danger">{errors.name}</small>
                      )}
                    </div>
                    <div className={`col-sm-3 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>Email</label>
                      <input
                        type="text"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                      {errors.email && (
                        <small className="text-danger">{errors.email}</small>
                      )}
                    </div>
                    <div className={`col-sm-3 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>Phone</label>
                      <input
                        type="number"
                        placeholder="Phone Number"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                      />
                      {errors.phone && (
                        <small className="text-danger">{errors.phone}</small>
                      )}
                    </div>
                    <div className={`col-sm-3 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>Password</label>
                      <input
                        type="text"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                      {errors.password && (
                        <small className="text-danger">{errors.password}</small>
                      )}
                    </div>
                  </div>
                </div>

                {/* Render the input fields for From, To, and Price dynamically */}
                {locations.map((location, index) => (
                  <div className="d-flex flex-column w-100 gap-3">
                    <div className="row g-3">
                      <div className={`col-sm-3 gap-0 ${style.label}`}>
                        <input
                          type="text"
                          name="from"
                          value={location.from}
                          onChange={(e) => handleLocationChange(index, e)}
                          placeholder="From"
                        />
                      </div>
                      <div className={`col-sm-3 gap-0 ${style.label}`}>
                        <input
                          type="text"
                          name="to"
                          value={location.to}
                          onChange={(e) => handleLocationChange(index, e)}
                          placeholder="To"
                        />
                      </div>
                      <div className={`col-sm-2 gap-0 ${style.label}`}>
                        <input
                          type="number"
                          name="price"
                          value={location.price}
                          onChange={(e) => handleLocationChange(index, e)}
                          placeholder="Price"
                        />
                      </div>
                      <div className={`col-sm-2 gap-0 ${style.label}`}>
                        <select
                          name="shipmentType"
                          value={location.shipmentType}
                          onChange={(e) => handleLocationChange(index, e)}
                        >
                          <option value=""> Select Shipment Type </option>
                          {rateList?.map((item, i) => (
                            <option value={item} key={i}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>

                      {index === locations.length - 1 ? (
                        <div className={`col-sm-2 gap-0 ${style.label}`}>
                          <button
                            className={`btn`}
                            onClick={handleAdd}
                            style={{ background: "#D8788C", color: "#fff" }}
                          >
                            Add
                          </button>
                        </div>
                      ) : (
                        <div className={`col-sm-2 gap-0 ${style.label}`}>
                          <button
                            className={`btn`}
                            onClick={() => handleRemove(index)}
                            style={{ background: "#ff4d4d", color: "#fff" }}
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                    {errors[`location${index}`] && (
                      <small className="text-danger">
                        {errors[`location${index}`]}
                      </small>
                    )}
                  </div>
                ))}

                <div className="d-flex justify-content-center">
                  {data?.type === "update" ?
                    <button
                      name="Create Product"
                      className="btn p-3 rounded text-white"
                      onClick={handleSubmit}
                      style={{ background: '#D8788C' }}
                    >
                      {updateRateListLoading ? "Updating" :
                        "Update Customer"
                      }
                    </button>
                    :
                    <button
                      name="Create Product"
                      className="btn p-3 rounded text-white"
                      onClick={handleSubmit}
                      style={{ background: '#D8788C' }}
                    >
                      {isLoading ? "Creating" :
                        "Create Customer"
                      }
                    </button>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CreateCustomer;
