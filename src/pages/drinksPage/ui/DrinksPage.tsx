import { DRINKS } from "../model/drinks";
import type { Product } from "../model/drinks";
import styles from "../../../shared/ui/styles.module.css";
import { MenuHeader } from "../../../widgets/menuHeader/ui/MenuHeader";
import { MenuCarousel } from "../../../widgets/menuCarousel/ui/MenuCarousel";

export const DrinksPage = () => {
  return (
    <>
      <div className={styles.page}>
        <MenuHeader />
        <MenuCarousel />
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
