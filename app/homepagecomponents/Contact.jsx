"use client";

import React, { useState } from "react";
import { useFormspark } from "@formspark/use-formspark";
import styles from "./styles/contact.module.scss";
import location from "../../assets/icons/location.svg";
import emaill from "../../assets/icons/email.svg";
import phonee from "../../assets/icons/phone.svg";
import insta from "../../assets/icons/insta.svg";
import x from "../../assets/icons/x.svg";
import letter from "../../assets/icons/lettersend.svg";
import Image from "next/image";
// import { message } from "antd";

const FORMSPARK_FORM_ID = "ltpqB5fry";

const Contact = () => {
  const [submit, submitting] = useFormspark({
    formId: FORMSPARK_FORM_ID,
  });
  const [messages, setMessages] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submit({ firstname, lastname, phone, email, messages });
      // message.success("Message sent successfully");
      alert("Message sent successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className={styles.contact} id="contact">
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
                <Image src={phonee} alt="phone" />
                <span>+2347068381568, +447867487444</span>
              </div>
              <div>
                <Image src={emaill} alt="phone" />
                <span>info@aycargo.org</span>
              </div>
              <div>
                <Image src={location} alt="phone" />
                <span>Bradford, United Kingdom.</span>
              </div>
            </div>
            <div>
              <a href="https://www.instagram.com/ay_cargo">
                <Image src={insta} alt="instagram" />
              </a>
              <a href="https://x.com/aycargo1">
                <Image src={x} alt="twitter" />
              </a>
            </div>
          </div>
          <div>
            <form onSubmit={onSubmit}>
              <div>
                <div>
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>
                <div>
                  <label>Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div>
                  <label>Phone Number</label>
                  <input
                    type="text"
                    placeholder="+440123456789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div>
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label>Message</label>
                <input
                  type="text"
                  placeholder="Write your message.."
                  value={messages}
                  onChange={(e) => setMessages(e.target.value)}
                />
              </div>
              <div>
                <button type="submit" disabled={submitting}>
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
            <Image src={letter} alt="arrow letter" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
