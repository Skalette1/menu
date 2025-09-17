import React, { useState } from "react";
import styles from "./Carousel.module.css";

type CarouselProps = {
  images: { src: string; header: string;text?: string }[]; 
};

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className={styles.carousel}>
      <div
        className={styles.slides}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((item, idx) => (
          <div key={idx} className={styles.slide}>
            <img src={item.src} alt={`slide-${idx}`} />
            <h2 style={{fontFamily: "'Cormorant Garamond', serif", fontSize: "8rem", }} className={styles.slideHeader}>{item.header}</h2>
            {item.text && <div className={styles.slideText}>{item.text}</div>}
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`${styles.dot} ${
              current === idx ? styles.dotActive : ""
            }`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
