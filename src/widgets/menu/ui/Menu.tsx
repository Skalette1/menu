import React from "react";
import cofePng from "../../../../public/vite.svg"
import styles from "./Menu.module.css"
interface MenuItem {
  id: number;
  name: string;
  image: string;
}

const menuItems: MenuItem[] = [
  { id: 1, name: "Пицца Маргарита", image: cofePng },
  { id: 2, name: "Суши сет", image: cofePng },
  { id: 3, name: "Бургер с картошкой", image: cofePng },
  { id: 4, name: "Салат Цезарь", image: cofePng },
];

export const Menu = () => {
  return (
    <div className={styles.menu}>
      {menuItems.map((item) => (
        <div
          className={styles.menuCard}
          key={item.id}
        >
          <img
            src={item.image}
            alt={item.name}
          />
          <h3>{item.name}</h3>
        </div>
      ))}
    </div>
  );
};
