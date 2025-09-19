import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import rouletteCofe1 from '../../../../public/rouletteCofe1.png'
import rouletteCofe2 from '../../../../public/rouletteCofe2.png'
import rouletteCofe3 from '../../../../public/rouletteCofe3.png'
import cheesCakePng from '../../../../public/cheesecake-recipe.jpg'
import tiramisuPng from '../../../../public/tiramisu.jpg'
import rizottoPomidor from '../../../../public/risotto-al-pomodoro-e-basilico-260nw-2570085999.webp'
import rizotto from '../../../../public/rizotto.png'
import saladPng from '../../../../public/salad2.png'
import caesar from '../../../../public/caesar.webp'
import arrowPng from '../../../../public/Arrow 1.png'
import styles from "./MenuCarousel.module.css";
// removed unused redux imports - carousel manages its own local counts
import ScrollToTopButton from "../../../shared/ui/scroll-to-top/ScrollToTopButton";
import { GoToCartButton } from "../../../shared/ui/goToCartButton/GoToCartButton";

type CategoryLabel = "Напитки" | "Десерты" | "Горячее" | "Салаты";

const categories: CategoryLabel[] = ["Напитки", "Десерты", "Горячее", "Салаты"];

const labelToPath: Record<string, string> = {
  Напитки: "/drinks",
  Десерты: "/desserts",
  Горячее: "/hot",
  Салаты: "/salads",
};


const products: Record<CategoryLabel, { id: number; name: string; img: string; price: number }[]> = {
  Напитки: [
    { id: 1, name: "Эспрессо", img: rouletteCofe2, price: 200 },
    { id: 2, name: "Американо", img: rouletteCofe3, price: 220 },
    { id: 3, name: "Капучино", img: rouletteCofe2, price: 250 },
    { id: 4, name: "Латте", img: rouletteCofe1, price: 270 },
  ],
  Десерты: [
    { id: 5, name: "Чизкейк", img: cheesCakePng, price: 300 },
    { id: 6, name: "Тирамису", img: tiramisuPng, price: 320 },
    { id: 7, name: "Эклер", img: tiramisuPng, price: 180 },
    { id: 8, name: "Павлова", img: cheesCakePng, price: 350 },
  ],
  Горячее: [
    { id: 9, name: "Ризотто с грибами", img: rizottoPomidor, price: 700 },
    { id: 10, name: "Паста Карбонара", img: rizotto, price: 650 },
    { id: 11, name: "Стейк", img: rizottoPomidor, price: 1200 },
    { id: 12, name: "Курица терияки", img: rizotto, price: 800 },
  ],
  Салаты: [
    { id: 13, name: "Греческий салат", img: saladPng, price: 350 },
    { id: 14, name: "Цезарь", img: caesar, price: 400 },
    { id: 15, name: "Оливье", img: caesar, price: 320 },
    { id: 16, name: "Витаминный", img: saladPng, price: 300 },
  ],
};

export const MenuCarousel: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialCategory = React.useMemo(() => {
    const path = location.pathname || '/';
    const found = categories.find((c) => labelToPath[c] === path);
    return found ?? categories[0];
  }, [location.pathname]);

  const [category, setCategory] = useState<CategoryLabel>(initialCategory as CategoryLabel);
  const [current, setCurrent] = useState(0);
  const [counts, setCounts] = useState<{[id:number]:number}>({});
  // keep carousel category in sync when route changes (e.g. user navigates directly)
  React.useEffect(() => {
    const path = location.pathname || '/';
    const found = categories.find((c) => labelToPath[c] === path) as CategoryLabel | undefined;
    setCategory(found ?? categories[0]);
    setCurrent(0);
  }, [location.pathname]);
  const items = products[category as CategoryLabel];
  const slides = [] as typeof items[];
  for (let i = 0; i < items.length; i += 2) {
    slides.push(items.slice(i, i + 2));
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>Часто заказывают</div>
      <div className={styles.carouselWrapper}>
        <button
          className={styles.arrowBtn}
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
        >
         <img src={arrowPng} 
          alt="next" 
          style={{transform: 'rotate(90deg)'}}/>
        </button>
        <div className={styles.slide}>
          {(slides[current] ?? []).map((item) => (
            <div key={item.id} className={styles.card}>
              <img src={item.img} alt={item.name} className={styles.img} />
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
                          return copy;
                        }
                        return { ...c, [item.id]: newCount };
                      });
                    }}
                  >-</button>
                  <span className={styles.counter}>{counts[item.id]}</span>
                  <button
                    className={styles.counterBtn}
                    onClick={() => setCounts(c => ({...c, [item.id]: c[item.id]+1}))}
                  >+</button>
                  <button
                    className={`${styles.addBtn} ${styles.hide}`}
                    tabIndex={-1}
                  >
                    <span className={styles.plusIcon}>+</span>
                  </button>
                </div>
              ) : (
                <button
                  className={styles.addBtn}
                  onClick={() => setCounts(c => ({...c, [item.id]: 1}))}
                >
                  <span className={styles.plusIcon}>+</span>
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          className={styles.arrowBtn}
          onClick={() => setCurrent(Math.min(slides.length - 1, current + 1))}
          disabled={current === slides.length - 1}
        >
          <img src={arrowPng} 
          alt="next" 
          style={{transform: 'rotate(270deg)'}}/>
        </button>
      </div>
      <div className={styles.filters}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={cat === category ? styles.activeFilter : styles.filterBtn}
            onClick={() => {
              // navigate to corresponding route so MenuPage receives new category prop
              const path = labelToPath[cat] ?? '/';
              navigate(path);
              // keep local carousel state in sync until route update
              setCategory(cat);
              setCurrent(0);
            }}
          >
            {cat}
          </button>
        ))}
      </div>
      <GoToCartButton />
      <ScrollToTopButton />
    </div>
  );
};
