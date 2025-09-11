import { Link } from "react-router-dom";
import styles from "../header/ui/Header.module.css"
export const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li><Link to="/about">О нас</Link></li>
        <li><Link to="/contacts">Локации</Link></li>
      </ul>
    </nav>
  );
};
