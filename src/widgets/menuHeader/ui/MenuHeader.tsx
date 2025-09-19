import React from 'react'
import styles from './MenuHeader.module.css'

export const MenuHeader = () => {
  return (
    <header className={styles.menuHeader}>
      <h2 className={styles.title}>Меню</h2>
      <div className={styles.line}></div>
      <p className={styles.subtitle}>Часто заказывают</p>
    </header>
  )
}
