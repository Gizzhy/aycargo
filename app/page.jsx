import styles from "./page.module.scss";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./homepagecomponents/Hero";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <Hero />
    </div>
  );
}
