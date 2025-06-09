"use client";

import { useState, useEffect } from "react";
import styles from "./price.module.scss";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const page = () => {
  useEffect(() => {
    document.title = "Cargo Price Calculator | AYCARGO";
  }, []);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [weight, setWeight] = useState("");
  //   const [error, setError] = useState("");
  const [estimate, setEstimate] = useState(null);

  const handleCalculate = () => {
    if (from === to) {
      alert("Origin and Destination cannot be the same.");
      setEstimate(null);
      return;
    }

    if (!weight || isNaN(weight)) {
      alert("Please enter a valid weight.");
      setEstimate(null);
      return;
    }
    if (weight < 10) {
      alert("Minimum weight it 10kg");
      setEstimate(null);
      return;
    }

    let rate = 0;
    if (from === "nigeria" && to === "uk") {
      rate = 7000;
    } else if (from === "uk" && to === "nigeria") {
      rate = 5;
    } else {
      alert("Invalid route selected.");
      setEstimate(null);
      return;
    }

    // setError("");
    setEstimate(rate * parseFloat(weight));
  };
  return (
    <>
      <Navbar />
      <div className={styles.price}>
        <p>Price Calculator</p>
        <div>
          <p>Air Freight</p>
          <div>
            <div>
              <label>Origin</label>
              <select value={from} onChange={(e) => setFrom(e.target.value)}>
                <option value="" disabled>
                  Select a location
                </option>
                <option value="nigeria">Nigeria</option>
                <option value="uk">UK</option>
              </select>
            </div>
            <div>
              <label>Destination</label>
              <select value={to} onChange={(e) => setTo(e.target.value)}>
                <option value="" disabled>
                  Select a location
                </option>
                <option value="nigeria">Nigeria</option>
                <option value="uk">UK</option>
              </select>
            </div>
          </div>
          <div>
            <div>
              <label>Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                min="10"
                placeholder="35kg"
              />
            </div>
            <div>
              <label>Price</label>
              <input
                value={
                  estimate !== null
                    ? `${from === "uk" ? "£" : "₦"}${estimate.toLocaleString()}`
                    : ""
                }
                readOnly
                placeholder="0.00"
              />
            </div>
          </div>
          <button onClick={handleCalculate} className={styles.checkButton}>
            Check Price
          </button>
          <p className={styles.note}>
            * Please note that price are indicative only and might differ from
            the actual price depending on the concretely booked shipment and the
            information you provide. In particular prices might not include
            surcharges and fees.
          </p>
          {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
        </div>
        <div></div>
        <div></div>
      </div>
      <Footer />
    </>
  );
};

export default page;
