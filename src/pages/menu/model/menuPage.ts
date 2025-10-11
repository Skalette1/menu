export interface Product {
  id: string;
  name: string;
  category: "drinks" | "desserts" | "hot" | "salads";
  price: number;
  description?: string;
  slug?: string;
  featured_image?: string;
}

/**
 * Fallback empty PRODUCTS constant kept for backward compatibility.
 * Prefer using `fetchProducts()` to load from Directus.
 */
export const PRODUCTS: Product[] = [];

type DirectusResponse = {
  data: Array<Record<string, any>>;
};

function parseCategory(item: Record<string, any>): Product['category'] {
  // prioritize explicit fields if present
  const allowed = ["drinks", "desserts", "hot", "salads"] as const;
  const maybe = (item?.category ?? item?.type ?? item?.section ?? item?.group) as any;
  if (maybe) {
    const m = String(maybe).toLowerCase();
    if (allowed.includes(m as any)) return m as Product['category'];
  }

  const title = String(item?.title || '').toLowerCase();
  const slug = String(item?.slug || '').toLowerCase();
  const body = String(item?.body || '').toLowerCase();
  const text = `${title} ${slug} ${body}`;

  // explicit slug-based mapping (most reliable)
  const slugDesserts = ['cheesecake', 'shokoladniy-tort', 'morozhenoe', 'pirozhnoe', 'cheesecake', 'tort'];
  const slugDrinks = ['espresso', 'kapuchino', 'latte', 'mokko', 'americano', 'coffe', 'coffee', 'kapuchino'];
  const slugSalads = ['caesar', 'salad', 'salat', 'salat-s-tuncem', 'salat-s-tuncom'];
  const slugHot = ['pasta', 'rizotto', 'risotto', 'hot', 'bifstroganov', 'kurica'];

  if (slug && slugDesserts.some((s) => slug.includes(s))) return 'desserts';
  if (slug && slugDrinks.some((s) => slug.includes(s))) return 'drinks';
  if (slug && slugSalads.some((s) => slug.includes(s))) return 'salads';
  if (slug && slugHot.some((s) => slug.includes(s))) return 'hot';

  const dessertsKeywords = ['dessert', 'cake', 'cheesecake', 'tort', 'шоколад', 'чизкейк', 'пирожн', 'морожен', 'мороженое', 'десерт', 'торт', 'пирожное'];
  const saladsKeywords = ['salad', 'salat', 'caesar', 'цезарь', 'салат', 'тунец', 'овощ', 'овощной'];
  const hotKeywords = ['pasta', 'risotto', 'rizotto', 'паста', 'ризотто', 'горяч', 'блюд', 'курица'];
  const drinksKeywords = ['coffee', 'espresso', 'latte', 'cappu', 'капуч', 'латте', 'эспрессо', 'мокко', 'americano', 'кофе', 'капучино'];

  for (const k of dessertsKeywords) if (text.includes(k)) return 'desserts';
  for (const k of saladsKeywords) if (text.includes(k)) return 'salads';
  for (const k of hotKeywords) if (text.includes(k)) return 'hot';
  for (const k of drinksKeywords) if (text.includes(k)) return 'drinks';

  // Less aggressive fallback: classify as 'hot' if price large, otherwise 'drinks'
  const price = Number(item?.price ?? 0);
  if (price && price >= 600) return 'hot';

  return 'drinks';
}

/**
 * Load products from a Directus instance.
 * Default base URL is http://localhost:8055.
 * Returns an array of Product mapped from directus `items/cards`.
 */
export async function fetchProducts(baseUrl = ''): Promise<Product[]> {
  const url = baseUrl ? `${baseUrl.replace(/\/$/, '')}/items/cards` : `/items/cards`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) {
    throw new Error(`Failed to fetch products from ${url}: ${res.status} ${res.statusText}`);
  }
  const json = (await res.json()) as DirectusResponse;
  const items = Array.isArray(json?.data) ? json.data : [];
  return items.map((item) => {
    const price = item.price != null ? Number(item.price) : 0;
    return {
      id: String(item.id ?? item._id ?? ""),
      name: item.title || item.name || item.slug || "",
      category: parseCategory(item),
      price: Number.isFinite(price) ? price : 0,
      description: item.body || item.description || undefined,
      slug: item.slug || undefined,
      featured_image: item.featured_image || undefined,
    } as Product;
  });
}
