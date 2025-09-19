import React from "react";
import { PRODUCTS } from "../model/menuPage";
import styles from "../../../widgets/menuCarousel/ui/MenuCarousel.module.css";
import menuStyles from "./MenuPage.module.css"
import { useDispatch } from "react-redux";
import { addItem, removeItem, setCount } from "../../../shared/model/cartSlice";
import { GoToCartButton } from "../../../shared/ui/goToCartButton/GoToCartButton";
import ScrollToTopButton from "../../../shared/ui/scroll-to-top/ScrollToTopButton";
import rouletteCofe1 from '../../../../public/rouletteCofe1.png';
import rouletteCofe2 from '../../../../public/rouletteCofe2.png';
import rouletteCofe3 from '../../../../public/rouletteCofe3.png';
import cheesCakePng from '../../../../public/cheesecake-recipe.jpg';
import tiramisuPng from '../../../../public/tiramisu.jpg';
import rizottoPomidor from '../../../../public/risotto-al-pomodoro-e-basilico-260nw-2570085999.webp';
import rizotto from '../../../../public/rizotto.png';
import saladPng from '../../../../public/salad2.png';
import caesar from '../../../../public/caesar.webp';
import { MenuHeader } from "../../../widgets/menuHeader/ui/MenuHeader";
import { MenuCarousel } from "../../../widgets/menuCarousel/ui/MenuCarousel";


const IMAGES: Record<string, string> = {
  d1: rouletteCofe2,
  d2: rouletteCofe3,
  d3: rouletteCofe2,
  d4: rouletteCofe1,
  ds1: cheesCakePng,
  ds2: tiramisuPng,
  ds3: tiramisuPng,
  ds4: cheesCakePng,
  h1: rizottoPomidor,
  h2: rizotto,
  h3: rizottoPomidor,
  h4: rizotto,
  s1: saladPng,
  s2: caesar,
  s3: caesar,
  s4: saladPng,
};

const CATEGORY_LABELS: Record<string, string> = {
  drinks: "Напитки",
  desserts: "Десерты",
  hot: "Горячие блюда",
  salads: "Салаты",
};

export const MenuPage: React.FC<{ category: "drinks" | "desserts" | "hot" | "salads" }> = ({ category }) => {
  const dispatch = useDispatch();
  const [counts, setCounts] = React.useState<{[id:string]:number}>({});
  const filtered = PRODUCTS.filter((item) => item.category === category);
  return (
    <div className={styles.container}>
    <MenuHeader />
    <MenuCarousel />
      <h2>{CATEGORY_LABELS[category]}</h2>
      <div className={menuStyles.menu}>
        {filtered.map((item) => (
          <div key={item.id} className={styles.card}>
            <img src={IMAGES[item.id]} alt={item.name} className={styles.img} />
            <div className={styles.name}>{item.name}</div>
            <div className={styles.price}>{item.price}₽</div>
            {counts[item.id] && counts[item.id] > 0 ? (
              <div className={styles.counterWrapper}>
                <button
                  className={styles.counterBtn}
                  onClick={() => {
                    setCounts(c => {
                      const newCount = (c[item.id] || 1) - 1;
                      if (newCount <= 0) {
                        const copy = { ...c };
                        delete copy[item.id];
                        dispatch(removeItem(Number(item.id)));
                        return copy;
                      }
                      dispatch(setCount({ id: Number(item.id), count: newCount }));
                      return { ...c, [item.id]: newCount };
                    });
                  }}
                >-</button>
                <span className={styles.counter}>{counts[item.id]}</span>
                <button
                  className={styles.counterBtn}
                  onClick={() => {
                    setCounts(c => {
                      const newCount = (c[item.id] || 0) + 1;
                      dispatch(setCount({ id: Number(item.id), count: newCount }));
                      return { ...c, [item.id]: newCount };
                    });
                  }}
                >+</button>
              </div>
            ) : (
              <button
                className={styles.addBtn}
                onClick={() => {
                  setCounts(c => ({...c, [item.id]: 1}));
                  dispatch(addItem({ item: { ...item, img: IMAGES[item.id], id: Number(item.id) }, count: 1 }));
                }}
              >
                <span className={styles.plusIcon}>+</span>
              </button>
            )}
          </div>
        ))}
      </div>
      <GoToCartButton />
      <ScrollToTopButton />
    </div>
  );
};
