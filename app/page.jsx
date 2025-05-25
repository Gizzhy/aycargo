import styles from "./page.module.scss";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./homepagecomponents/Hero";
import AboutSection from "./homepagecomponents/AboutSection";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <Hero />
      <AboutSection />
    </div>
  );
}
