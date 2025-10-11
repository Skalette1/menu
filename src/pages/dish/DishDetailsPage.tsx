import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { PRODUCTS, fetchProducts } from "../menu/model/menuPage";
import styles from "./DishDetailsPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem, setCount, removeItem } from "../../shared/model/cartSlice";
import type { RootState } from "../../shared/model/store";
import rouletteCofe1 from "../../../public/rouletteCofe1.png";
import rouletteCofe2 from "../../../public/rouletteCofe2.png";
import rouletteCofe3 from "../../../public/rouletteCofe3.png";
import cheesCakePng from "../../../public/cheesecake-recipe.jpg";
import tiramisuPng from "../../../public/tiramisu.jpg";
import rizottoPomidor from "../../../public/risotto-al-pomodoro-e-basilico-260nw-2570085999.webp";
import rizotto from "../../../public/rizotto.png";
import saladPng from "../../../public/salad2.png";
import caesar from "../../../public/caesar.webp";
import backArrowPng from "../../../public/Arrow 2.png";
import ProgressiveImage from "../../shared/ui/ProgressiveImage";
import { ScrollToTopPage } from "../../shared/ui/scrollTopPage/ScrollTopPage";

export const DishDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((s: RootState) => s.cart.items);

  const [product, setProduct] = React.useState<any | null>(PRODUCTS.find((p) => p.id === id) || null);
  const [productsList, setProductsList] = React.useState<any[]>(PRODUCTS || []);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // if we already have both product and productsList from fallback, skip
    if ((product && productsList.length > 0) || !id) return;
    setLoading(true);
    fetchProducts()
      .then((list) => {
        setProductsList(list || []);
        const found = list.find((p) => String(p.id) === String(id));
        setProduct(found || null);
      })
      .catch((e) => setError(String(e.message || e)))
      .finally(() => setLoading(false));
  }, [id, product, productsList.length]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!product) return <div>Товар не найден</div>;

  const currentCount =
    (cartItems.find((i: any) => String(i.id) === String(id)) || { count: 0 })
      .count || 0;

  const defaultDescription = `Состав: рис карнороли, грибы белые, масло оливковое, овощной бульон, чеснок, масло сливочное, сыр дор блю, сыр грана падано, соль, перец, петрушка, базилик, трюфельный крем, тимьян.`;
  const description = product.description || defaultDescription;

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

  const img = product.featured_image ? `/assets/${product.featured_image}` : (IMAGES[product.id] || "");

  return (
    <div className={styles.page}>
      <ScrollToTopPage />
      <Link to="/drinks">
      <button className={styles.back}>
        <img src={
          backArrowPng
        } alt="backArrowPng"
        className={styles.backArrowImg}
         />
      </button>
      </Link>
      {img && <img src={img} alt={product.name} className={styles.img} />}
      <div className={styles.infoCard}>
        <h1 className={styles.title}>{product.name}</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.row}>
          <div className={styles.priceBlock}>
            <div className={styles.price}>{product.price}₽</div>
          </div>
          <div className={styles.counterBlock}>
            <button
              className={styles.counterBtn}
              onClick={() => {
                // decrement
                if (currentCount <= 1) {
                  // remove from cart
                  removeItem && dispatch(removeItem(product.id));
                } else {
                  dispatch(
                    setCount({ id: product.id, count: currentCount - 1 }),
                  );
                }
              }}
            >
              -
            </button>
            <span className={styles.counterValue}>{currentCount}</span>
            <button
              className={styles.counterBtn}
              onClick={() => {
                // increment
                if (currentCount === 0) {
                  dispatch(
                    addItem({
                      item: {
                        id: product.id,
                        name: product.name,
                        img,
                        price: product.price,
                      },
                      count: 1,
                    }),
                  );
                } else {
                  dispatch(
                    setCount({ id: product.id, count: currentCount + 1 }),
                  );
                }
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className={styles.recommendedSection}>
        <h3>Покупают <span style={{color: '#AE9E7E'}}>вместе</span></h3>
        <div className={styles.recommendedList}>
          {productsList
            .filter((p) => p.category === product.category && String(p.id) !== String(product.id))
            .slice(0, 3)
            .map((p) => {
              const recImg = p.featured_image ? `http://localhost:8055/assets/${p.featured_image}` : (IMAGES[p.id] || "");
              return (
                <div
                  key={p.id}
                  className={styles.recCard}
                  onClick={() => navigate(`/dish/${p.id}`)}
                >
                  <ProgressiveImage
                    src={recImg}
                    alt={p.name}
                    className={styles.recImg}
                  />
                  <div className={styles.recCardBottom}>
                    <div className={styles.recName}>{p.name}</div>
                    <div className={styles.recFooter}>
                      <div className={styles.recPrice}>{p.price}₽</div>
                      <button
                        className={styles.recAdd}
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(
                            addItem({
                              item: {
                                id: p.id,
                                name: p.name,
                                img: recImg,
                                price: p.price,
                              },
                              count: 1,
                            }),
                          );
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default DishDetailsPage;
