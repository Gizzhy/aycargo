"use client";

import React, { useState } from "react";
import styles from "./styles/faq.module.scss";
import faq from "../../assets/images/faq.svg";
import Image from "next/image";

const Faq = () => {
  const faqData = [
    {
      question: "Do you pick up from car parks?",
      answer: "Yes we do",
    },
    {
      question: "Any Hidden charges?",
      answer:
        "There are no hidden charges, we clearly state our fees before shipping.",
    },
    {
      question: "Which countries does AYCargo operate in?",
      answer:
        "AYCargo ships: From Nigeria to the UK, From the UK to Nigeria, From the UK to other African countries",
    },
    {
      question:
        "I don't have packaging materials but I need to cargo kindly advise.",
      answer:
        "We will supply all packaging materials needed to protect your goods.",
    },
    {
      question: "How fast and reliable is AYCargo's service?",
      answer:
        "AYCargo promotes its services as safe and fast, ensuring reliable logistics solutions for personal and commercial needs.",
    },
    {
      question: "How fast and Reliable is Ay cargo operate in?",
      answer: "Within 7 working days you will get your shipments.",
    },
    {
      question: "Can AYCargo handle both personal and commercial shipments?",
      answer:
        "Yes, AYCargo handles a wide range of consignments, suitable for both personal and business logistics needs.",
    },
    {
      question: "Are there restrictions on what I can ship?",
      answer:
        "Yes, like all cargo services, AYCargo likely follows international and regional shipping regulations. Items considered hazardous, illegal, or restricted by customs cannot be shipped. Contact customer service for a full list of restricted items.",
    },
  ];
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };
  return (
    <>
      <div className={styles.faq} id="faq">
        <div>
          <Image src={faq} alt="faq" />
        </div>
        <div>
          <p>Frequently Asked Questions</p>
          <div className={styles.faqContainer}>
            {faqData.map((item, index) => (
              <div key={index} className={styles.faqItem}>
                <div
                  className={`${styles.faqQuestion} ${
                    index === openIndex ? styles.open : ""
                  }`}
                  onClick={() => toggleAccordion(index)}
                >
                  <span>{item.question}</span>
                  <span className={styles.icon}>
                    {index === openIndex ? "×" : "+"}
                  </span>
                </div>
                {index === openIndex && (
                  <div className={styles.faqAnswer}>{item.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
