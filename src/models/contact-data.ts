import type { ContactPageModel } from "./ecommerce";

export const contactPageModel: ContactPageModel = {
  navigation: [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Blog", href: "/blog" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Features", href: "/shop" },
  ],
  details: [
    {
      label: "Address",
      value: "No 40 Baria Street 133/2, New York City",
      icon: "address",
    },
    {
      label: "Email",
      value: "info@mugnee.com",
      icon: "email",
    },
    {
      label: "Phone",
      value: "0(1234) 567 890",
      icon: "phone",
    },
  ],
  workingHours: "Monday - Saturday: 08AM - 22PM",
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
