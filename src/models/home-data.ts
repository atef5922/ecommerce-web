import type { HomePageModel } from "./ecommerce";
import { catalogProducts } from "./product-catalog";

export const homePageModel: HomePageModel = {
  navigation: [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Brands", href: "/#brands" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Articles", href: "/blog" },
  ],
  services: [
    { title: "Free Shipping", detail: "On orders over $59", icon: "shipping" },
    { title: "Online Order", detail: "Fast checkout flow", icon: "order" },
    { title: "Save Money", detail: "Daily value picks", icon: "savings" },
    { title: "Promotions", detail: "Seasonal offers", icon: "promotions" },
    { title: "Happy Sell", detail: "Trusted commerce", icon: "happy" },
    { title: "24/7 Support", detail: "Care experts online", icon: "support" },
  ],
  categories: [
    {
      name: "Printed Shirts",
      description: "Statement shirts, resort prints, and everyday graphic styles.",
      image:
        "https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&w=520&q=80",
    },
    {
      name: "Skincare",
      description: "Essences, creams, toners, and daily glow formulas.",
      image:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=520&q=80",
    },
    {
      name: "Body Care",
      description: "Balms, lotions, and calm care for hands and body.",
      image:
        "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=520&q=80",
    },
  ],
  products: catalogProducts,
  promoTiles: [
    {
      title: "Silk-Luxe Jelly Body Polish",
      kicker: "Glow care",
      href: "#products",
      image:
        "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=520&q=80",
    },
    {
      title: "Boutique Belle Bliss For Her",
      kicker: "Best gift",
      href: "#products",
      image:
        "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=520&q=80",
    },
    {
      title: "Pink Cream Foundation Market",
      kicker: "Limited drop",
      href: "#products",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=520&q=80",
    },
  ],
  blogPosts: [
    {
      title: "Seven ingredients for soft winter hands",
      category: "Beauty care",
      date: "01 Jun",
      image:
        "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=520&q=80",
    },
    {
      title: "The sun routine that keeps glow intact",
      category: "Routine",
      date: "24 May",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=520&q=80",
    },
    {
      title: "Three overnight masks for bright skin",
      category: "Skin science",
      date: "16 May",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=520&q=80",
    },
  ],
  brandMarks: ["MIRABEL", "PRESTIGE", "DORCHE", "ALABAME", "VERONA", "RETROGE"],
};
