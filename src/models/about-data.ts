import type { AboutPageModel } from "./ecommerce";

export const aboutPageModel: AboutPageModel = {
  navigation: [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Blog", href: "/blog" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Features", href: "/shop" },
  ],
  metrics: [
    { label: "Happy Customers", value: "2169", icon: "customers" },
    { label: "Awards Won", value: "369", icon: "awards" },
    { label: "Hours Worked", value: "689", icon: "hours" },
    { label: "Complete Projects", value: "2169", icon: "projects" },
  ],
  skills: [
    { label: "Commerce UX", percent: 88 },
    { label: "Product Merchandising", percent: 92 },
    { label: "Responsive Frontend", percent: 95 },
    { label: "Brand Systems", percent: 84 },
  ],
  brandMarks: ["PRESTIGES", "BUSINESS", "PRESTIGE", "SHOPNAME", "PHOTOGRAPH", "RETROGE"],
  instagramImages: [
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=180&q=70",
    "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=180&q=70",
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=180&q=70",
    "https://images.unsplash.com/photo-1631730359585-38a4935cbec4?auto=format&fit=crop&w=180&q=70",
    "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=180&q=70",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=180&q=70",
  ],
};
