"use client";

import React, { useState, useEffect } from "react";
import styles from "./quote.module.scss";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import arrow from "../../assets/icons/lettersend.svg";
import quote from "../../assets/images/quote.svg";
import Image from "next/image";
import { useFormspark } from "@formspark/use-formspark";
import Faq from "../components/Faq";
const FORMSPARK_FORM_ID = "Dn8OHSGV3";

const page = () => {
  useEffect(() => {
    document.title = "Get a Quote | AYCARGO";
  }, []);
  const [submit, submitting] = useFormspark({
    formId: FORMSPARK_FORM_ID,
  });
  const [messages, setMessages] = useState("");
  const [senderFirstname, setSenderFirstname] = useState("");
  const [recipientFirstname, setRecipientFirstname] = useState("");
  const [recipientLastname, setRecipientLastname] = useState("");
  const [senderLastname, setSenderLastname] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  const [leavingAddress, setLeavingAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submit({
        senderFirstname,
        recipientFirstname,
        recipientLastname,
        senderLastname,
        messages,
        senderAddress,
        leavingAddress,
        destinationAddress,
        recipientAddress,
        senderPhone,
        senderEmail,
      });
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
      <Navbar />
      <div className={styles.quote}>
        <div>
          <p>Request a quote</p>
          <form onSubmit={onSubmit}>
            <div>
              <div>
                <label>SENDER'S FIRST NAME</label>
                <input
                  type="text"
                  placeholder="John"
                  value={senderFirstname}
                  onChange={(e) => setSenderFirstname(e.target.value)}
                />
              </div>
              <div>
                <label>SENDER'S LAST NAME</label>
                <input
                  type="text"
                  placeholder="Doe"
                  value={senderLastname}
                  onChange={(e) => setSenderLastname(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div>
                <label>SENDER'S PHONE</label>
                <input
                  type="text"
                  placeholder="+440123456789"
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                />
              </div>
              <div>
                <label>SENDER'S EMAIL</label>
                <input
                  type="text"
                  placeholder="hello@example.com"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label>SENDER'S ADDRESS</label>
              <input
                type="text"
                placeholder="Lekki phase 1"
                value={senderAddress}
                onChange={(e) => setSenderAddress(e.target.value)}
              />
            </div>
            <div>
              <label>LEAVING ADDRESS</label>
              <input
                type="text"
                placeholder="Lekki phase 1"
                value={leavingAddress}
                onChange={(e) => setLeavingAddress(e.target.value)}
              />
            </div>
            <div>
              <label>DESTINATION ADDRESS</label>
              <input
                type="text"
                placeholder="New york, USA"
                value={destinationAddress}
                onChange={(e) => setDestinationAddress(e.target.value)}
              />
            </div>
            <div>
              <div>
                <label>RECIPIENT'S FIRST NAME</label>
                <input
                  type="text"
                  placeholder="Jane"
                  value={recipientFirstname}
                  onChange={(e) => setRecipientFirstname(e.target.value)}
                />
              </div>
              <div>
                <label>RECIPIENT'S LAST NAME</label>
                <input
                  type="text"
                  placeholder="Doe"
                  value={recipientLastname}
                  onChange={(e) => setRecipientLastname(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label>RECIPIENT'S ADDRESS</label>
              <input
                type="text"
                placeholder="Tokyo, Japan"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
              />
            </div>
            <div>
              <label>DESCRIPTION</label>
              <input
                type="text"
                placeholder="Type here..."
                value={messages}
                onChange={(e) => setMessages(e.target.value)}
              />
            </div>
            <div>
              <button type="submit" disabled={submitting}>
                {loading ? "Sending..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
        <div>
          <Image src={arrow} alt="arrow" />
        </div>
        <div>
          <Image src={quote} alt="quote" />
        </div>
      </div>
      <Faq />
      <Footer />
    </>
  );
};

export default page;
