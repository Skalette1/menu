import React from "react";
import cofePng from "../../../../public/photo_1_2025-09-11_01-31-50.jpg"
import desseerPng from "../../../../public/photo_2_2025-09-11_01-31-50.jpg"
import hotPng from "../../../../public/photo_3_2025-09-11_01-31-50.jpg"
import saladsPng from "../../../../public/photo_4_2025-09-11_01-31-50.jpg"
import styles from "./Menu.module.css"
interface MenuItem {
  id: number;
  name: string;
  image: string;
}

const menuItems: MenuItem[] = [
  { id: 1, name: "Напитки", image: cofePng },
  { id: 2, name: "Десерты", image: desseerPng },
  { id: 3, name: "Горячее", image:saladsPng },
  { id: 4, name: "Салаты", image: hotPng },
];

export const Menu = () => {
  return (
    <div className={styles.menu}>
      {menuItems.map((item) => (
        <div
  className={styles.menuCard}
  key={item.id}
  style={{ backgroundImage: `url(${item.image})` }}
>
  <h3>{item.name}</h3>
</div>
      ))}
    </div>
  );
};
