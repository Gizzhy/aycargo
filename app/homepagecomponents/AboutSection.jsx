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
        <p>Why Work With Us</p>
        <div>
          <div>
            <p>We Help To Get Solutions</p>
            <p>
              At AY CARGO, we deliver reliable, secure, and efficient cargo and
              logistics services tailored to both individuals and businesses.
              With global reach and local expertise, we ensure your shipments
              arrive safely and on time, whether by air, sea, or road.
            </p>
            <div>
              <div>
                <Image src={rocket} alt="rocket" />
                <div>
                  <p>Global Reach</p>
                  <p>
                    From international shipping to domestic deliveries, AY CARGO
                    combines worldwide capabilities with local knowledge to make
                    your logistics experience hassle-free.
                  </p>
                </div>
              </div>
              <div>
                <Image src={bulb} alt="rocket" />
                <div>
                  <p>On-Time Deliveries</p>
                  <p>
                    We understand the importance of timing. Our dedicated team
                    and efficient network ensure your shipments arrive when
                    expected.
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
