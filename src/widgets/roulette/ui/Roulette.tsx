import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../../shared/model/cartSlice";
import rouletPng from "../../../../public/Vector.png";
import arrow from "../../../../public/Arrow 1.png";
import cartPng from "../../../../public/cart.png";
import restartPng from "../../../../public/rest.svg"; // добавь иконку рестарта
import rouletteCofe1 from "../../../../public/rouletteCofe1.png";
import rouletteCofe2 from "../../../../public/rouletteCofe2.png";
import rouletteCofe3 from "../../../../public/rouletteCofe3.png";
import styles from "./Roulette.module.css";
import { Link } from "react-router-dom";

const drinks = [
  { id: 1, name: "Эспрессо", img: rouletteCofe1 },
  { id: 2, name: "Американо", img: rouletteCofe2 },
  { id: 3, name: "Капучино", img: rouletteCofe3 },
];

export const Roulette: React.FC = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [selected, setSelected] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [finished, setFinished] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleRandom = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setFinished(false);

    const randomIdx = Math.floor(Math.random() * drinks.length);
    let spins = 15 + randomIdx;
    let current = selected;

    const spinInterval = setInterval(() => {
      current = (current + 1) % drinks.length;
      setSelected(current);
      spins--;

      if (spins <= 0) {
        clearInterval(spinInterval);
        setIsSpinning(false);
        setFinished(true);
      }

      if (carouselRef.current) {
        const card = carouselRef.current.children[current] as HTMLElement;
        if (card) {
          const offset =
            card.offsetLeft +
            card.offsetWidth / 2 -
            carouselRef.current.offsetWidth / 2;

          carouselRef.current.scrollTo({ left: offset, behavior: "smooth" });
        }
      }
    }, 80);
  };

  const handleRestart = () => {
    setFinished(false);
    setSelected(0);
  };

  const handleAddToCart = () => {
    const drink = drinks[selected];
    dispatch(addItem({ item: { id: drink.id, name: drink.name, img: drink.img, price: 250 }, count }));
  };

  return (
    <div className={styles.rouletteContainer}>
      <div className={styles.headerCentered}>
        <h2>Рулетка</h2>
        <span className={styles.arrowCentered}>
          <img src={arrow} alt="arrow" />
        </span>
      </div>

      <div className={styles.carouselWrapper}>
        <div className={styles.carousel} ref={carouselRef}>
          {drinks.map((drink, idx) => (
            <div
              key={drink.id}
              className={
                idx === selected ? styles.selectedCard : styles.drinkCard
              }
              onClick={() => !isSpinning && setSelected(idx)}
            >
              <img
                src={drink.img}
                alt={drink.name}
                className={styles.selectedImg}
              />
              {/* <div className={styles.selectedName}>{drink.name}</div> */}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.actionsCentered}>
        {!finished ? (
          <button
            className={styles.rouletBtn}
            onClick={handleRandom}
            disabled={isSpinning}
            style={{ cursor: isSpinning ? "not-allowed" : "pointer" }}
          >
            <img src={rouletPng} alt="Spin" />
          </button>
        ) : (
          <div className={styles.resultButtons}>
            <div className={styles.counter}>
              <button onClick={() => setCount(Math.max(1, count - 1))} disabled={isSpinning} className={styles.decrement}>-</button>
              <span>{count}</span>
              <button onClick={() => setCount(count + 1)} disabled={isSpinning} className={styles.increment}>+</button>
            </div>
            <div className={styles.resultActions}>
            <Link to="/cart">
            <button className={`${styles.cartBtn} ${styles.rouletBtn}`} onClick={handleAddToCart}>
              <img src={cartPng} alt="Cart" />
            </button>
            </Link>
            <button
              className={`${styles.restartBtn} ${styles.rouletBtn}`}
              onClick={handleRestart}
            >
              <img src={restartPng} alt="Restart" />
            </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
