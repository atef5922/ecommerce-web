import type { BlogPageModel } from "./ecommerce";

export const blogPageModel: BlogPageModel = {
  navigation: [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Blog", href: "/blog" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Features", href: "/shop" },
  ],
  posts: [
    {
      id: "b1",
      title: "Blog Image Post",
      format: "image",
      category: "Fashion",
      author: "Mugnee",
      date: "March 3, 2026",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=960&q=80",
      excerpt:
        "Donec vitae hendrerit arcu, sit amet faucibus nisl. Cras pretium arcu ex, a posuere ipsum porttitor in. Curabitur vitae justo non magna imperdiet tincidunt.",
    },
    {
      id: "b2",
      title: "Post With Gallery",
      format: "gallery",
      category: "Latest Style",
      author: "Mugnee",
      date: "March 4, 2026",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=960&q=80",
      excerpt:
        "Fusce vitae nibh at diam placerat semper. Integer euismod nisl vel dui facilisis, vel suscipit augue bibendum.",
    },
    {
      id: "b3",
      title: "Post With Video",
      format: "video",
      category: "Videos",
      author: "Mugnee",
      date: "March 6, 2026",
      excerpt:
        "Curabitur posuere mauris non arcu tincidunt, sit amet lacinia eros tristique. Praesent dictum magna sed sem posuere.",
    },
    {
      id: "b4",
      title: "Post With Audio",
      format: "audio",
      category: "Audio Format",
      author: "Mugnee",
      date: "March 10, 2026",
      excerpt:
        "Integer pharetra lectus eros, non vestibulum nibh dignissim sed. Suspendisse potenti donec sit amet justo.",
    },
    {
      id: "b5",
      title: "Blog Image Post",
      format: "image",
      category: "Mugnee Journal",
      author: "Mugnee",
      date: "March 18, 2026",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=960&q=80",
      excerpt:
        "Praesent placerat semper turpis, eu volutpat dolor malesuada at. Nam dignissim orci non sem luctus.",
    },
  ],
  archives: [
    { label: "March 2026", count: 5 },
    { label: "February 2026", count: 4 },
    { label: "December 2025", count: 8 },
    { label: "September 2025", count: 3 },
    { label: "August 2025", count: 6 },
  ],
  recentPosts: [
    { label: "Blog image post", count: 1 },
    { label: "Post with gallery", count: 1 },
    { label: "Post with video", count: 1 },
    { label: "Post with audio", count: 1 },
    { label: "Latest beauty news", count: 1 },
  ],
  productTags: [
    { label: "Beauty", href: "#" },
    { label: "Body", href: "#" },
    { label: "Skin", href: "#" },
    { label: "Cream", href: "#" },
    { label: "Care", href: "#" },
    { label: "Organic", href: "#" },
    { label: "Makeup", href: "#" },
    { label: "Serum", href: "#" },
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
