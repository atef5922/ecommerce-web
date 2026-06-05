export type SearchItem = {
  description: string;
  title: string;
  href: string;
  type: "Product" | "Article" | "Category" | "Brand";
  keywords: string;
};

export const searchableItems: SearchItem[] = [
  {
    title: "Hydra Dew Skin Essence",
    href: "/shop",
    type: "Product",
    description: "Serum essence by Mugnee Ritual",
    keywords: "serum essence toner hydra dew mugnee ritual skincare glow",
  },
  {
    title: "Renewal Peptide Cream",
    href: "/shop",
    type: "Product",
    description: "Peptide moisturizer by Aurelia Lab",
    keywords: "cream peptide renewal aurelia skincare moisturizer",
  },
  {
    title: "Soft Veil Hand Balm",
    href: "/shop",
    type: "Product",
    description: "Daily hand care by Flora Care",
    keywords: "hand balm soft veil flora care lotion",
  },
  {
    title: "Blue Clay Rescue Mask",
    href: "/shop",
    type: "Product",
    description: "Clay mask by Mugnee Pure",
    keywords: "mask clay blue rescue mugnee pure skincare",
  },
  {
    title: "Gold Ritual Serum",
    href: "/shop",
    type: "Product",
    description: "Premium serum by Mugnee Ritual",
    keywords: "gold ritual serum skincare luxury mugnee",
  },
  {
    title: "Mountain Soft Body Cream",
    href: "/shop",
    type: "Product",
    description: "Body cream from Graphic Corner",
    keywords: "mountain soft body cream graphic corner",
  },
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
