import React, { useState, useEffect } from "react";
import scrollToTopPng from "../../../../public/toTop.png";
import styles from "./ScrollToTop.module.css";
const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    visible && (
      <button onClick={scrollToTop}>
        <img src={scrollToTopPng} className={styles.scrollToTop} alt="toTop" />
      </button>
    )
  );
};

export default ScrollToTopButton;
