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

const CreateCustomerOrder = () => {
  const selector = useSelector((state) => state?.userData);
  const id = selector?.data?.user?.branchID;
  const manager_id = selector?.data?.user?._id;
  // console.log(selector);

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

    // console.log("Form Data to Submit:", formData);

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
        navigate(-1);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const [formData, setFormData] = useState({
    parcelName: "",
    weight: "",
    Solid_Liquid: "",
    recieverPhone: "",
    recieverEmail: "",
    recieverAddress: "",
    recieverPostCode: "",
    senderPhone: "",
    senderPostCode: "",
    codAmount: false,
    dimensions: {
      width: "",
      height: ""
    }
  });

  console.log(formData)

  const { parcelName, weight, Solid_Liquid, recieverPhone, recieverEmail,recieverAddress, recieverPostCode, senderPhone, senderPostCode, codAmount, dimensions } = formData;
 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === "width" || name === "height") {
      setFormData((prevData) => ({
        ...prevData,
        dimensions: {
          ...prevData.dimensions,
          [name]: value
        }
      }));
    } else if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
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
              <h1>Create Customer Order</h1>
              <p>Create A New Order</p>
            </div>
            <div className={style.form_wrapper}>
              <div className="d-flex flex-column justify-content-center align-items-center gap-3">
                <div className="d-flex flex-column w-100 gap-3">
                  <div className="row g-3">
                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>Parcel Name</label>
                      <input
                        type="text"
                        placeholder="Parcel Name"
                        name="parcelName"
                        value={parcelName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>Weight</label>
                      <input type="text" placeholder="Weight" name="weight" value={weight} onChange={handleChange} />
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>
                        Solid or Liquid
                      </label>
                      <select name="Solid_Liquid" value={Solid_Liquid} onChange={handleChange}>
                        <option value=""> Select One </option>
                        <option value="solid"> Solid </option>
                        <option value="liquid"> Liquid </option>
                      </select>
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>Width</label>
                      <input type="text" placeholder="Width" name="width" value={dimensions.width} onChange={handleChange} />
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>Height</label>
                      <input type="text" placeholder="Height" name="height" value={dimensions.height} onChange={handleChange} />
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>Reciever Phone</label>
                      <input
                        type="text"
                        placeholder="Reciever Phone"
                        name="recieverPhone"
                        value={recieverPhone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>Reciever Email</label>
                      <input
                        type="text"
                        placeholder="Reciever Email"
                        name="recieverEmail"
                        value={recieverEmail}
                        onChange={handleChange}
                      />
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>
                        Reciver Address
                      </label>
                      <input
                        type="text"
                        placeholder="Reciver Address"
                        name="recieverAddress"
                        value={recieverAddress}
                        onChange={handleChange}
                      />
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>
                        Reciver Post Code
                      </label>
                      <input
                        type="text"
                        placeholder="Reciver Post Code"
                        name="recieverPostCode"
                        value={recieverPostCode}
                        onChange={handleChange}
                      />
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>Sender Phone</label>
                      <input
                        type="text"
                        placeholder="Sender Phone"
                        name="senderPhone"
                        value={senderPhone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className={`col-sm-4 gap-0 ${style.label}`}>
                      <label style={{ color: "#a3b1c2" }}>
                        Sender Post Code
                      </label>
                      <input
                        type="text"
                        placeholder="Sender Post Code"
                        name="senderPostCode"
                        value={senderPostCode}
                        onChange={handleChange}
                      />
                    </div>

                    <div className={`col-sm-4 gap-2 d-flex align-items-center`}>
                        <input
                          type="checkbox"
                          name="codAmount"
                          checked={codAmount}
                          onChange={handleChange}
                        />
                        <label style={{ color: "#a3b1c2" }}>CodAmount</label>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <button
                    name="Create Product"
                    className="btn p-3 py-2 rounded"
                    onClick={handleSubmit}
                    style={{ background: "#D8788C", color: "#FFFFFF" }}
                  >
                    Create Order
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

export default CreateCustomerOrder;
