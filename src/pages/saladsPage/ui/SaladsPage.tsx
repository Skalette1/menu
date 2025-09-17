import { SALADS } from "../model/salads";
import type { Product } from "../model/salads";
import styles from "../../../shared/ui/styles.module.css";

export const SaladsPage = () => {
  return (
    <>
      <div className={styles.page}>
        <h2>Салаты</h2>
        <ul className={styles.list}>
          {SALADS.map((item: Product) => (
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
