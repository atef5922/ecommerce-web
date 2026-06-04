export type SearchItem = {
  title: string;
  href: string;
  type: "Page" | "Product" | "Article";
  keywords: string;
};

export const searchableItems: SearchItem[] = [
  { title: "Home", href: "/", type: "Page", keywords: "home beauty skincare wellness ecommerce" },
  { title: "Shop", href: "/shop", type: "Page", keywords: "shop products catalog filters skincare" },
  { title: "Blog", href: "/blog", type: "Page", keywords: "blog journal articles guides beauty" },
  { title: "About Us", href: "/about", type: "Page", keywords: "about company story team" },
  { title: "Contact", href: "/contact", type: "Page", keywords: "contact support message address email phone" },
  { title: "Cart", href: "/cart", type: "Page", keywords: "cart basket products checkout" },
  { title: "Checkout", href: "/checkout", type: "Page", keywords: "checkout billing order payment" },
  { title: "Hydra Dew Skin Essence", href: "/shop", type: "Product", keywords: "serum essence toner mugnee ritual" },
  { title: "Renewal Peptide Cream", href: "/shop", type: "Product", keywords: "cream peptide aurelia skincare" },
  { title: "Blue Clay Rescue Mask", href: "/shop", type: "Product", keywords: "mask clay mugnee pure" },
  { title: "Gold Ritual Serum", href: "/shop", type: "Product", keywords: "gold ritual serum skincare" },
  { title: "Blog Image Post", href: "/blog", type: "Article", keywords: "fashion image post journal" },
  { title: "Post With Gallery", href: "/blog", type: "Article", keywords: "gallery latest style blog" },
  { title: "Post With Video", href: "/blog", type: "Article", keywords: "video blog beauty" },
];

export function searchSite(query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return searchableItems.slice(0, 5);
  }

  return searchableItems
    .filter((item) => `${item.title} ${item.keywords}`.toLowerCase().includes(normalizedQuery))
    .slice(0, 8);
}
