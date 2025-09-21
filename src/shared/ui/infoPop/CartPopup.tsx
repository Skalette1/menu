import React from "react";
import { Popover } from "antd";
import popCart from "../../../../public/ChatGPT Image 21 сент. 2025 г., 02_29_54.png";
import cashRegister from "../../../../public/ChatGPT Image 21 сент. 2025 г., 02_41_22.png";
import styles from "../styles.module.css";

export const CartPopup: React.FC = () => {
  const content = (
    <div className={styles.popoverContent}>
      <div className={styles.header}>
        <h3 className={styles.popTitle}>
          🛒 Оформить заказ в 2 шага
        </h3>
      </div>
      
      <div className={styles.stepsContainer}>
        <div className={styles.step}>
          <div className={styles.stepNumber}>1</div>
          <img 
            src={popCart} 
            alt="Иллюстрация корзины" 
            className={styles.stepImage}
          />
          <p className={styles.stepText}>Соберите блюда в корзину</p>
        </div>
        
        <div className={styles.stepConnector}>
          <div className={styles.connectorLine}></div>
          <div className={styles.connectorArrow}></div>
        </div>
        
        <div className={styles.step}>
          <div className={styles.stepNumber}>2</div>
          <img 
            src={cashRegister} 
            alt="Иллюстрация кассы" 
            className={styles.stepImage}
          />
          <p className={styles.stepText}>Подойдите к кассе и покажите корзину кассиру</p>
        </div>
      </div>
      
      <div className={styles.footer}>
        <button className={styles.ctaButton}>
          Открыть корзину
        </button>
      </div>
    </div>
  );

  return (
    <Popover 
      content={content} 
      title={null}
      trigger="click" 
      placement="bottomRight"
      overlayClassName={styles.popoverOverlay}
      getPopupContainer={(trigger) => trigger.parentElement!}
    >
      <div className={styles.cartTrigger}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          className={styles.cartIcon}
        >
          <path
            d="M14.1543 17.6094C14.1543 17.906 14.0663 18.1961 13.9015 18.4427C13.7367 18.6894 13.5024 18.8817 13.2283 18.9952C12.9542 19.1087 12.6526 19.1384 12.3617 19.0806C12.0707 19.0227 11.8034 18.8798 11.5936 18.67C11.3839 18.4603 11.241 18.193 11.1831 17.902C11.1252 17.611 11.155 17.3094 11.2685 17.0353C11.382 16.7613 11.5743 16.527 11.8209 16.3622C12.0676 16.1973 12.3576 16.1094 12.6543 16.1094C13.0521 16.1094 13.4337 16.2674 13.715 16.5487C13.9963 16.83 14.1543 17.2116 14.1543 17.6094ZM22.7793 12.7344C22.7793 14.7369 22.1855 16.6945 21.0729 18.3595C19.9604 20.0246 18.3791 21.3223 16.529 22.0887C14.6789 22.855 12.6431 23.0555 10.679 22.6648C8.71495 22.2742 6.91085 21.3098 5.49485 19.8938C4.07884 18.4778 3.11453 16.6737 2.72385 14.7097C2.33318 12.7456 2.53368 10.7098 3.30002 8.85971C4.06636 7.0096 5.3641 5.42829 7.02915 4.31575C8.6942 3.2032 10.6518 2.60938 12.6543 2.60938C15.3387 2.61235 17.9123 3.68005 19.8105 5.57821C21.7086 7.47637 22.7763 10.05 22.7793 12.7344ZM20.5293 12.7344C20.5293 11.1768 20.0674 9.6543 19.2021 8.35926C18.3368 7.06422 17.1069 6.05486 15.6679 5.45882C14.229 4.86278 12.6456 4.70683 11.118 5.01069C9.59036 5.31455 8.18717 6.06457 7.08584 7.16591C5.9845 8.26725 5.23448 9.67044 4.93062 11.198C4.62676 12.7256 4.78271 14.309 5.37875 15.748C5.97479 17.187 6.98415 18.4169 8.27919 19.2822C9.57422 20.1475 11.0968 20.6094 12.6543 20.6094C14.7422 20.6071 16.7439 19.7767 18.2203 18.3004C19.6967 16.824 20.5271 14.8223 20.5293 12.7344ZM12.6543 6.73438C10.3799 6.73438 8.5293 8.41625 8.5293 10.4844V10.8594C8.5293 11.1577 8.64783 11.4439 8.85881 11.6549C9.06978 11.8658 9.35593 11.9844 9.6543 11.9844C9.95267 11.9844 10.2388 11.8658 10.4498 11.6549C10.6608 11.4439 10.7793 11.1577 10.7793 10.8594V10.4844C10.7793 9.6575 11.6231 8.98438 12.6543 8.98438C13.6856 8.98438 14.5293 9.6575 14.5293 10.4844C14.5293 11.3112 13.6856 11.9844 12.6543 11.9844C12.3559 11.9844 12.0698 12.1029 11.8588 12.3139C11.6478 12.5249 11.5293 12.811 11.5293 13.1094V13.8594C11.5286 14.1373 11.6309 14.4057 11.8163 14.6127C12.0018 14.8197 12.2573 14.9508 12.5336 14.9806C12.81 15.0104 13.0876 14.9369 13.3129 14.7742C13.5382 14.6114 13.6954 14.3711 13.754 14.0994C15.4959 13.6606 16.7793 12.2066 16.7793 10.4844C16.7793 8.41625 14.9287 6.73438 12.6543 6.73438Z"
            fill="currentColor"
          />
        </svg>
        <span className={styles.cartBadge}>0</span>
      </div>
    </Popover>
  );
};