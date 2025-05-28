import React from "react";
import styles from "./styles/contact.module.scss";
import location from "../../assets/icons/location.svg";
import email from "../../assets/icons/email.svg";
import phone from "../../assets/icons/phone.svg";
import insta from "../../assets/icons/insta.svg";
import x from "../../assets/icons/x.svg";
import Image from "next/image";

const Contact = () => {
  return (
    <>
      <div className={styles.contact}>
        <p>Contact Us</p>
        <p>Any question or remarks? Just write us a message!</p>
        <div>
          <div>
            <div>
              <p>Contact Information</p>
              <p>
                Fill out the form and we'll get in touch as son as possible.
              </p>
            </div>
            <div>
              <div>
                <Image src={phone} alt="phone" />
                <span>+2347068381568, +447867487444</span>
              </div>
              <div>
                <Image src={email} alt="phone" />
                <span>info@aycargo.org</span>
              </div>
              <div>
                <Image src={location} alt="phone" />
                <span>Bradford, United Kingdom.</span>
              </div>
            </div>
            <div>
              <a href="/#">
                <Image src={insta} alt="instagram" />
              </a>
              <a href="/#">
                <Image src={x} alt="twitter" />
              </a>
            </div>
          </div>
          <div>form</div>
        </div>
      </div>
    </>
  );
};

export default Contact;
