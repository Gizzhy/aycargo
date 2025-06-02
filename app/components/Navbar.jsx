import React from "react";
import Image from "next/image";
import styles from "./styles/nav.module.scss";
import logo from "../../assets/images/logo.svg";
const Navbar = () => {
  return (
    <>
      <div className={styles.navbar}>
        <Image src={logo} alt="aycargo logo" />
        <div>
          <a href="/#">Services</a>
          <a href="/#">Locations</a>
          <a href="/#">Our Strength</a>
          <a href="/#">About us</a>
        </div>
        <div>
          <a href="/quote">
            <button>Request a quote</button>
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
