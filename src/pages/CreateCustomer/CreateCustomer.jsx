import React, { useState } from "react";
import { Container } from "react-bootstrap";
import style from "./signup.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";
import { NotificationAlert } from "../../Components/NotificationAlert/NotificationAlert";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import * as EmailValidator from "email-validator";
import { useCreate_ManagerMutation } from "../../redux/Manager/manager";
import {
  useAll_branchesQuery,
  useBranchesByAdminQuery,
} from "../../redux/Branch/Branch";
import { useCreateUserMutation } from "../../redux/Auth/auth";
import { MdCancel } from "react-icons/md";

const CreateCustomer = () => {
  const selector = useSelector((state) => state?.userData);
  const id = selector?.data?.user?.branchID;
  const manager_id = selector?.data?.user?._id;
  console.log(selector);

  const navigate = useNavigate();

  // State to hold input values for From, To, and Price
  const [locations, setLocations] = useState([{ from: "", to: "", price: "" }]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Handle input change for locations
  const handleLocationChange = (index, e) => {
    const newLocations = [...locations];
    newLocations[index][e.target.name] = e.target.value;
    setLocations(newLocations);
  };

  // Add a new set of location fields
  const handleAdd = () => {
    setLocations([...locations, { from: "", to: "", price: "" }]);
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

    // Validate all but the last location set
    locations.slice(0, -1).forEach((location, index) => {
      if (!location.from || !location.to || !location.price) {
        newErrors[`location${index}`] =
          "All location fields (From, To, Price) are required.";
        valid = false;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const [createUser, { isLoading }] = useCreateUserMutation();

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      // If validation fails, return early
      return;
    }

    // Filter out empty location fields (those with empty from, to, and price)
    const filteredLocations = locations.filter(
      (location) =>
        location.from.trim() || location.to.trim() || location.price.trim()
    );

    // Prepare data to send
    const formData = {
      name,
      email,
      password,
      rateList: filteredLocations,
    };

    // Here, you can use the formData to send to an API, e.g.,
    // fetch('/api/endpoint', { method: 'POST', body: JSON.stringify(formData) })

    console.log("Form Data to Submit:", formData);

    try {
      const res = await createUser({
        BranchId: id,
        managerID: manager_id,
        data: formData,
      });

      if (!res.error) {
        setLocations([{ from: "", to: "", price: "" }]);
        setName("");
        setEmail("");
        setPassword("");
        navigate(-1)
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

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
              <h1>Create Customer</h1>
              <p>Create A New Customer</p>
            </div>
            <div className={style.form_wrapper}>
              <div className="d-flex flex-column justify-content-center align-items-center gap-3">
                <div className="d-flex flex-column w-100 gap-3">
                  <div className="row g-3">
                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>Name</label>
                      <input
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                      />
                      {errors.name && (
                        <small className="text-danger">{errors.name}</small>
                      )}
                    </div>
                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>Email</label>
                      <input
                        type="text"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && (
                        <small className="text-danger">{errors.email}</small>
                      )}
                    </div>
                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>Password</label>
                      <input
                        type="text"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
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
                      <div className={`col-sm-4 gap-0 ${style.label}`}>
                        <input
                          type="text"
                          name="from"
                          value={location.from}
                          onChange={(e) => handleLocationChange(index, e)}
                          placeholder="From"
                        />
                      </div>
                      <div className={`col-sm-4 gap-0 ${style.label}`}>
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
                  <button
                    name="Create Product"
                    className="btn p-3 rounded"
                    onClick={handleSubmit}
                    style={{ background: '#D8788C' }}
                  >
                    Create Customer
                  </button>
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
