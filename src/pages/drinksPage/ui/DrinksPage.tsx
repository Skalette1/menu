import { DRINKS } from "../model/drinks";
import type { Product } from "../model/drinks";
import styles from "../../../shared/ui/styles.module.css";

export const DrinksPage = () => {
  return (
    <>
      <div className={styles.page}>
        <h2>Напитки</h2>
        <ul className={styles.list}>
          {DRINKS.map((item: Product) => (
            <li key={item.id} className={styles.item}>
              <div className={styles.itemImage}>Фото</div>
              <div className={styles.itemName}>{item.name}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
