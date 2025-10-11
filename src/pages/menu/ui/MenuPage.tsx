import React from "react";
import { PRODUCTS, fetchProducts } from "../model/menuPage";
import styles from "./MenuPage.module.css";
import ProgressiveImage from "../../../shared/ui/ProgressiveImage";
import { useDispatch } from "react-redux";
import { addItem, removeItem, setCount } from "../../../shared/model/cartSlice";
import { GoToCartButton } from "../../../shared/ui/goToCartButton/GoToCartButton";
import ScrollToTopButton from "../../../shared/ui/scroll-to-top/ScrollToTopButton";
import { useSelector } from "react-redux";
import type { RootState } from "../../../shared/model/store";
import rouletteCofe1 from "../../../../public/rouletteCofe1.png";
import rouletteCofe2 from "../../../../public/rouletteCofe2.png";
import rouletteCofe3 from "../../../../public/rouletteCofe3.png";
import cappucino from "../../../../public/cappucino.jpg";
import cheesCakePng from "../../../../public/cheesecake-recipe.jpg";
import tiramisuPng from "../../../../public/tiramisu.jpg";
import rizottoPomidor from "../../../../public/risotto-al-pomodoro-e-basilico-260nw-2570085999.webp";
import rizotto from "../../../../public/rizotto.png";
import saladPng from "../../../../public/salad2.png";
import caesar from "../../../../public/caesar.webp";
import { MenuHeader } from "../../../widgets/menuHeader/ui/MenuHeader";
import { MenuCarousel } from "../../../widgets/menuCarousel/ui/MenuCarousel";
import { ScrollToTopPage } from "../../../shared/ui/scrollTopPage/ScrollTopPage";
import { useLocation, useNavigate } from "react-router-dom";

const IMAGES: Record<string, string> = {
  d1: rouletteCofe2,
  d2: rouletteCofe3,
  d3: cappucino,
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

// Компонент для кнопок (общий для всех карточек)
const MenuCardControls: React.FC<{
  item: any;
  counts: { [id: string]: number };
  setCounts: React.Dispatch<React.SetStateAction<{ [id: string]: number }>>;
  dispatch: any;
  getImageFor: (item: any) => string;
}> = ({ item, counts, setCounts, dispatch, getImageFor }) => {
  const isInCart = counts[item.id] && counts[item.id] > 0;
  const img = getImageFor(item);

  // slot preserves layout; inside it we switch between + and counter
  if (!isInCart) {
    return (
      <div className={styles.controlSlot}>
        <button
          className={styles.menuAddBtn}
          onClick={(e) => {
            e.stopPropagation();
            setCounts((c) => ({ ...c, [item.id]: 1 }));
            dispatch(
              addItem({ item: { ...item, img, id: item.id }, count: 1 }),
            );
          }}
        >
          <span className={styles.menuPlusIcon}>+</span>
        </button>
      </div>
    );
  }

  return (
    <div className={styles.controlSlot}>
      <div className={styles.menuCounterWrapper}>
        <button
          className={styles.menuCounterBtn}
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
        <span className={styles.menuCounter}>{counts[item.id]}</span>
        <button
          className={styles.menuCounterBtn}
          onClick={(e) => {
            e.stopPropagation();
            setCounts((c) => {
              const newCount = (c[item.id] || 0) + 1;
              dispatch(setCount({ id: item.id, count: newCount }));
              return { ...c, [item.id]: newCount };
            });
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export const MenuPage: React.FC<{
  category?: "drinks" | "desserts" | "hot" | "salads";
}> = ({ category }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [counts, setCounts] = React.useState<{ [id: string]: number }>({});
  const [products, setProducts] = React.useState<typeof PRODUCTS>(PRODUCTS);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // refs for category sections
  const drinksRef = React.useRef<HTMLDivElement | null>(null);
  const dessertsRef = React.useRef<HTMLDivElement | null>(null);
  const hotRef = React.useRef<HTMLDivElement | null>(null);
  const saladsRef = React.useRef<HTMLDivElement | null>(null);

  const scrollToCategory = (cat: string) => {
    const map: Record<string, React.RefObject<HTMLDivElement | null>> = {
      drinks: drinksRef,
      desserts: dessertsRef,
      hot: hotRef,
      salads: saladsRef,
    };
    const ref = map[cat];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // initialize local counts from redux cart so UI shows correct numbers on mount
  React.useEffect(() => {
    const map: { [id: string]: number } = {};
    (cartItems || []).forEach((it: any) => {
      map[String(it.id)] = it.count;
    });
    setCounts(map);
  }, [cartItems]);

  // load products from Directus on mount
  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchProducts()
      .then((res) => {
        if (!cancelled) setProducts(res);
      })
      .catch((e: any) => {
        if (!cancelled) setError(String(e.message || e));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // when mounted, if category prop provided (via route) scroll to that section
  React.useEffect(() => {
    const cat = category;
    if (cat) {
      // small delay to ensure elements rendered
      setTimeout(() => scrollToCategory(cat), 50);
      return;
    }
    // if route path contains category (e.g. /drinks) map it
    const path = location.pathname.replace("/", "");
    if (path && ["drinks", "desserts", "hot", "salads"].includes(path)) {
      setTimeout(() => scrollToCategory(path), 50);
    }
  }, [category, location.pathname]);

  // Функция для рендера карточек (DRY принцип)
  const getImageFor = (item: any) => {
    // Prefer Directus uploaded image via featured_image id (use relative path so dev server proxy can forward it)
    if (item.featured_image) return `/assets/${item.featured_image}`;
    return IMAGES[item.id] || "";
  };

  const renderMenuCards = (category: string) => (
    <div className={styles.menu}>
      {products.filter((p) => p.category === category).map((item) => (
        <div
          key={item.id}
          className={styles.menuCard}
          onClick={() => (window.location.hash = `#/dish/${item.id}`)}
        >
            <div className={styles.menuImgWrapper}>
            <ProgressiveImage src={getImageFor(item)} alt={item.name} />
          </div>

          <div className={styles.menuName}>{item.name}</div>
          <div className={styles.menuPrice}>{item.price}₽</div>
          
          {/* Используем общий компонент для кнопок */}
          <MenuCardControls 
            item={item} 
            counts={counts} 
            setCounts={setCounts} 
            dispatch={dispatch}
            getImageFor={getImageFor}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.container}>
      <ScrollToTopPage />
      <MenuHeader />
      <MenuCarousel />

      <div className={styles.stickyNav}>
        <div className={styles.filters}>
          {[
            { id: "drinks", label: CATEGORY_LABELS.drinks },
            { id: "desserts", label: CATEGORY_LABELS.desserts },
            { id: "hot", label: CATEGORY_LABELS.hot },
            { id: "salads", label: CATEGORY_LABELS.salads },
          ].map((c) => (
            <button
              key={c.id}
              className={c.id === (category ?? "") ? styles.activeFilter : styles.filterBtn}
              onClick={() => {
                navigate(`/${c.id}`);
                setTimeout(() => scrollToCategory(c.id), 60);
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.menuContainer} style={{ maxWidth: 1100, margin: "0 auto", padding: 8 }}>
        <section id="drinks" ref={drinksRef} style={{ marginBottom: 24 }}>
          <h3>{CATEGORY_LABELS.drinks}</h3>
          {loading ? <div>Загрузка...</div> : error ? <div>Ошибка: {error}</div> : renderMenuCards("drinks")}
        </section>

        <section id="desserts" ref={dessertsRef} style={{ marginBottom: 24 }}>
          <h3>{CATEGORY_LABELS.desserts}</h3>
          {loading ? <div>Загрузка...</div> : error ? <div>Ошибка: {error}</div> : renderMenuCards("desserts")}
        </section>

        <section id="hot" ref={hotRef} style={{ marginBottom: 24 }}>
          <h3>{CATEGORY_LABELS.hot}</h3>
          {loading ? <div>Загрузка...</div> : error ? <div>Ошибка: {error}</div> : renderMenuCards("hot")}
        </section>

        <section id="salads" ref={saladsRef} style={{ marginBottom: 24 }}>
          <h3>{CATEGORY_LABELS.salads}</h3>
          {loading ? <div>Загрузка...</div> : error ? <div>Ошибка: {error}</div> : renderMenuCards("salads")}
        </section>
      </div>
      <GoToCartButton />
      <ScrollToTopButton />
    </div>
  );
};