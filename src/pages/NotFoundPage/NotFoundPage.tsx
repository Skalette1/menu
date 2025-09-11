import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./NotFound.module.css";

export const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.coffeeCup}>
          <div className={styles.cup}>
            <div className={styles.handle}></div>
            <div className={styles.coffee}></div>
            <div className={styles.steam}>
              <div className={styles.steam1}></div>
              <div className={styles.steam2}></div>
              <div className={styles.steam3}></div>
            </div>
          </div>
        </div>
        
        <div className={styles.textSection}>
          <h1 className={styles.title}>404</h1>
          <h2 className={styles.subtitle}>Ой! Страница уплыла как кофеин</h2>
          <p className={styles.description}>
            Кажется, эта страница затерялась среди ароматных зерен. 
            Но не переживайте - у нас есть много вкусного на главной!
          </p>
          
          <div className={styles.actions}>
            <Link to="/" className={styles.homeButton}>
              🏠 На главную
            </Link>
            {/* <Link to="/menu" className={styles.menuButton}>
              ☕ Посмотреть меню
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};