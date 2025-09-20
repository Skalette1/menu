import React, { useState, useRef, useEffect } from "react";
import styles from "./Carousel.module.css";

type CarouselProps = {
  images: { src: string; header: string; text?: string }[];
};

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Обработчики для свайпа
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    // Если свайп достаточно большой, меняем слайд
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Также добавим поддержку мыши для десктопа
  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const currentX = e.clientX;
    const diff = startX - currentX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Автопрокрутка (опционально)
  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className={styles.carousel}
      ref={carouselRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className={styles.slides}
        style={{ 
          transform: `translateX(-${current * 100}%)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease'
        }}
      >
        {images.map((item, idx) => (
          <div key={idx} className={styles.slide}>
            <img src={item.src} alt={`slide-${idx}`} />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "8rem",
              }}
              className={styles.slideHeader}
            >
              {item.header}
            </h2>
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

      {/* Кнопки навигации (опционально) */}
      <button className={styles.navButton} onClick={handlePrev} style={{ left: '10px' }}>
        ‹
      </button>
      <button className={styles.navButton} onClick={handleNext} style={{ right: '10px' }}>
        ›
      </button>
    </div>
  );
};

export default Carousel;