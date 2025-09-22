import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./GoToCartButton.module.css";

export const GoToCartButton: React.FC = () => {
  const count = useSelector(
    (state: any) =>
      state.cart?.items?.reduce(
        (sum: number, item: any) => sum + item.count,
        0,
      ) || 0,
  );

  const [visible, setVisible] = React.useState<boolean>(() => {
    try {
      const v = localStorage.getItem("goToCartVisible");
      return v === null ? true : v === "true";
    } catch (e) {
      return true;
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem("goToCartVisible", visible ? "true" : "false");
    } catch (e) {
      // ignore
    }
  }, [visible]);

  if (!visible) {
    return (
      <button
        className={styles.showButton}
        aria-label="Показать корзину"
        onClick={() => setVisible(true)}
      >
        🛒
      </button>
    );
  }

  return (
    <div className={styles.goToCartButtonWrapper}>
      <Link to="/cart" className={styles.goToCartButton}>
        <p>Корзина</p>
        <p className={styles.counterCart}>{count}</p>
      </Link>
    </div>
  );
};