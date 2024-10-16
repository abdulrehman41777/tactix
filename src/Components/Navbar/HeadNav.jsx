import React from "react";
import styles from "./navbar.module.css";
import logo from "../../assets/main/logo.png";
import PrimaryButton from "../Button/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";

const HeadNav = () => {
    const navigate = useNavigate()

    return (
        <nav className="navbar navbar-expand-lg py-3 fixed-top">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src={logo} alt="Tactix logo" className={styles.nav_logo} />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item mx-2">
                            <Link className="nav-link active">Home</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link active">About</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link active">Sandbox Apis</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link active">Platform Documenttaion</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link active">Pricing</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link active" to="/dashboard/">
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link active">Contact</Link>
                        </li>
                    </ul>
                    <form
                        className="d-flex align-items-center"
                        style={{ borderLeft: "1px solid #000" }}
                        role="search"
                    >
                        <button
                            className="btn fw-bold"
                            style={{ fontSize: 14 }}
                            type="submit"
                            onClick={() => navigate("/dashboard/login")}
                        >
                            LOGIN
                        </button>
                        <PrimaryButton text="Signup" type="navbar_btn" />
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default HeadNav
