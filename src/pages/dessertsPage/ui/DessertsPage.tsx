import { DESSERTS } from "../model/desserts";
import type { Product } from "../model/desserts";
import { Header } from "../../../widgets/header/ui/Header";
import { Footer } from "../../../widgets/footer/ui/Footer";
import styles from "../../../shared/ui/styles.module.css";

export const DessertsPage = () => {
  return (
    <>
      <Header />
      <div className={styles.page}>
        <h2>Десерты</h2>
        <ul className={styles.list}>
          {DESSERTS.map((item: Product) => (
            <li key={item.id} className={styles.item}>
              <div className={styles.itemImage}>Фото</div>
              <div className={styles.itemName}>{item.name}</div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};
