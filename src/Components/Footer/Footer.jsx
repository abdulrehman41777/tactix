import React, { useState } from "react";
import style from "./footer.module.css";
import { Container } from "react-bootstrap";
import { IoSendSharp } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { BsLinkedin, BsTwitter } from "react-icons/bs";
import logo from "../../assets/main/logolight.png";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <div className={style.footer_wrapper}>
      <Container fluid className={style.footer_container}>
        <div className={style.footer_main}>
          <div className={style.footer_div}>
            <div className={style.footer_logo}>
              <img src={logo} className={style.footer_main_logo} />
              <p className={style.footer_creater_name}>Created By Codesol</p>
              <div className={style.social_logo}>
                <p>
                  <BsLinkedin />
                </p>
                <p>
                  <BsTwitter />
                </p>
                <p>
                  <FaFacebookF />
                </p>
              </div>
            </div>
            <div className={style.footer_middle_div}>
              <div className={style.our_services}>
                <h3>Quick Links</h3>
                <ul>
                  <li role="button">About</li>
                  <li role="button">Contact</li>
                  <li role="button">Article</li>
                </ul>
              </div>
              <div className={style.company}>
                <h3>Support</h3>
                <ul>
                  <li role="button">Terms of service</li>
                  <li role="button">Privacy Policies</li>
                  <li role="button">Faq</li>
                  <li role="button">Help Center</li>
                  <li role="button">Privacy Policy</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={style.footer_newsletter}>
            <h3>newsletter</h3>
            <p>
              We’re always on the lookout for the cutting-edge tech and brand
              innovations. Join us today.
            </p>
            <form className={style.footer_input_area}>
              <input
                type="text"
                placeholder="ENTER EMAIL"
                style={{ color: "white" }}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <IoSendSharp className={style.footer_send_icon} />
            </form>
          </div>
        </div>
        <div className={style.copyright}>
          <p>Copyright © 2023 This Website is Created by Codesol </p>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
