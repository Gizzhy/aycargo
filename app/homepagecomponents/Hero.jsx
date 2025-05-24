import React from "react";
import styles from "./styles/hero.module.scss";
import Image from "next/image";
import car from "../../assets/icons/car.svg";
import plane from "../../assets/icons/plane.svg";
import arrow from "../../assets/icons/arrow.svg";
import vehicles from "../../assets/images/Desktop.svg";

const Hero = () => {
  return (
    <>
      <div className={styles.hero}>
        <div>
          <Image src={car} alt="cargo car" />
          <Image src={plane} alt="cargo plane" />
          <p>
            We provide <span>logistics solution</span> tailor-made for
            individual customer!
          </p>
          <p>
            We offer logistics services to 5,000 business around the world
            ranging from Air frieght to Sea frieght to Cargo to Door to Door
            delivery.
          </p>
          <div>
            <button>
              Price Calculator
              <Image src={arrow} alt="arrow right" />
            </button>
            <button>Contact Us</button>
          </div>
        </div>
        <div>
          <Image src={vehicles} alt="vehicles" />
        </div>
      </div>
    </>
  );
};

export default Hero;
