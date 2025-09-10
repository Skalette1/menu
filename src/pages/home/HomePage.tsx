import React from 'react'
import { Header } from '../../widgets/header/ui/Header'
import { Menu } from '../../widgets/menu/ui/Menu'
import { RandomWheel } from '../../widgets/random-wheel/ui/RandomWheel'
import { PRODUCTS } from '../../enteties/product/mock'
import type { Category } from '../../enteties/product/types'
import { Footer } from '../../widgets/footer/ui/Footer'

export const HomePage = () => {
  const categories: Category[] = ["drinks", "desserts", "hot", "salads"];

  return (
    <main>
      <Header />
      <Menu />
      <RandomWheel products={PRODUCTS} categories={categories} />
      <Footer />
    </main>
  )
}
