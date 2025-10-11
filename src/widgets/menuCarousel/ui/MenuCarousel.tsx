import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import arrowPng from "../../../../public/filterArrow..png";
import styles from "./MenuCarousel.module.css";
import { useDispatch } from "react-redux";
import { addItem, removeItem, setCount } from "../../../shared/model/cartSlice";
import ScrollToTopButton from "../../../shared/ui/scroll-to-top/ScrollToTopButton";
import { labelToPath, products as sampleProducts } from "../model/Caroulesl";
import { fetchCarousel } from "../../../shared/api/directus";
import ProgressiveImage from "../../../shared/ui/ProgressiveImage";

export const MenuCarousel: React.FC = () => {
  const navigate = useNavigate();

  // carousel is admin-controlled (shows selected items); no local category filtering
  const [current, setCurrent] = useState(0);
  const [counts, setCounts] = useState<{ [id: string]: number }>({});
  const dispatch = useDispatch();

  // no category effect for carousel

  const [carouselItems, setCarouselItems] = React.useState<any[]>([]);
  // loading state omitted (not used)

  React.useEffect(() => {
    let cancelled = false;
    fetchCarousel()
      .then((list) => {
        if (cancelled) return;
        // list can be either carousel entries (with .card) or plain cards
        const normalized = (list || []).map((row: any) => (row.card ? row.card : row));
        setCarouselItems(normalized);
        console.debug('[MenuCarousel] loaded items:', normalized.length, normalized.slice(0,3));
      })
      .catch((e) => {
        console.error('Failed to load carousel', e);
      })
      .finally(() => {
        // finished
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Determine active category from URL path (e.g. /drinks)
  const location = useLocation();
  const path = String(location.pathname || "").replace(/^\//, "");
  const allowed = ["drinks", "desserts", "hot", "salads"];
  const activeCategory = allowed.includes(path) ? path : null;

  // Build reverse map: e.g. 'drinks' -> 'Напитки' (label in Caroulesl)
  const pathToLabel: Record<string, string> = React.useMemo(() => {
    const map: Record<string, string> = {};
    Object.entries(labelToPath).forEach(([label, p]) => {
      const clean = String(p || "").replace(/^\//, "");
      if (clean) map[clean] = label;
    });
    return map;
  }, []);

  // Normalize item's category values into a list of strings to compare against the route.
  const getItemCategoryKeys = (it: any) => {
    const out: string[] = [];
    if (!it) return out;
    const add = (v: any) => {
      if (v == null) return;
      const s = String(v).trim();
      if (s) out.push(s.toLowerCase());
    };

    // direct string
    if (typeof it.category === 'string') add(it.category);
    // category object from directus might be { id, name }
    if (typeof it.category === 'object' && it.category) {
      add(it.category.id);
      add(it.category.name);
    }
    // array of categories
    if (Array.isArray(it.categories)) {
      it.categories.forEach((c: any) => add(c));
    }
    // sometimes category stored in 'section' or 'type'
    add(it.section);
    add(it.type);
    return out;
  };

  // If a category is active via sticky nav (route), show only carousel items from that category.
  const items = React.useMemo(() => {
    // if carousel hasn't loaded any items yet, use sampleProducts as a harmless demo fallback
    const source = carouselItems && carouselItems.length ? carouselItems : Object.values(sampleProducts).flat();
    if (!activeCategory) return source;
    const label = pathToLabel[activeCategory];
    const filtered = source.filter((it: any) => {
      const keys = getItemCategoryKeys(it);
      // compare against route key (e.g. 'drinks') and Russian label (e.g. 'Напитки')
      return (
        keys.includes(activeCategory.toLowerCase()) ||
        (label && keys.includes(String(label).toLowerCase()))
      );
    });
    // fallback: if there are no matching items for this category, show the unfiltered source
    return filtered.length ? filtered : source;
  }, [activeCategory, carouselItems, pathToLabel]);

  // reset carousel index when the filtered items change
  React.useEffect(() => {
    // clamp current index and reset to 0 to avoid blank slide when filtered down
    setCurrent(0);
  }, [items.length, activeCategory]);
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
              <ProgressiveImage
                className={styles.carouselImg}
                src={item.featured_image ? `/assets/${item.featured_image}` : item.img}
                alt={item.name}
              />
              {(() => {
                const displayName = item?.name || item?.title || (item.card && item.card.name) || item?.name_en || item?.id || '';
                return (
                  <div className={styles.carouselName} title={displayName}>{displayName}</div>
                );
              })()}
              <div className={styles.carouselPrice}>{item.price}₽</div>

              {/* 🔽 Всегда прижимаем кнопку/счётчик вниз */}
              <div className={styles.carouselBottom}>
                {counts[item.id] && counts[item.id] > 0 ? (
                  <div className={styles.carouselCounterWrapper}>
                    <button
                      className={styles.carouselCounterBtn}
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
                    <span className={styles.carouselCounter}>{counts[item.id]}</span>
                    <button
                      className={styles.carouselCounterBtn}
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
                    className={styles.carouselAddBtn}
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
                    <span className={styles.carouselPlusIcon}>+</span>
                  </button>
                )}
              </div>
              {/* 🔼 Конец блока */}
            </div>
          ))}
        </div>

        <button
          className={styles.carouselArrow}
          onClick={() =>
            setCurrent(Math.min(slides.length - 1, current + 1))
          }
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
