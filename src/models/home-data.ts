import type { HomePageModel } from "./ecommerce";

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
    { title: "Free Shipping", detail: "On orders over $59", icon: "truck" },
    { title: "Secure Payment", detail: "Protected checkout", icon: "shield" },
    { title: "Easy Returns", detail: "14 day return window", icon: "refresh" },
    { title: "Support Ready", detail: "Care experts online", icon: "headphones" },
  ],
  categories: [
    {
      name: "Women",
      description: "Body care, bath essentials, and fragrance sets.",
      image:
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=520&q=80",
    },
    {
      name: "Men",
      description: "Grooming staples, wash, serum, and daily skincare.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=520&q=80",
    },
    {
      name: "Health & Beauty",
      description: "Targeted formulas for bright, calm, healthy skin.",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=520&q=80",
    },
  ],
  products: [
    {
      id: "p1",
      name: "Hydra Dew Skin Essence",
      brand: "Mugnee Ritual",
      price: 21.99,
      compareAt: 31.99,
      rating: 5,
      badge: "-31%",
      image:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=520&q=80",
    },
    {
      id: "p2",
      name: "Renewal Peptide Cream",
      brand: "Aurelia Lab",
      price: 27.5,
      compareAt: 39.0,
      rating: 5,
      badge: "Hot",
      image:
        "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=520&q=80",
    },
    {
      id: "p3",
      name: "Soft Veil Hand Balm",
      brand: "Flora Care",
      price: 14.95,
      compareAt: 18.95,
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=520&q=80",
    },
    {
      id: "p4",
      name: "Blue Clay Rescue Mask",
      brand: "Mugnee Pure",
      price: 19.99,
      compareAt: 29.99,
      rating: 5,
      badge: "New",
      image:
        "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=520&q=80",
    },
    {
      id: "p5",
      name: "Mineral Body Souffle",
      brand: "Cove & Salt",
      price: 24.99,
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=520&q=80",
    },
    {
      id: "p6",
      name: "Sea Glass Toner Mist",
      brand: "Aqua Botanics",
      price: 17.99,
      compareAt: 25.5,
      rating: 5,
      badge: "-29%",
      image:
        "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=520&q=80",
    },
    {
      id: "p7",
      name: "Rice Milk Glow Lotion",
      brand: "Mugnee Daily",
      price: 22.0,
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1631730359585-38a4935cbec4?auto=format&fit=crop&w=520&q=80",
    },
    {
      id: "p8",
      name: "Calendula Calm Cleanser",
      brand: "Herbal Muse",
      price: 16.5,
      compareAt: 21.0,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=520&q=80",
    },
  ],
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
