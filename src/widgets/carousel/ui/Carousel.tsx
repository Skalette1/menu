import React, { useState, useRef, useEffect } from "react";
import cartPng from "../../../../public/bag2.svg";
import styles from "./Carousel.module.css";
import { Link } from "react-router-dom";
import { CartPopup } from "../../../shared/ui/infoPop/CartPopup";

type CarouselProps = {
  images: { src: string; header: string; text?: string }[];
};

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const resetAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(handleNext, 5000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
      setIsDragging(false);
      resetAutoSlide(); 
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    resetAutoSlide();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setIsDragging(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = startX - currentX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
      setIsDragging(false);
      resetAutoSlide();
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    resetAutoSlide();
  };

  useEffect(() => {
    resetAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div
      className={styles.carousel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className={styles.imgContainer}>
        <CartPopup />
        <Link to="/cart">
          <img src={cartPng} alt="cart" />
        </Link>
      </div>

      <div
        className={styles.slides}
        style={{
          transform: `translateX(-${current * 100}%)`,
          transition: isDragging ? "none" : "transform 0.3s ease",
        }}
      >
        {images.map((item, idx) => (
          <div key={idx} className={styles.slide}>
            <img src={item.src} alt={`slide-${idx}`} />
            <div className={styles.textContainer}>
              <h2
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className={styles.slideHeader}
              >
                {item.header}
              </h2>
              {item.text && <div className={styles.slideText}>{item.text}</div>}
            </div>
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
            onClick={() => {
              setCurrent(idx);
              resetAutoSlide();
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
