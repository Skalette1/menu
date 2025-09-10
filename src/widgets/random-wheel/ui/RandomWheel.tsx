import React, { useState, useEffect, useRef } from "react";
import styles from "./RandomWheel.module.css";
import type { Product, Category } from "../../../enteties/product/types";

interface Props {
  products: Product[];
  categories: Category[];
}

export const RandomWheel: React.FC<Props> = ({ products, categories }) => {
  const [category, setCategory] = useState<Category>("drinks");
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selected, setSelected] = useState<Product | null>(null);
  const [wheelKey, setWheelKey] = useState(0); 
  const filtered = products.filter((p) => p.category === category);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value as Category);
    setRotation(0);
    setSelected(null);
    setWheelKey(prev => prev + 1); 
  };

  const spin = () => {
    if (spinning || filtered.length === 0) return;

    setSpinning(true);
    setSelected(null);

    const sectorAngle = 360 / filtered.length;
    const randomIndex = Math.floor(Math.random() * filtered.length);
    const randomAngle = randomIndex * sectorAngle + sectorAngle / 2;

    const spins = 5;
    const finalRotation = spins * 360 + (360 - randomAngle);

    setRotation((prev) => prev + finalRotation);

    setTimeout(() => {
      setSelected(filtered[randomIndex]);
      setSpinning(false);
    }, 4000);
  };

  return (
    <div className={styles.wrapper}>
      <h3>🎲 Рулетка вкуса</h3>

      <div className={styles.controls}>
        <label>
          Категория:
          <select value={category} onChange={handleCategoryChange}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <button onClick={spin} disabled={spinning || filtered.length === 0} className={styles.button}>
          {spinning ? "Крутим..." : "Крутить"}
        </button>
      </div>

      {filtered.length === 0 ? (
        <div>Нет продуктов в этой категории</div>
      ) : (
        <div className={styles.wheelWrap}>
          <div
            key={wheelKey}
            className={styles.wheel}
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? "transform 4s cubic-bezier(.17,.67,.83,.67)" : "none",
            }}
          >
            {filtered.map((item, i) => {
              const sectorAngle = 360 / filtered.length;
              const rotate = sectorAngle * i;
              
              return (
                <div
                  key={item.id}
                  className={styles.sector}
                  style={{
                    transform: `rotate(${rotate}deg)`,
                    background: i % 2 === 0 ? "#d9a066" : "#f5d7b0",
                  }}
                >
                  <div className={styles.sectorContent}>
                    <span>{item.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.pointer} />
        </div>
      )}

      {selected && (
        <div className={styles.result}>
          🎉 Выпало: <strong>{selected.name}</strong>
        </div>
      )}
    </div>
  );
};