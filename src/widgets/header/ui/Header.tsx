import { Link } from "react-router-dom";
import { Navbar } from "../../navbar/Navbar";
import { Search } from "../model/Search";
import logo from "../../../../public/photo_2025-09-11_01-52-18.jpg"
import styles from "./Header.module.css"

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
      <Link to="/">
      <h1>Coffee <span style={{textDecoration: "underline"}}>shop</span></h1>
      </Link>
        <Navbar />
      </div>
      <Search />
    </header>
  );
}
//<img src={logo} alt="logo" />