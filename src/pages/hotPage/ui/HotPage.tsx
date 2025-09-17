import { HOT } from "../model/hot";
import type { Product } from "../model/hot";
import styles from "../../../shared/ui/styles.module.css";

export const HotPage = () => {
  return (
    <>
      <div className={styles.page}>
        <h2>Горячие блюда</h2>
        <ul className={styles.list}>
          {HOT.map((item: Product) => (
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
