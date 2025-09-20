import React from "react";
import styles from "./CartPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../shared/model/store";
import { removeItem, setCount } from "../../shared/model/cartSlice";
import trashPng from "../../../public/trash.png";
import { Link } from "react-router-dom";

export const CartPage: React.FC = () => {
  const items = useSelector(
    (state: RootState) =>
      state.cart.items as import("../../shared/model/cartSlice").CartItem[],
  );
  const dispatch = useDispatch();
  const total = items.reduce(
    (sum: number, item: import("../../shared/model/cartSlice").CartItem) =>
      sum + item.price * item.count,
    0,
  );

  return (
    <div className={styles.cartContainer}>
      <div className={styles.tittleContainer}>
        <Link to="/" className={styles.arrowToHome}>
          ←
        </Link>
        <h1 className={styles.title}>Корзина</h1>
      </div>

      <div className={styles.list}>
        {items.length === 0 ? (
          <div className={styles.empty}>Корзина пуста</div>
        ) : (
          items.map((item) => (
            <div key={item.id} className={styles.item}>
              <img src={item.img} alt={item.name} className={styles.img} />
              <div className={styles.info}>
                <div className={styles.name}>{item.name}</div>
                <div className={styles.price}>{item.price}₽</div>
                <div className={styles.calc}>
                  {item.count} * {item.price}₽ = {item.count * item.price}₽
                </div>
                <div className={styles.counter}>
                  <button
                    className={styles.counterBtn}
                    onClick={() =>
                      dispatch(
                        setCount({
                          id: item.id,
                          count: Math.max(1, item.count - 1),
                        }),
                      )
                    }
                  >
                    -
                  </button>
                  <span>{item.count}</span>
                  <button
                    className={styles.counterBtn}
                    onClick={() =>
                      dispatch(setCount({ id: item.id, count: item.count + 1 }))
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className={styles.removeBtn}
                onClick={() => dispatch(removeItem(item.id))}
              >
                <img src={trashPng} alt="trash" className={styles.trashImg}/>
              </button>
            </div>
          ))
        )}
      </div>

      <div className={styles.totalWrapper}>
        <div className={styles.total}>
          <span style={{fontWeight: "900"}}>Итого:</span> {total}₽
        </div>
      </div>
    </div>
  );
};
