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
          <a href="/#">About us</a>
          <a href="/#faq">FAQ</a>
          <a href="/#contact">Contact us</a>
          <a href="/#">Our Strength</a>
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
