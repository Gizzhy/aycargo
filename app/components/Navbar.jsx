"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./styles/nav.module.scss";
import logo from "../../assets/images/logo.svg";
import Link from "next/link";
import home from "../../assets/icons/home.svg";
import document from "../../assets/icons/document.svg";
import comments from "../../assets/icons/comments.svg";
import user from "../../assets/icons/user.svg";
import close from "../../assets/icons/xx.svg";

// import { IoCloseOutline } from "react-icons/io5";
import navopen from "../../assets/icons/navopen.svg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const routes = [
    { path: "/", label: "Home", icon: home, alt: "home" },
    { path: "/about", label: "About us", icon: user, alt: "about" },
    { path: "/#faq", label: "FAQ", icon: document, alt: "faq" },
    { path: "/#contact", label: "Contact Us", icon: comments, alt: "contact" },
  ];
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <div className={styles.navbar}>
        <a href="/">
          <Image src={logo} alt="aycargo logo" />
        </a>
        <div>
          <a href="/">Home</a>
          <a href="/about">About us</a>
          <a href="/#faq">FAQ</a>
          <a href="/#contact">Contact us</a>
          {/* <a href="/#">Our Strength</a> */}
        </div>
        <div>
          <a href="/quote">
            <button>Request a quote</button>
          </a>
        </div>
      </div>
      {/* mobile nav */}
      {/* mobile nav */}
      <nav className={styles.mobileNavbar}>
        <div>
          <div>
            <Image src={logo} alt="chatDR" />
            <div>
              <ul className={`${menuOpen ? styles.open : ""}`}>
                <div>
                  {/* <p>Menu</p> */}
                  <div className={styles.toggle} onClick={toggleMenu}>
                    <Image src={close} alt="close icon" className={styles.closeIcon} />
                  </div>
                </div>

                {routes.map((route) => (
                  <li key={route.path} className={styles.navThings}>
                    <Image src={route.icon} alt={route.alt} />
                    <Link href={route.path} className={styles.navvv}>
                      {route.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className={styles.toggle} onClick={toggleMenu}>
                <Image src={navopen} alt="nav toggle" width={35} />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
