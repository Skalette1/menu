
import styles from "../ui/Header.module.css";

export const Search = () => {
  return (
    <form className={styles.searchForm} role="search">
      <input
        type="search"
        placeholder="Поиск..."
        className={styles.searchInput}
        aria-label="Поиск"
      />
      <button type="submit" className={styles.searchButton}>
        Найти
      </button>
    </form>
  );
};
