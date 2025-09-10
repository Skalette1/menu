import React from 'react';
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logoSection}>
            <h3 className={styles.logo}>Cafe de Casa</h3>
            <p className={styles.description}>
              Уютное место для наслаждения лучшим кофе и десертами в городе
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <span className={styles.icon}>📷</span>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Telegram">
                <span className={styles.icon}>✈️</span>
              </a>
              <a href="#" className={styles.socialLink} aria-label="VK">
                <span className={styles.icon}>👥</span>
              </a>
            </div>
          </div>

          <div className={styles.linksSection}>
            <div className={styles.linksColumn}>
              <h4 className={styles.columnTitle}>Меню</h4>
              <a href="#" className={styles.link}>Кофе</a>
              <a href="#" className={styles.link}>Десерты</a>
              <a href="#" className={styles.link}>Горячее</a>
              <a href="#" className={styles.link}>Салаты</a>
            </div>

            <div className={styles.linksColumn}>
              <h4 className={styles.columnTitle}>Информация</h4>
              <a href="#" className={styles.link}>О нас</a>
              <a href="#" className={styles.link}>Контакты</a>
              <a href="#" className={styles.link}>Доставка</a>
              <a href="#" className={styles.link}>Акции</a>
            </div>

            <div className={styles.linksColumn}>
              <h4 className={styles.columnTitle}>Контакты</h4>
              <div className={styles.contactInfo}>
                <span className={styles.contactItem}>📞 +7 (999) 123-45-67</span>
                <span className={styles.contactItem}>📧 hello@cafedecasa.ru</span>
                <span className={styles.contactItem}>📍 ул. Кофейная, 15</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.divider} />
          <div className={styles.copyright}>
            <p>© 2025 Cafe de Casa. All Rights Reserved</p>
            <div className={styles.legalLinks}>
              <a href="#" className={styles.legalLink}>Политика конфиденциальности</a>
              <a href="#" className={styles.legalLink}>Условия использования</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};