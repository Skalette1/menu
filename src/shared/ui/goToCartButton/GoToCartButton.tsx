import React from 'react'
import styles from "./GoToCartButton.module.css"
import { Link } from 'react-router-dom'

export const GoToCartButton = () => {
  return (
    <Link to="/cart" className={styles.goToCartButton}>
        <p>Корзина</p>
        <p className={styles.counterCart}>1</p>
    </Link>
  )
}
