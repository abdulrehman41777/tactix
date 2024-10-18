import {
  ourWorking,
  trackingWorking,
  testimonialData,
} from "../../data/ourworking";
import React from "react";
import styles from "./main.module.css";
import { Container } from "react-bootstrap";
import heroImg from "../../assets/main/hero.png";
import aboutImg from "../../assets/main/about.png";
import speedImg from "../../assets/main/speed.png";
import trackImg from "../../assets/main/track.png";
import { Swiper, SwiperSlide } from "swiper/react";
import Footer from "../../Components/Footer/Footer";
import qualityImg from "../../assets/main/quality.png";
import supportImg from "../../assets/main/support.png";
import contactImg from "../../assets/main/contact.png";
import PrimaryButton from "../../Components/Button/PrimaryButton";
import OurWorkingBox from "../../Components/OurWorkingBox/OurWorkingBox";
import TrackingWorking from "../../Components/TrackingWorking/TrackingWorking";
import { useLazyTrack_ParcelQuery } from "../../redux/Tracking/Tracking";
import { useState } from "react";
import { NotificationAlert } from "../../Components/NotificationAlert/NotificationAlert";
import HeadNav from "../../Components/Navbar/HeadNav";
import { useSelector } from "react-redux";
import { useTrackParcelMutation } from "../../redux/Parcel/Parcel";

const clientSlider = {
  320: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  400: {
    slidesPerView: 1,
    spaceBetween: 20,
  },
  480: {
    slidesPerView: 1,
    spaceBetween: 5,
  },
  575: {
    slidesPerView: 2,
    spaceBetween: 50,
  },
};

const Main = () => {
  const [trakingId, setTrackingID] = useState("");
  const [trackModel, setTrackModel] = useState(false);
  const [trigger, { data, isLoading }] = useLazyTrack_ParcelQuery();
  const [trackedData, setTrackedData] = useState({});

  // User Data
  const selector = useSelector((state) => state?.userData);
  const id = selector?.data?.user?._id;

  const [trackParcel, { isLoading: trackingLoading }] = useTrackParcelMutation();

  const handleTrackParcel = async () => {
    try {
      if (!trakingId) {
        return NotificationAlert("Tracking id is required")
      }
      const res = await trackParcel({ trackID: trakingId, userID: id });
      if (!res.error) {
        setTrackedData(res?.data?.assignment)
        trigger(trakingId);
        setTrackModel(true);
        setTrackingID("");
      }
    } catch (error) {
      console.log(error);
      NotificationAlert("Internal Server Error", "success")
    }
  }


  return (
    <>
      <HeadNav />
      {/* Hero... */}
      <section className="container py-5" style={{ marginTop: "90px" }}>
        <div className="row">
          <div className="col-xl-4 order-xl-1 order-2">
            <article className={styles.hero_section_content}>
              <h1 className="text_responsive">
                FIRST CLASS DELIVERY FAST SHIPPING
              </h1>
              <p className="text_responsive">
                Lorem ipsum dolor sit amet, concateur as troppo non brio, laguna
                vere un drato le duro largo del bravo, senseturo brio verace ca
                doro, lorem ipsum dolor sit amet.
              </p>
              <div className="w-100 d-flex justify-content-xl-start justify-content-center">
                <PrimaryButton text="Signup" type="primary_btn" />
              </div>
            </article>
          </div>
          <div className="col-xl-8 order-xl-2 order-1 d-flex align-items-center">
            <figure className="text-center">
              <img
                src={heroImg}
                alt="hero image"
                className={styles.hero_section_image}
              />
            </figure>
          </div>
        </div>
      </section>
      {/* Services... */}
      <section className="container py-5">
        <div
          className="row pt-5 pb-3"
          style={{ background: "#5635a5", borderRadius: 10 }}
        >
          <div className="col-xl-3 col-6">
            <figure className={styles.services_icon_box}>
              <img src={speedImg} alt="speed" />
              <figcaption>Speed Shipping</figcaption>
            </figure>
          </div>
          <div className="col-xl-3 col-6">
            <figure className={styles.services_icon_box}>
              <img src={qualityImg} alt="quality" />

              <figcaption>Best Quality</figcaption>
            </figure>
          </div>
          <div className="col-xl-3 col-6 mt-xl-0 mt-3">
            <figure className={styles.services_icon_box}>
              <img src={trackImg} alt="track" />

              <figcaption>Tracking</figcaption>
            </figure>
          </div>
          <div className="col-xl-3 col-6 mt-xl-0 mt-3">
            <figure className={styles.services_icon_box}>
              <img src={supportImg} alt="support" />

              <figcaption>24/7 Support</figcaption>
            </figure>
          </div>
        </div>
      </section>
      {/* About... */}
      <section className="container">
        <div className="row">
          <div className="col-xl-6 d-flex align-items-center">
            <figure className="text-center">
              <img
                src={aboutImg}
                alt="hero image"
                className={styles.hero_section_image}
              />
            </figure>
          </div>
          <div className="col-xl-6">
            <article className={styles.hero_section_content}>
              <span
                className="text_responsive w-100"
                style={{ color: "#5635a5", fontSize: 18 }}
              >
                About
              </span>
              <h1 className="text_responsive">WHY CHOOSE US</h1>
              <p className="text_responsive">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged
              </p>
              <div className="w-100 d-flex justify-content-xl-start justify-content-center">
                <PrimaryButton text="Read more" type="primary_btn" />
              </div>
            </article>
          </div>
        </div>
      </section>
      {/* Our Working... */}
      <section className="container pb-5">
        <div className="row">
          <h1 className="text-center">HOW IT WORKS</h1>
          <p className="text-center pt-2 mb-5 mx-auto center_paragraph">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
          </p>
        </div>
        <div className="row">
          {ourWorking?.map((item, index) => (
            <div className="col-lg-4 mt-lg-0 mt-3" key={index}>
              <OurWorkingBox data={item} />
            </div>
          ))}
        </div>
      </section>
      {/* Tracker... */}
      <section className={styles.tracker_container}>
        <span>Track</span>
        <h1 className="text-light">YOU CAN TRACK YOUR SHIPMENT</h1>
        <p className="text-light">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry
        </p>
        <div className={`${styles.tracking_feild_div}`}>
          <input
            type="text"
            value={trakingId}
            onChange={(e) => setTrackingID(e.target.value)}
            placeholder="Trancking ID #"
            className={styles.tracking_feild}
            maxLength={50}
          />
          <button
            className={styles.tracking_btn}
            onClick={trackingLoading ? null : handleTrackParcel}
          >
            Track
          </button>
        </div>
      </section>
      {/* Tracking Order Detail from search */}
      {trackModel && (
        <div className="container mt-5" style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              fontSize: 20,
              cursor: "pointer",
            }}
            onClick={() => setTrackModel(false)}
          >
            Clear
          </span>
          <div className="row">
            <div className="col mt-5">
              {isLoading ? (
                <h2 className="text-center">Please Wait...</h2>
              ) : (
                <div className={styles.order_detail}>
                  <div className={styles.order_detail_header}>
                    <span
                      className="fw-bold"
                      style={{
                        padding: 10,
                      }}
                    >
                      Tracking ID # {trackedData?.trackID}
                    </span>
                    <span
                      className="fw-bold"
                      style={{
                        padding: 10,
                        background: "#fff",
                        color: "#000",
                        borderRadius: 10,
                      }}
                    >
                      Status: {trackedData?.Status?.[0]}
                    </span>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>Branch Name</th>
                        <th>Branch Address</th>
                        <th>Percal Name</th>
                        <th>Total Price</th>
                        <th>Weight</th>
                        <th>FromAddress</th>
                        <th>To Address</th>
                        <th>Rider</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{trackedData?.branchID?.branch_name}</td>
                        <td>{trackedData?.branchID?.branch_address}</td>
                        <td>{trackedData?.parcelID?.parcelName}</td>
                        <td>${trackedData?.totalPrice}</td>
                        <td>{trackedData?.parcelID?.weight}kg</td>
                        <td>
                          {trackedData?.parcelID?.SenderAddress}
                        </td>
                        <td>
                          {trackedData?.parcelID?.reciverAddress}

                        </td>
                        <td>{trackedData?.riderID?.name}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="py-3 d-flex flex-column">
                    <span
                      className="fw-bold"

                    >
                      Description:
                    </span>
                    <div style={{ width: "24rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                        {trackedData?.Status?.[0] === "Order Received" ?
                          "We've got your Shipment details, but not your package"
                          : trackedData?.Status?.[0] === "Shipment Collected" ? "Your package has been successfully collected. Thank you for choosing us!"
                            : trackedData?.Status?.[0] === "In Transit to Origin Facility" ?
                              "Your package is on its way to the local shipping center."
                              : trackedData?.Status?.[0] === "Customs/Terminal Clearance in Origin Country" ?
                                "Your package is going through customs and security screening in the sending country."
                                : trackedData?.Status?.[0] === "Departed from Origin Country" ?
                                  "Your package has left the sending country and is on its way."
                                  : trackedData?.Status?.[0] === "In Transit to Destination Country" ? "Your package is traveling to the destination country."
                                    : trackedData?.Status?.[0] === "Arrived at Destination Country" ? "Your package has arrived in the destination country."
                                      : trackedData?.Status?.[0] === "Customs/Terminal Clearance in Destination Country" ? "Your package is going through customs in the receiving country."
                                        : trackedData?.Status?.[0] === "Shipment Sorted at Delivery Facility" ? "Your package has been sorted at the delivery facility and is being prepared for final delivery"
                                          : trackedData?.Status?.[0] === "Out for Delivery" ? "Your package is out for delivery and will be with you soon!"
                                            : trackedData?.Status?.[0] === "Delivered" ? "Your package has been delivered. Enjoy!"
                                              : trackedData?.Status?.[0] === "Undelivered" ? "Your package has been delivered to your selected [retail point/locker box] and is ready for pickup"
                                                : trackedData?.Status?.[0] === "Return to Sender" ? "The package is being returned to the sender due to a failed delivery attempt or delay"
                                                  : "Order Hasn't Been Processed Yet"
                        }
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Track Working Progress... */}
      <section className="container py-5 my-5">
        <div className="row mb-5 pb-5">
          <h1 className="text-center">HOW TRACKING WORKING</h1>
        </div>
        <div className="row">
          {trackingWorking?.map((item, index) => (
            <div className="col-lg-4 mt-lg-0 mt-4" key={index}>
              <TrackingWorking data={item} />
            </div>
          ))}
        </div>
      </section>
      {/* Testimonial... */}
      <section className="container">
        <div className={styles.section_six_wrapper}>
          <Container className={styles.section_six_container}>
            <h1 className="text_responsive text-center">OUR HAPPY CLIENTS</h1>
          </Container>
          <div className={styles.slider_wrapper}>
            <Swiper loop={true} breakpoints={clientSlider}>
              {testimonialData?.map((client) => (
                <SwiperSlide className={styles.client_swiper} key={client?.id}>
                  <div className={styles.slider}>
                    <div className={styles.slider_client_img}>
                      <img
                        src={client.img}
                        alt="no img found"
                        styles={{
                          objectFit: "cover",
                          height: "23rem",
                        }}
                        className={styles.review_img}
                      />
                    </div>
                    <div className={styles.slider_client_detail}>
                      <p className={styles.client_para}>
                        {client?.testimonial}
                      </p>
                      <p className={styles.client_name}>{client?.name}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
      {/* Contact...  */}
      <section className="container py-5">
        <div className="row">
          <div className="col-xl-6">
            <div className={styles.form_container}>
              <span
                className="text_responsive w-100"
                style={{ color: "#5635a5", fontSize: 18 }}
              >
                Contact
              </span>
              <h1 className="text_responsive mb-4">GET IN TOUCH</h1>
              <form>
                <input type="text" placeholder="Subject" />
                <textarea
                  name="message"
                  cols="30"
                  rows="8"
                  maxLength={500}
                  placeholder="Message"
                ></textarea>
                <PrimaryButton text="send" type="primary_btn" />
              </form>
            </div>
          </div>
          <div className="col-xl-6 d-xl-block d-none">
            <figure className={`${styles.contact_img} text-center`}>
              <img src={contactImg} alt="contact img" />
            </figure>
          </div>
        </div>
      </section>
      {/* Footer... */}
      <Footer />
    </>
  );
};

export default Main;
