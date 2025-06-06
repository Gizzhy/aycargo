import React from "react";
import styles from "./about.module.scss";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import about from "../../assets/images/about.svg";
import Image from "next/image";

const page = () => {
  return (
    <>
      <Navbar />
      <div className={styles.about}>
        <Image src={about} alt="about us" />
        <p>
          Our job is to provide Rapid response and collection service from
          anywhere in the world. We are a Logistics Company who pride Ourselves
          in designing and Implementing flexible, efficient solutions
          specifically tailored for each of our clients.
        </p>
        <p>
          24- hours a day, 7 days a week, we provide not only the most cost
          efficient solutions, but also the highest levels of support.
        </p>
        <ul>
          <p>Services:</p>
          <li>Air freight </li>
          <li>Sea freight </li>
          <li>Road freight </li>
          <li>Logistics</li>
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default page;
