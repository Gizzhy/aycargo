import React from "react";
import styles from "./styles/footer.module.scss";
import logo from "../../assets/images/logo2.svg";
import location from "../../assets/icons/location.svg";
import email from "../../assets/icons/email.svg";
import phone from "../../assets/icons/phone.svg";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <Image src={logo} alt="aycargo logo" />
        <div></div>
        <div>
          <div>
            <p>Reach us</p>
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
            <p>Company</p>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </div>
          <div>
            <p>Legal</p>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms & Services</a>
            <a href="/terms">Terms of Use</a>
            <a href="/terms">Refund Policy</a>
          </div>
          <div>
            <p>Socials</p>
            <a href="https://www.instagram.com/ay_cargo">Instagram</a>
            <a href="https://x.com/aycargo1">X</a>
          </div>
          <div>
            <div>
              <p>Join Our Newsletter</p>
              <div>
                <input type="email" placeholder="Your email address" />
                <button>Subscribe</button>
              </div>
              <p>
                * Will send you weekly updates for your better tool management.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
