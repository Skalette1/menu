import React from 'react'
import { Menu } from '../../widgets/menu/ui/Menu'
import { PRODUCTS } from '../../enteties/product/mock'
import type { Category } from '../../enteties/product/types'
import Carousel from '../../widgets/carousel/ui/Carousel'
import hamziPng from "../../../public/8241813c95e331dc8a04bbefb3ff72c9 1@2x.png"
import { Roulette } from '../../widgets/roulette/ui/Roulette';

export const HomePage = () => {
  const categories: Category[] = ["напитки", "десерты", "горячее", "салаты"];

  return (
    <main>
      <div className="p-6">
      <Carousel
        images={[
    { src: hamziPng, text: "Лучшие блюда в Hamzi" },
    { src: hamziPng, text: "Попробуйте наши десерты" },
    { src: hamziPng, text: "Свежие салаты каждый день" },
        ]}
      />
    </div>
    <Menu />
        <Roulette />
    </main>
  )
}
