// helper functions to fetch content from Directus
// Uses relative paths (/items, /assets) so it works with vite proxy in dev

type DirectusResponse<T = any> = { data: T; meta?: any };

async function requestJSON<T = any>(path: string, token?: string) {
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(path, { headers, credentials: token ? 'omit' : 'same-origin' });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const json = (await res.json()) as DirectusResponse<T>;
  return json.data;
}

// Fetch all cards (optionally filtered/sorted)
export async function fetchCards(params = '') {
  // params example: '?filter[featured][_eq]=1&limit=6&sort=-date_created'
  return await requestJSON<any[]>(`/items/cards${params}`);
}

// Fetch carousel items from a dedicated collection 'carousel' or from 'cards' with a flag
export async function fetchCarousel() {
  // Try to fetch from /items/carousel first (recommended)
  try {
    // request expanded card relation (card.*) so frontend receives full card object
    return await requestJSON<any[]>(`/items/carousel?limit=-1&sort=sort&fields=*,card.*`);
  } catch (err) {
    // fallback: return cards with `in_carousel` flag
    return await requestJSON<any[]>(`/items/cards?filter[in_carousel][_eq]=1&limit=-1&sort=sort&fields=*`);
  }
}

// Fetch featured / frequently ordered items
export async function fetchFeatured(limit = 4) {
  // Prefer a dedicated collection 'featured' that holds relations to cards
  try {
    // Example: featured collection items have fields: id, card (relation to cards), sort
    const featured = await requestJSON<any[]>(`/items/featured?limit=${limit}&sort=sort`);
    // If featured exists and references cards -> expand relation
    // But to keep it simple, try to resolve relation ids to card objects
    if (featured && featured.length && featured[0].card) {
      const ids = featured.map((f) => f.card).join(',');
      const cards = await requestJSON<any[]>(`/items/cards?filter[id][_in]=${ids}`);
      // return cards in the same order as featured
      const cardMap = new Map(cards.map((c: any) => [String(c.id), c]));
      return featured.map((f) => cardMap.get(String(f.card))).filter(Boolean);
    }
  } catch (err) {
    // ignore and fallback
  }

  // fallback: use cards with featured flag
  return await requestJSON<any[]>(`/items/cards?filter[featured][_eq]=1&limit=${limit}`);
}

export default { fetchCards, fetchCarousel, fetchFeatured };
