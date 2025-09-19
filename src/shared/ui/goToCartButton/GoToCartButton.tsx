import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from "./GoToCartButton.module.css";

export const GoToCartButton: React.FC = () => {
  const count = useSelector((state: any) =>
    state.cart?.items?.reduce((sum: number, item: any) => sum + item.count, 0) || 0
  );

  return (
    <Link to="/cart" className={styles.goToCartButton}>
      <p>Корзина</p>
      <p className={styles.counterCart}>{count}</p>
    </Link>
  );
};

