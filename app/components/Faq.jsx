"use client";

import React, { useState } from "react";
import styles from "./styles/faq.module.scss";
import faq from "../../assets/images/faq.svg";
import Image from "next/image";

const Faq = () => {
  const faqData = [
    {
      question: "What services does AYCargo provide?",
      answer:
        "AYCargo offers a variety of logistics and shipping services including: Air freight, Sea freight, Road freight, General logistics,Door-to-door delivery services",
    },
    {
      question: "What types of items can I ship with AYCargo?",
      answer:
        "You can ship a wide range of goods including: Clothing, Food items, Cars and other vehicles, Electronics, Furniture, Machinery, Equipment",
    },
    {
      question: "Which countries does AYCargo operate in?",
      answer:
        "AYCargo ships: From Nigeria to the UK, From the UK to Nigeria, From the UK to other African countries",
    },
    {
      question: "How fast and reliable is AYCargo's service?",
      answer:
        "AYCargo promotes its services as safe and fast, ensuring reliable logistics solutions for personal and commercial needs.",
    },
    {
      question: "What is AYCargo's motto?",
      answer:
        "Seamless Shipping Solutions - reflecting a commitment to hassle-free logistics and customer satisfaction.",
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
