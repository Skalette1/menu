import React, { useState } from "react";
import styles from "./Carousel.module.css";

type CarouselProps = {
  images: { src: string; text?: string }[]; // теперь можно передавать текст
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
            {item.text && <div className={styles.slideText}>{item.text}</div>}
          </div>
        ))}
      </div>

      {/* Пагинация */}
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
