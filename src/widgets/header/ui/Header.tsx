import { Link } from "react-router-dom";
import { Navbar } from "../../navbar/Navbar";
import { Search } from "../model/Search";
import styles from "./Header.module.css"

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <h1><Link to="/">Emin</Link></h1>
        <Navbar />
      </div>
      <Search />
    </header>
  );
}
