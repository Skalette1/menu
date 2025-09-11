import React from "react";
import { Link } from "react-router-dom";
import cofePng from "../../../../public/photo_1_2025-09-11_01-31-50.jpg";
import dessertPng from "../../../../public/photo_2_2025-09-11_01-31-50.jpg";
import hotPng from "../../../../public/photo_4_2025-09-11_01-31-50.jpg";
import saladsPng from "../../../../public/photo_3_2025-09-11_01-31-50.jpg";
import styles from "./Menu.module.css";

interface MenuItem {
  id: number;
  name: string;
  image: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { id: 1, name: "Напитки", image: cofePng, path: "/drinks" },
  { id: 2, name: "Десерты", image: dessertPng, path: "/desserts" },
  { id: 3, name: "Горячее", image: hotPng, path: "/hot" },
  { id: 4, name: "Салаты", image: saladsPng, path: "/salads" },
];

export const Menu = () => {
  return (
    <div className={styles.menu}>
      {menuItems.map((item) => (
        <Link to={item.path} key={item.id} className={styles.menuCardLink}>
          <div
            className={styles.menuCard}
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <h3>{item.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};
