import { Link } from "react-router-dom";
import styles from "../header/ui/Header.module.css"
export const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>О нас</li>
        <li><Link to="/contacts">Контакты</Link></li>
      </ul>
    </nav>
  );
};
