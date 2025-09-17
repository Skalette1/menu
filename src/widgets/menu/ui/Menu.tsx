import React from "react";
import { Link } from "react-router-dom";
import styles from "./Menu.module.css";
import { menuItems } from "../model/menu";

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
