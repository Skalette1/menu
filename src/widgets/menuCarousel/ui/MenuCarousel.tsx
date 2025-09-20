import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import rouletteCofe1 from "../../../../public/rouletteCofe1.png";
import rouletteCofe2 from "../../../../public/rouletteCofe2.png";
import rouletteCofe3 from "../../../../public/rouletteCofe3.png";
import cheesCakePng from "../../../../public/cheesecake-recipe.jpg";
import tiramisuPng from "../../../../public/tiramisu.jpg";
import rizottoPomidor from "../../../../public/risotto-al-pomodoro-e-basilico-260nw-2570085999.webp";
import rizotto from "../../../../public/rizotto.png";
import saladPng from "../../../../public/salad2.png";
import caesar from "../../../../public/caesar.webp";
import arrowPng from "../../../../public/Arrow 1.png";
import styles from "./MenuCarousel.module.css";
import { useDispatch } from "react-redux";
import { addItem, removeItem, setCount } from "../../../shared/model/cartSlice";
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

const products: Record<
  CategoryLabel,
  { id: string; name: string; img: string; price: number }[]
> = {
  Напитки: [
    { id: "d1", name: "Эспрессо", img: rouletteCofe2, price: 200 },
    { id: "d2", name: "Американо", img: rouletteCofe3, price: 220 },
    { id: "d3", name: "Капучино", img: rouletteCofe2, price: 250 },
    { id: "d4", name: "Латте", img: rouletteCofe1, price: 270 },
  ],
  Десерты: [
    { id: "ds1", name: "Чизкейк", img: cheesCakePng, price: 300 },
    { id: "ds2", name: "Тирамису", img: tiramisuPng, price: 320 },
    { id: "ds3", name: "Эклер", img: tiramisuPng, price: 180 },
    { id: "ds4", name: "Павлова", img: cheesCakePng, price: 350 },
  ],
  Горячее: [
    { id: "h1", name: "Ризотто с грибами", img: rizottoPomidor, price: 700 },
    { id: "h2", name: "Паста Карбонара", img: rizotto, price: 650 },
    { id: "h3", name: "Стейк", img: rizottoPomidor, price: 1200 },
    { id: "h4", name: "Курица терияки", img: rizotto, price: 800 },
  ],
  Салаты: [
    { id: "s1", name: "Греческий салат", img: saladPng, price: 350 },
    { id: "s2", name: "Цезарь", img: caesar, price: 400 },
    { id: "s3", name: "Оливье", img: caesar, price: 320 },
    { id: "s4", name: "Витаминный", img: saladPng, price: 300 },
  ],
};

export const MenuCarousel: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialCategory = React.useMemo(() => {
    const path = location.pathname || "/";
    const found = categories.find((c) => labelToPath[c] === path);
    return found ?? categories[0];
  }, [location.pathname]);

  const [category, setCategory] = useState<CategoryLabel>(
    initialCategory as CategoryLabel,
  );
  const [current, setCurrent] = useState(0);
  const [counts, setCounts] = useState<{ [id: string]: number }>({});
  const dispatch = useDispatch();
  // keep carousel category in sync when route changes (e.g. user navigates directly)
  React.useEffect(() => {
    const path = location.pathname || "/";
    const found = categories.find((c) => labelToPath[c] === path) as
      | CategoryLabel
      | undefined;
    setCategory(found ?? categories[0]);
    setCurrent(0);
  }, [location.pathname]);
  const items = products[category as CategoryLabel];
  const slides = [] as (typeof items)[];
  for (let i = 0; i < items.length; i += 2) {
    slides.push(items.slice(i, i + 2));
  }

  return (
    <div className={styles.container}>
      <div className="" style={{ opacity: "0" }}>
        f<br />
      </div>
      {/* <div className={styles.header}>Часто заказывают</div> */}
      <div className={styles.carouselWrapper}>
        <button
          className={styles.arrowBtn}
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
        >
          <img
            src={arrowPng}
            className={styles.arrowImg}
            alt="next"
            style={{ transform: "rotate(90deg)" }}
          />
        </button>
        <div className={styles.slide}>
          {(slides[current] ?? []).map((item) => (
            <div
              key={item.id}
              className={styles.card}
              onClick={() => navigate(`/dish/${item.id}`)}
            >
              <img src={item.img} alt={item.name} className={styles.img} />
              <div className={styles.name}>{item.name}</div>
              <div className={styles.price}>{item.price}₽</div>
              {counts[item.id] && counts[item.id] > 0 ? (
                <div className={styles.counterWrapper}>
                  <button
                    className={styles.counterBtn}
                    onClick={(e) => {
                      e.stopPropagation();

                      setCounts((c) => {
                        const newCount = (c[item.id] || 1) - 1;
                        if (newCount <= 0) {
                          const copy = { ...c };
                          delete copy[item.id];
                          // remove from redux cart as well
                          dispatch(removeItem(item.id));
                          return copy;
                        }
                        dispatch(setCount({ id: item.id, count: newCount }));
                        return { ...c, [item.id]: newCount };
                      });
                    }}
                  >
                    -
                  </button>
                  <span className={styles.counter}>{counts[item.id]}</span>
                  <button
                    className={styles.counterBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCounts((c) => ({
                        ...c,
                        [item.id]: (c[item.id] || 0) + 1,
                      }));
                      // add one to redux cart (addItem increments if exists)
                      dispatch(
                        addItem({
                          item: {
                            id: item.id,
                            name: item.name,
                            img: item.img,
                            price: item.price,
                          },
                          count: 1,
                        }),
                      );
                    }}
                  >
                    +
                  </button>
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setCounts((c) => ({ ...c, [item.id]: 1 }));
                    dispatch(
                      addItem({
                        item: {
                          id: item.id,
                          name: item.name,
                          img: item.img,
                          price: item.price,
                        },
                        count: 1,
                      }),
                    );
                  }}
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
          <img
            src={arrowPng}
            alt="next"
            style={{ transform: "rotate(270deg)" }}
          />
        </button>
      </div>
      <div className={styles.filters}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={
              cat === category ? styles.activeFilter : styles.filterBtn
            }
            onClick={() => {
              // navigate to corresponding route so MenuPage receives new category prop
              const path = labelToPath[cat] ?? "/";
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
      <ScrollToTopButton />
    </div>
  );
};
