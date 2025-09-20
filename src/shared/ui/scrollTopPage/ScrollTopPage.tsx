import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTopPage = () => {
  const location = useLocation();

  // Скроллим вверх только при МОНТИРОВАНИИ подстраницы.
  // Не реагируем на дальнейшие изменения location, чтобы при возврате на главную
  // не сбрасывать позицию, которую восстановит главная страница.
  useEffect(() => {
    if (location.pathname !== "/") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    // пустые зависимости — сработает один раз при входе на подстраницу
  }, []);

  return null;
};