"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./price.module.scss";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import tv from "../../assets/images/tv.svg";
import box from "../../assets/images/box.svg";
import bag from "../../assets/images/bag.svg";

const page = () => {
  useEffect(() => {
    document.title = "Cargo Price Calculator | AYCARGO";
  }, []);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [weight, setWeight] = useState("");
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
      rate = 9000;
    } else if (from === "uk" && to === "nigeria") {
      rate = 6;
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
        </div>
        <div>
          <p>Sea Freight</p>
          <div>
            <div>
              <Image src={bag} alt="bags and boxes" />
              <p>Bags, Boxes, Suitcases</p>
              <p>
                Small: <span>£60</span>
              </p>
              <p>
                Medium: <span>£80</span>
              </p>
              <p>
                Large: <span>£100</span>
              </p>
              <p>
                Extra Large: <span>£120</span>
              </p>
            </div>
            <div>
              <Image src={box} alt="bags and boxes" />
              <p>Fridges, Oven & Washing Machines</p>
              <p>
                Standard Size: <span>£120</span>
              </p>
              <p>
                Fridge Freezer: <span>£180</span>
              </p>
              <p>
                American Fridge Freezer: <span>£280</span>
              </p>
              <p>
                Medium/Large Freezer: <span>£200</span>
              </p>
            </div>
          </div>
          <div>
            <div>
              <Image src={tv} alt="bags and boxes" />
              <p>Television</p>
              <p>
                40 - 60 inches: <span>£130</span>
              </p>
              <p>
                47 - 52 inches: <span>£200</span>
              </p>
              <p>
                55 - 62 inches: <span>£200</span>
              </p>
              <p>
                65 + inches: <span>£250</span>
              </p>
            </div>
            <div>
              <Image src={box} alt="bags and boxes" />
              <p>Vehicles</p>
              <p>
                Cars: <span>£3000</span>
              </p>
              <p>
                MVP: <span>£4000</span>
              </p>
            </div>
          </div>
        </div>
        <div></div>
        <div></div>
      </div>
      <Footer />
    </>
  );
};

export default page;
