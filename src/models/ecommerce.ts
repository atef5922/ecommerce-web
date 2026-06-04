export type NavItem = {
  label: string;
  href: string;
};

export type CurrencyCode = "USD" | "BDT";

export type CurrencyOption = {
  code: CurrencyCode;
  label: string;
  symbol: string;
  rateFromUsd: number;
};

export type ServicePromise = {
  title: string;
  detail: string;
  icon: "truck" | "shield" | "refresh" | "headphones";
};

export type Category = {
  name: string;
  description: string;
  image: string;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  compareAt?: number;
  rating: number;
  image: string;
  badge?: string;
};

export type CartItem = {
  id: string;
  name: string;
  designer: string;
  price: number;
  image: string;
  quantity: number;
};

export type ShopProduct = Product & {
  category: string;
  designer: string;
  color: "Gold" | "Green" | "White";
  size: "S" | "M" | "L" | "XL";
};

export type FilterOption = {
  label: string;
  count: number;
};

export type ShopPageModel = {
  navigation: NavItem[];
  products: ShopProduct[];
  newProducts: ShopProduct[];
  colorFilters: FilterOption[];
  sizeFilters: FilterOption[];
  brandMarks: string[];
  instagramImages: string[];
};

export type PromoTile = {
  title: string;
  kicker: string;
  image: string;
  href: string;
};

export type BlogPost = {
  title: string;
  category: string;
  date: string;
  image: string;
};

export type BlogEntry = {
  id: string;
  title: string;
  format: "image" | "gallery" | "video" | "audio";
  category: string;
  author: string;
  date: string;
  image?: string;
  excerpt: string;
};

export type BlogArchive = {
  label: string;
  count: number;
};

export type ProductTag = {
  label: string;
  href: string;
};

export type BlogPageModel = {
  navigation: NavItem[];
  posts: BlogEntry[];
  archives: BlogArchive[];
  recentPosts: BlogArchive[];
  productTags: ProductTag[];
  brandMarks: string[];
  instagramImages: string[];
};

export type AboutMetric = {
  label: string;
  value: string;
  icon: "customers" | "awards" | "hours" | "projects";
};

export type SkillMetric = {
  label: string;
  percent: number;
};

export type AboutPageModel = {
  navigation: NavItem[];
  metrics: AboutMetric[];
  skills: SkillMetric[];
  brandMarks: string[];
  instagramImages: string[];
};

export type ContactDetail = {
  label: string;
  value: string;
  icon: "address" | "email" | "phone";
};

export type ContactPageModel = {
  navigation: NavItem[];
  details: ContactDetail[];
  workingHours: string;
  brandMarks: string[];
  instagramImages: string[];
};

export type HomePageModel = {
  navigation: NavItem[];
  services: ServicePromise[];
  categories: Category[];
  products: Product[];
  promoTiles: PromoTile[];
  blogPosts: BlogPost[];
  brandMarks: string[];
};
