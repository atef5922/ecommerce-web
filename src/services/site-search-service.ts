import { catalogProducts } from "@/models/product-catalog";

export type SearchItem = {
  description: string;
  title: string;
  href: string;
  type: "Product" | "Article" | "Category" | "Brand";
  keywords: string;
};

const productSearchItems: SearchItem[] = catalogProducts.map((product) => ({
  title: product.name,
  href: `/product/${product.slug ?? product.id}`,
  type: "Product",
  description: `${product.brand} · ${product.category}`,
  keywords: [
    product.name,
    product.brand,
    product.category,
    product.badge,
    product.shortDescription,
    product.color,
    product.size,
  ]
    .filter(Boolean)
    .join(" "),
}));

export const searchableItems: SearchItem[] = [
  ...productSearchItems,
  {
    title: "Women",
    href: "/shop",
    type: "Category",
    description: "Body care, fragrance, and bath essentials",
    keywords: "women body care fragrance bath essentials",
  },
  {
    title: "Men",
    href: "/shop",
    type: "Category",
    description: "Grooming, wash, serum, and skincare",
    keywords: "men grooming wash serum skincare",
  },
  {
    title: "Health & Beauty",
    href: "/shop",
    type: "Category",
    description: "Beauty formulas and wellness care",
    keywords: "health beauty skincare wellness cosmetics",
  },
  {
    title: "Mugnee Ritual",
    href: "/shop",
    type: "Brand",
    description: "Signature skincare and ritual products",
    keywords: "mugnee ritual brand serum essence toner",
  },
  {
    title: "Aurelia Lab",
    href: "/shop",
    type: "Brand",
    description: "Peptide creams and daily care",
    keywords: "aurelia lab brand peptide cream skincare",
  },
  {
    title: "Seven ingredients for soft winter hands",
    href: "/blog",
    type: "Article",
    description: "Beauty care guide from the journal",
    keywords: "winter hands ingredients beauty care journal article",
  },
  {
    title: "The sun routine that keeps glow intact",
    href: "/blog",
    type: "Article",
    description: "Routine guide from the Mugnee journal",
    keywords: "sun routine glow skin article guide",
  },
  {
    title: "Three overnight masks for bright skin",
    href: "/blog",
    type: "Article",
    description: "Skin science article",
    keywords: "overnight masks bright skin article skincare",
  },
];

export function searchSite(query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return searchableItems.filter((item) => item.type === "Product").slice(0, 5);
  }

  return searchableItems
    .filter((item) => `${item.title} ${item.description} ${item.keywords}`.toLowerCase().includes(normalizedQuery))
    .slice(0, 8);
}
