import React from "react";
import styles from "./styles/aboutsec.module.scss";
import rocket from "../../assets/icons/rocket.svg";
import bulb from "../../assets/icons/bulb.svg";
import Image from "next/image";
import workers from "../../assets/images/workers.svg";

const AboutSection = () => {
  return (
    <>
      <div className={styles.aboutsec}>
        <p>About Us</p>
        <div>
          <div>
            <p>We Help To Get Solutions</p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
            <div>
              <div>
                <Image src={rocket} alt="rocket" />
                <div>
                  <p>Lorem Ipsum</p>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
              </div>
              <div>
                <Image src={bulb} alt="rocket" />
                <div>
                  <p>Lorem Ipsum</p>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
              </div>
            </div>
            <button>About Us</button>
          </div>
          <div>
            <Image src={workers} alt="workers" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutSection;
