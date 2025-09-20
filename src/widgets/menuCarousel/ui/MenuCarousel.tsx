import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import arrowPng from "../../../../public/filterArrow..png";
import styles from "./MenuCarousel.module.css";
import { useDispatch } from "react-redux";
import { addItem, removeItem, setCount } from "../../../shared/model/cartSlice";
import ScrollToTopButton from "../../../shared/ui/scroll-to-top/ScrollToTopButton";
import { products, categories, labelToPath } from "../model/Caroulesl";

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

      <div className={styles.carousel}>
        <button
          className={styles.carouselArrow}
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
        >
          <img
            src={arrowPng}
            className={styles.carouselArrowImg}
            alt="prev"
            style={{ transform: "rotate(180deg)" }}
          />
        </button>

        <div className={styles.track}>
          {(slides[current] ?? []).map((item) => (
            <div
              key={item.id}
              className={styles.carouselCard}
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
          className={styles.carouselArrow}
          onClick={() => setCurrent(Math.min(slides.length - 1, current + 1))}
          disabled={current === slides.length - 1}
        >
          <img
            src={arrowPng}
            className={styles.carouselArrowImg}
            alt="next"
          />
        </button>
      </div>

      <ScrollToTopButton />
    </div>
  );
};
