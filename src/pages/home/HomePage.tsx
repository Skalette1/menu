import Carousel from "../../widgets/carousel/ui/Carousel";
import { Menu } from "../../widgets/menu/ui/Menu";
import hamziPng from "../../../public/8241813c95e331dc8a04bbefb3ff72c9 1@2x.png";
import cheesCakePng from "../../../public/cheescake.jpg";
import saladPng from "../../../public/caesar.webp";
import { Roulette } from "../../widgets/roulette/ui/Roulette";

export const HomePage = () => {
  const images = [
    { src: hamziPng, header: "HAMZI", text: "Давай создадим что-то великое вместе" },
    { src: cheesCakePng, header: "HAMZI", text: "Давай создадим что-то великое вместе" },
    { src: saladPng, header: "HAMZI", text: "Давай создадим что-то великое вместе" },
  ];

  return (
    <main>
      <div className="p-6">
        <Carousel images={images} />
      </div>
      <Menu />
      <Roulette />
    </main>
  );
};
