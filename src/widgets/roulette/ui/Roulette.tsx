import React, { useState } from 'react';
import { useRef } from 'react';
import rouletteCofe1 from '../../../../public/rouletteCofe1.png';
import rouletteCofe2 from '../../../../public/rouletteCofe2.png';
import rouletteCofe3 from '../../../../public/rouletteCofe3.png';
import styles from './Roulette.module.css';

// Пример данных напитков
const drinks = [
  { id: 1, name: 'Эспрессо', img: rouletteCofe1},
  { id: 2, name: 'Американо', img: rouletteCofe2},
  { id: 3, name: 'Капучино', img: rouletteCofe3},
];

export const Roulette: React.FC = () => {
  const [selected, setSelected] = useState<number>(0);
  const [count, setCount] = useState(1);
  const [isSpinning, setIsSpinning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleRandom = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    const randomIdx = Math.floor(Math.random() * drinks.length);
    let spins = 15 + randomIdx; // 15 оборотов + целевой индекс
    let current = selected;
    const spinInterval = setInterval(() => {
      current = (current + 1) % drinks.length;
      setSelected(current);
      spins--;
      if (spins <= 0) {
        clearInterval(spinInterval);
        setIsSpinning(false);
      }
      // Автопрокрутка к центру
      if (carouselRef.current) {
        const card = carouselRef.current.children[current] as HTMLElement;
        if (card) {
          const offset = card.offsetLeft + card.offsetWidth / 2 - carouselRef.current.offsetWidth / 2;
          carouselRef.current.scrollTo({ left: offset, behavior: 'smooth' });
        }
      }
    }, 80);
  };

  return (
    <div className={styles.rouletteContainer}>
      <div className={styles.headerCentered}>
        <span>Рулетка</span>
        <span className={styles.arrowCentered}>▼</span>
      </div>
      <div className={styles.carouselWrapper}>
        <div className={styles.carousel} ref={carouselRef}>
          {drinks.map((drink, idx) => (
            <div
              key={drink.id}
              className={
                idx === selected
                  ? styles.selectedCard
                  : styles.drinkCard
              }
              onClick={() => !isSpinning && setSelected(idx)}
            >
              <img src={drink.img} alt={drink.name} className={styles.selectedImg} />
              <div className={styles.selectedName}>{drink.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.actionsCentered}>
        <button className={styles.randomBtn} onClick={handleRandom} disabled={isSpinning}>🎲</button>
        <button className={styles.cartBtn}>🛒</button>
        <div className={styles.counter}>
          <button onClick={() => setCount(Math.max(1, count - 1))} disabled={isSpinning}>-</button>
          <span>{count}</span>
          <button onClick={() => setCount(count + 1)} disabled={isSpinning}>+</button>
        </div>
      </div>
    </div>
  );
};
