"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  ShoppingBag,
  Shuffle,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type {
  BlogPost,
  Category,
  HomePageModel,
  Product,
  PromoTile,
  ServicePromise,
} from "@/models/ecommerce";
import { useCart } from "@/views/shared/CartContext";
import { useCurrency } from "@/views/shared/CurrencyContext";

type HomePageViewModel = HomePageModel & {
  featuredProducts: Product[];
  dailyDeals: Product[];
};

type Props = {
  viewModel: HomePageViewModel;
};

const heroSlides = [
  {
    accent: "#e85d75",
    accentSoft: "rgba(232, 93, 117, 0.13)",
    background: "linear-gradient(110deg, #fff1f4 0%, #fff7f9 52%, #f9e6ec 100%)",
    badge: "Fresh edit",
    blob: "#f5cbd4",
    description: "A curated drop of fashion, beauty, and lifestyle essentials selected for a polished everyday look.",
    eyebrow: "New Arrival",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1100&q=84",
    imageAlt: "Stylish shopper carrying premium fashion bags",
    metric: "120+ new picks",
    title: "New Arrival Collection",
  },
  {
    accent: "#2377c7",
    accentSoft: "rgba(35, 119, 199, 0.12)",
    background: "linear-gradient(110deg, #effaff 0%, #f7fdff 52%, #e7f6fb 100%)",
    badge: "Save more today",
    blob: "#bcefe8",
    description: "Shop premium skincare, cosmetics, and daily care favorites with limited-time seasonal savings.",
    eyebrow: "Limited Time Only",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1100&q=84",
    imageAlt: "Premium cosmetics and makeup products arranged for sale",
    metric: "Up to 50% off",
    title: "Big Offers 50% Off",
  },
  {
    accent: "#ef5a2f",
    accentSoft: "rgba(239, 90, 47, 0.12)",
    background: "linear-gradient(110deg, #fff7ee 0%, #fffaf5 52%, #f8ead7 100%)",
    badge: "Best value",
    blob: "#f6d68f",
    description: "Grab bestselling skincare and self-care deals before they sell out. Premium quality, better prices.",
    eyebrow: "Hot Deals",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1100&q=84",
    imageAlt: "Organic beauty and skincare bottles on a clean counter",
    metric: "Today only",
    title: "Hot Deals Don't Miss Out!",
  },
];

export function HomePageView({ viewModel }: Props) {
  return (
    <main className="premium-shell min-h-screen text-[#2d2a24]">
      <Hero />
      <ServiceStrip services={viewModel.services} />
      <CategorySection categories={viewModel.categories} />
      <PromoRibbon />
      <ProductSection products={viewModel.products} />
      <NewArrivals products={viewModel.products.filter((product) => product.isNew).slice(0, 4)} />
      <MonthlyBestDeals products={viewModel.products.filter((product) => product.monthlyDeal).slice(0, 3)} />
      <FeatureTiles tiles={viewModel.promoTiles} />
      <WellnessBand />
      <DailyDeals products={viewModel.dailyDeals} />
      <Journal posts={viewModel.blogPosts} />
      <Newsletter />
      <BrandStrip brands={viewModel.brandMarks} />
      <Footer />
    </main>
  );
}


function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = heroSlides[activeSlide];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % heroSlides.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, []);

  function goToPreviousSlide() {
    setActiveSlide((currentSlide) => (currentSlide === 0 ? heroSlides.length - 1 : currentSlide - 1));
  }

  function goToNextSlide() {
    setActiveSlide((currentSlide) => (currentSlide + 1) % heroSlides.length);
  }

  return (
    <section className="relative isolate overflow-hidden bg-white px-3 py-3 sm:px-5 lg:py-6">
      <button
        aria-label="Previous hero"
        className="absolute left-5 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/80 text-[#252a31] shadow-lg backdrop-blur transition hover:-translate-x-0.5 hover:bg-[#252a31] hover:text-white md:grid"
        onClick={goToPreviousSlide}
        type="button"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        aria-label="Next hero"
        className="absolute right-5 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/80 text-[#252a31] shadow-lg backdrop-blur transition hover:translate-x-0.5 hover:bg-[#252a31] hover:text-white md:grid"
        onClick={goToNextSlide}
        type="button"
      >
        <ChevronRight size={20} />
      </button>

      <div
        className="relative mx-auto max-w-[1520px] overflow-hidden rounded-[24px] shadow-[0_20px_55px_rgba(37,42,49,0.09)] transition-colors duration-700 sm:rounded-[34px] md:min-h-[560px] md:shadow-[0_28px_90px_rgba(37,42,49,0.1)]"
        style={{ background: slide.background }}
      >
        {heroSlides.map((heroSlide, index) => {
          const isActive = index === activeSlide;

          return (
            <article
              aria-hidden={!isActive}
              className={`inset-0 grid items-center gap-5 px-4 pb-16 pt-8 transition-all duration-700 ease-out sm:gap-8 sm:px-10 sm:py-14 md:absolute lg:grid-cols-[0.92fr_1.08fr] lg:px-24 ${
                isActive ? "relative translate-x-0 opacity-100 md:absolute" : "pointer-events-none absolute translate-x-8 opacity-0"
              }`}
              key={heroSlide.title}
            >
              <div className="order-2 mx-auto max-w-xl text-center lg:order-1 lg:mx-0 lg:text-left">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 lg:justify-start">
                  <p
                    className="rounded-full px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] sm:px-4 sm:text-[11px] sm:tracking-[0.2em]"
                    style={{ backgroundColor: heroSlide.accentSoft, color: heroSlide.accent }}
                  >
                    {heroSlide.eyebrow}
                  </p>
                  <span className="rounded-full border border-white/70 bg-white/70 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#5f666d] shadow-sm backdrop-blur sm:px-4 sm:text-[11px] sm:tracking-[0.14em]">
                    {heroSlide.badge}
                  </span>
                </div>
                <h1 className="mt-4 text-balance font-sans text-[2.15rem] font-black leading-[1.02] text-[#252a31] sm:text-5xl lg:text-6xl">
                  {heroSlide.title}
                </h1>
                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#5f666d] lg:mx-0">
                  {heroSlide.description}
                </p>
                <div className="mt-6 flex flex-col items-center gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4 lg:justify-start">
                  <a
                    className="inline-flex h-12 items-center justify-center rounded-full bg-[#20242a] px-9 text-[12px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_14px_28px_rgba(32,36,42,0.18)] transition hover:-translate-y-0.5 hover:bg-[#aa9737]"
                    href="#products"
                  >
                    Shop Now
                  </a>
                  <span className="text-sm font-semibold text-[#5f666d]">{heroSlide.metric}</span>
                </div>
              </div>

              <div className="order-1 mx-auto flex w-full max-w-[620px] justify-center lg:order-2">
                <div className="relative h-[245px] w-full max-w-[360px] sm:h-[360px] sm:max-w-[520px] lg:h-[500px] lg:max-w-[640px]">
                  <div
                    className={`absolute bottom-4 left-1/2 h-[80%] w-[82%] -translate-x-1/2 rounded-[44%_56%_48%_52%/54%_44%_56%_46%] opacity-75 blur-0 transition-transform duration-700 ${
                      isActive ? "scale-100" : "scale-95"
                    }`}
                    style={{ backgroundColor: heroSlide.blob }}
                  />
                  <div
                    className={`absolute inset-x-4 bottom-4 top-1 z-10 overflow-hidden rounded-[42%_58%_44%_56%/58%_44%_56%_42%] border-[7px] border-white/55 bg-white shadow-[0_24px_48px_rgba(37,42,49,0.14)] transition duration-700 sm:inset-x-8 sm:top-2 sm:border-[10px] sm:shadow-[0_30px_70px_rgba(37,42,49,0.16)] ${
                      isActive ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-95 opacity-0"
                    }`}
                  >
                    <Image
                      alt={heroSlide.imageAlt}
                      className="h-full w-full object-cover object-center"
                      fill
                      priority={index === 0}
                      sizes="(min-width: 1024px) 560px, 90vw"
                      src={heroSlide.image}
                    />
                  </div>
                  <div className="absolute bottom-6 right-1 z-20 rounded-2xl border border-white/70 bg-white/88 px-3 py-2.5 text-left shadow-[0_14px_30px_rgba(37,42,49,0.12)] backdrop-blur sm:bottom-9 sm:right-10 sm:px-4 sm:py-3">
                    <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-[#8b928c] sm:text-[10px] sm:tracking-[0.18em]">Mugnee Picks</span>
                    <strong className="mt-1 block font-serif text-base text-[#252a31] sm:text-xl">{heroSlide.metric}</strong>
                  </div>
                </div>
              </div>
            </article>
          );
        })}

        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 sm:bottom-7">
          {heroSlides.map((heroSlide, index) => (
            <button
              aria-label={`Go to ${heroSlide.title}`}
              aria-pressed={activeSlide === index}
              className={`h-2.5 rounded-full transition-all ${
                activeSlide === index ? "w-8 bg-[#252a31]" : "w-2.5 bg-[#252a31]/25 hover:bg-[#252a31]/50"
              }`}
              key={heroSlide.title}
              onClick={() => setActiveSlide(index)}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceStrip({ services }: { services: ServicePromise[] }) {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-3 px-3 py-8 sm:gap-4 sm:px-4 sm:py-10 md:grid-cols-3 xl:grid-cols-6">
        {services.map((service, index) => (
          <article
            key={service.title}
            className="group flex min-h-[165px] flex-col items-center justify-between rounded-[5px] border border-[#bfe4c9] bg-white px-3 pb-5 pt-4 text-center shadow-[0_14px_34px_rgba(31,64,48,0.05)] transition hover:-translate-y-1 hover:border-[#7fd29a] hover:shadow-[0_24px_60px_rgba(31,64,48,0.12)] sm:min-h-[188px] sm:px-5 sm:pb-6 sm:pt-5"
          >
            <ServiceIllustration icon={service.icon} />
            <span
              className={`mt-3 inline-flex rounded-[4px] px-2.5 py-1.5 text-[13px] font-black leading-none text-[#008181] sm:mt-4 sm:px-3 sm:text-[15px] ${serviceLabelColors[index % serviceLabelColors.length]}`}
            >
              {service.title}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

const serviceLabelColors = [
  "bg-[#f7d5dd]",
  "bg-[#cdebb9]",
  "bg-[#cdeaf3]",
  "bg-[#cfd7fb]",
  "bg-[#f4cfef]",
  "bg-[#faead8]",
];

function ServiceIllustration({ icon }: { icon: ServicePromise["icon"] }) {
  const palette = {
    shipping: {
      bg: "#d9f4fb",
      accent: "#1a9ab1",
      soft: "#f7d7df",
      dark: "#304a58",
    },
    order: {
      bg: "#fde4ef",
      accent: "#cc6b99",
      soft: "#f9cbdc",
      dark: "#2f3340",
    },
    savings: {
      bg: "#dff1c8",
      accent: "#86be55",
      soft: "#edf8dc",
      dark: "#4d7538",
    },
    promotions: {
      bg: "#d9edf9",
      accent: "#69a8d8",
      soft: "#eaf6ff",
      dark: "#2f5574",
    },
    happy: {
      bg: "#e8e2ff",
      accent: "#8d79d6",
      soft: "#f3d4ef",
      dark: "#4b426c",
    },
    support: {
      bg: "#fde6d7",
      accent: "#df8d5c",
      soft: "#fff3e8",
      dark: "#3c3c3c",
    },
  }[icon];

  return (
    <svg
      aria-hidden="true"
      className="h-[94px] w-full max-w-[128px] overflow-visible sm:h-[106px] sm:max-w-[142px]"
      fill="none"
      viewBox="0 0 150 112"
    >
      <circle cx="75" cy="56" fill={palette.bg} r="45" />
      <circle cx="42" cy="24" fill={palette.soft} r="5" />
      <circle cx="116" cy="29" fill={palette.soft} r="4" />
      <path d="M26 95h96" stroke="#d5ddd6" strokeLinecap="round" strokeWidth="3" />
      {icon === "shipping" ? (
        <>
          <rect fill="#ffffff" height="58" rx="7" stroke={palette.dark} strokeWidth="2" width="46" x="52" y="23" />
          <path d="M58 36h34M58 49h27M58 62h34" stroke="#9eb5bf" strokeLinecap="round" strokeWidth="3" />
          <path d="M61 74h28" stroke={palette.accent} strokeLinecap="round" strokeWidth="5" />
          <path d="M33 52c9-7 15-8 23-6M98 45c10-3 18-1 25 5" stroke={palette.dark} strokeLinecap="round" strokeWidth="2" />
          <path d="M36 72 22 64m89 7 17-8" stroke={palette.accent} strokeLinecap="round" strokeWidth="3" />
          <circle cx="75" cy="31" fill={palette.accent} r="4" />
        </>
      ) : null}
      {icon === "order" ? (
        <>
          <circle cx="83" cy="56" fill="#fff" r="31" stroke={palette.dark} strokeWidth="3" />
          <path d="M83 31v27l18 12" stroke={palette.dark} strokeLinecap="round" strokeWidth="3" />
          <path d="M51 78c-12 3-23-5-21-20 2-12 13-20 24-17" stroke={palette.accent} strokeLinecap="round" strokeWidth="6" />
          <path d="M40 38l-7 2 6 6" stroke={palette.accent} strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d="M108 32h13M114 26v13" stroke={palette.accent} strokeLinecap="round" strokeWidth="3" />
          <rect fill={palette.accent} height="10" rx="2" width="7" x="80" y="17" />
        </>
      ) : null}
      {icon === "savings" ? (
        <>
          <path d="M49 66c0-18 14-31 34-31 19 0 32 12 32 31 0 18-13 28-33 28S49 84 49 66Z" fill="#b5dd78" stroke={palette.dark} strokeWidth="2" />
          <circle cx="65" cy="58" fill={palette.dark} r="3" />
          <path d="M88 57h12" stroke={palette.dark} strokeLinecap="round" strokeWidth="3" />
          <path d="M43 66H31m86-6 13-5" stroke={palette.accent} strokeLinecap="round" strokeWidth="4" />
          <path d="M80 35c4-10 12-16 25-19" stroke={palette.dark} strokeLinecap="round" strokeWidth="2" />
          <path d="M109 22c7 11 6 23-4 36" stroke={palette.dark} strokeLinecap="round" strokeWidth="2" />
          <rect fill="#ffffff" height="36" rx="4" stroke={palette.dark} strokeWidth="2" width="12" x="117" y="58" />
        </>
      ) : null}
      {icon === "promotions" ? (
        <>
          <rect fill="#fff" height="46" rx="6" stroke={palette.dark} strokeWidth="2" width="72" x="39" y="41" />
          <path d="M39 56h72" stroke={palette.accent} strokeWidth="4" />
          <path d="M75 41v46" stroke={palette.accent} strokeWidth="4" />
          <path d="M65 41c-10-9-15-18-6-23 9-5 14 6 16 23ZM85 41c10-9 15-18 6-23-9-5-14 6-16 23Z" fill="#fff" stroke={palette.dark} strokeWidth="2" />
          <path d="M45 36c-5-8 2-16 10-11m50 9c6-8-2-17-10-11" stroke={palette.accent} strokeLinecap="round" strokeWidth="3" />
          <path d="M62 96c8-12 18-14 29 0" stroke={palette.dark} strokeLinecap="round" strokeWidth="2" />
        </>
      ) : null}
      {icon === "happy" ? (
        <>
          <path d="M49 78c11-5 21-16 26-33 5 17 16 28 27 33" stroke={palette.dark} strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d="M75 44V24" stroke={palette.accent} strokeLinecap="round" strokeWidth="5" />
          <circle cx="75" cy="20" fill={palette.accent} r="5" />
          <path d="M45 55c-12 1-20 8-22 19m82-19c12 1 20 8 22 19" stroke={palette.accent} strokeLinecap="round" strokeWidth="4" />
          <path d="M38 76h26m22 0h26" stroke={palette.dark} strokeLinecap="round" strokeWidth="4" />
          <circle cx="51" cy="43" fill={palette.dark} r="5" />
          <circle cx="99" cy="43" fill={palette.dark} r="5" />
        </>
      ) : null}
      {icon === "support" ? (
        <>
          <rect fill="#ffffff" height="62" rx="7" stroke={palette.dark} strokeWidth="2" width="82" x="34" y="25" />
          <path d="M34 41h82" stroke={palette.accent} strokeWidth="4" />
          <circle cx="44" cy="33" fill={palette.accent} r="3" />
          <circle cx="53" cy="33" fill={palette.accent} r="3" />
          <circle cx="62" cy="33" fill={palette.accent} r="3" />
          <circle cx="75" cy="63" fill={palette.soft} r="18" stroke={palette.dark} strokeWidth="2" />
          <path d="M64 63c2-7 7-11 14-10 7 1 11 6 10 13" stroke={palette.dark} strokeLinecap="round" strokeWidth="3" />
          <path d="M56 62v9m38-9v9" stroke={palette.accent} strokeLinecap="round" strokeWidth="5" />
          <path d="M67 77c6 5 13 5 19 0" stroke={palette.dark} strokeLinecap="round" strokeWidth="2" />
        </>
      ) : null}
    </svg>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#008181]">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 font-serif text-3xl italic text-[#856817] sm:text-4xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#81776a]">
        Browse curated essentials with clear categories, quick actions, and product details that are easy to compare.
      </p>
    </div>
  );
}

function CategorySection({ categories }: { categories: Category[] }) {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 sm:py-18">
      <SectionHeading eyebrow="Popular categories" title="Shop By Popular Categories" />
      <div className="mx-auto mt-9 grid max-w-6xl gap-5 sm:mt-12 md:grid-cols-3">
        {categories.map((category) => (
          <article key={category.name} className="group overflow-hidden rounded-[20px] border border-[#d8eadc] bg-white p-4 shadow-[0_16px_40px_rgba(37,42,49,0.06)] transition hover:-translate-y-1 hover:border-[#8dd7a4] hover:shadow-[0_24px_60px_rgba(37,42,49,0.11)]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] bg-[#f5f7f5]">
              <Image
                alt={category.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                height={260}
                loading="eager"
                src={category.image}
                width={360}
              />
            </div>
            <h3 className="mt-5 font-serif text-2xl text-[#4f4328]">{category.name}</h3>
            <p className="mt-2 text-sm leading-6 text-[#6f766f]">{category.description}</p>
            <a
              href="#products"
              className="mt-5 inline-flex h-10 items-center justify-center rounded-full border border-[#cfe7d6] px-5 text-[11px] font-black uppercase tracking-[0.16em] text-[#008181] transition hover:border-[#008181] hover:bg-[#e8fff7]"
            >
              Explore
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function PromoRibbon() {
  return (
    <section className="grid overflow-hidden border-y border-[#edf3ee] bg-white md:grid-cols-2">
      <div className="relative min-h-64 bg-[#f6dcc0]">
        <Image
          alt="Natural skin and body care promotion"
          className="absolute inset-0 h-full w-full object-cover"
          fill
          loading="eager"
          sizes="(min-width: 768px) 50vw, 100vw"
          src="https://images.unsplash.com/photo-1498843053639-170ff2122f35?auto=format&fit=crop&w=900&q=80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-[#fff7ed]/80 to-transparent" />
        <div className="relative z-10 max-w-md p-8 sm:p-10 md:ml-auto">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#008181]">Sale up to 50% off</p>
          <h2 className="mt-2 font-serif text-4xl text-[#5d4a1d]">Skin & Body Care</h2>
          <a className="mt-5 inline-flex h-10 items-center rounded-full bg-[#008181] px-5 text-[11px] font-black uppercase tracking-[0.14em] text-white hover:bg-[#006b6b]" href="#products">
            Shop care
          </a>
        </div>
      </div>
      <div className="relative min-h-64 bg-[#d7d0c6]">
        <Image
          alt="Organic cosmetic bottles"
          className="absolute inset-0 h-full w-full object-cover"
          fill
          loading="eager"
          sizes="(min-width: 768px) 50vw, 100vw"
          src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#14231e]/15 to-[#14231e]/75" />
        <div className="relative z-10 ml-auto max-w-sm p-8 text-right text-white sm:p-10">
          <p className="font-serif text-xl italic text-[#f0ce78]">We love organic</p>
          <h2 className="font-serif text-4xl">John master organics</h2>
          <a className="mt-5 inline-flex h-10 items-center rounded-full bg-white px-5 text-[11px] font-black uppercase tracking-[0.14em] text-[#008181] hover:bg-[#e8fff7]" href="#products">
            View edit
          </a>
        </div>
      </div>
    </section>
  );
}

type ProductTab = "featured" | "popular" | "new";

function ProductSection({ products }: { products: Product[] }) {
  const [activeTab, setActiveTab] = useState<ProductTab>("featured");
  const [activeCategory, setActiveCategory] = useState("All");
  const tabProducts = {
    featured: products.filter((product) => product.isFeatured),
    popular: products.filter((product) => product.isPopular),
    new: products.filter((product) => product.isNew),
  };
  const categoryOptions = [
    "All",
    ...Array.from(new Set(products.flatMap((product) => (product.category ? [product.category] : [])))),
  ];
  const activeProducts = tabProducts[activeTab].length > 0 ? tabProducts[activeTab] : products;
  const visibleProducts =
    activeCategory === "All"
      ? activeProducts
      : activeProducts.filter((product) => product.category === activeCategory);
  const fallbackProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);
  const renderedProducts = visibleProducts.length > 0 ? visibleProducts : fallbackProducts;
  const tabs: { label: string; value: ProductTab }[] = [
    { label: "Featured", value: "featured" },
    { label: "Popular", value: "popular" },
    { label: "New added", value: "new" },
  ];

  return (
    <section id="products" className="bg-white px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#008181]">Curated products</p>
            <h2 className="mt-2 font-serif text-3xl italic text-[#856817] sm:text-4xl">Featured Store Picks</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[#6f766f]">
              Switch between collections and categories to quickly find fashion pieces, skincare, and body care.
            </p>
          </div>
          <Link
            className="inline-flex w-fit items-center gap-2 text-[12px] font-black text-[#008181] transition hover:text-[#aa9737]"
            href="/shop"
          >
            View More <ArrowRight size={14} />
          </Link>
        </div>
        <div className="mb-8 rounded-[22px] border border-[#d8eadc] bg-[#fbfdfb] p-3 shadow-[0_12px_30px_rgba(37,42,49,0.04)]">
          <div className="flex flex-wrap gap-2 border-b border-[#e6f0e8] pb-3">
            {tabs.map((tab) => (
              <button
                aria-pressed={activeTab === tab.value}
                className={`h-10 rounded-full px-5 text-[13px] font-bold transition ${
                  activeTab === tab.value
                    ? "bg-[#008181] text-white shadow-[0_10px_24px_rgba(0,129,129,0.18)]"
                    : "bg-white text-[#5f666d] hover:bg-[#e3f4ee] hover:text-[#008181]"
                }`}
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {categoryOptions.map((category) => (
              <button
                aria-pressed={activeCategory === category}
                className={`h-9 shrink-0 rounded-full border px-4 text-[12px] font-bold transition ${
                  activeCategory === category
                    ? "border-[#008181] bg-[#e8fff7] text-[#008181]"
                    : "border-[#d9e7df] bg-white text-[#5f666d] hover:border-[#008181] hover:text-[#008181]"
                }`}
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {renderedProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { formatMoney } = useCurrency();
  const productHref = `/product/${product.slug ?? product.id}`;

  function handleAddToCart() {
    addToCart(product);
    router.push("/cart");
  }

  return (
    <article className="group relative rounded-[22px] border border-[#bfe4c9] bg-white p-3 shadow-[0_16px_36px_rgba(30,64,48,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#7fd29a] hover:shadow-[0_22px_55px_rgba(30,64,48,0.12)]">
      <div className="relative aspect-square overflow-hidden rounded-[16px] bg-[#f2f2f2]">
        {product.badge ? (
          <span className={`absolute left-3 top-3 z-20 rounded-full px-2.5 py-1 text-[10px] font-bold text-white ${product.badge === "Hot" ? "bg-[#ff7dab]" : product.badge === "Sale" ? "bg-[#9bd0ef]" : "bg-[#9bc9b7]"}`}>
            {product.badge}
          </span>
        ) : null}
        <Link aria-label={`View ${product.name}`} href={productHref}>
          <Image
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            height={520}
            loading="eager"
            src={product.image}
            width={520}
          />
        </Link>
        <div className="absolute inset-0 grid place-items-center bg-white/0 opacity-0 backdrop-blur-0 transition duration-300 group-hover:bg-white/35 group-hover:opacity-100">
          <div className="flex translate-y-3 gap-2 transition duration-300 group-hover:translate-y-0">
            <Link
              aria-label={`Quick view ${product.name}`}
              className="grid h-10 w-10 place-items-center rounded-full bg-[#e8fff7] text-[#008181] shadow-sm transition hover:bg-[#008181] hover:text-white"
              href={productHref}
            >
              <Eye size={17} />
            </Link>
            <button
              aria-label={`Save ${product.name}`}
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-[#e8fff7] text-[#008181] shadow-sm transition hover:bg-[#008181] hover:text-white"
              type="button"
            >
              <Heart size={17} />
            </button>
            <button
              aria-label={`Compare ${product.name}`}
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-[#e8fff7] text-[#008181] shadow-sm transition hover:bg-[#008181] hover:text-white"
              type="button"
            >
              <Shuffle size={17} />
            </button>
          </div>
        </div>
      </div>
      <div className="px-1 pb-1 pt-3">
        <p className="text-[11px] lowercase text-[#68717a]">{product.brand}</p>
        <Link className="mt-1 block min-h-11 font-semibold leading-5 text-[#252a31] hover:text-[#008181]" href={productHref}>
          {product.name}
        </Link>
        <div className="mt-1 flex items-center gap-1 text-[#f7b500]">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} size={12} fill={index < product.rating ? "currentColor" : "none"} />
          ))}
          <span className="ml-1 text-[11px] text-[#5f666d]">{product.reviewCount ?? 90}%</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <p className="font-black text-[#008181]">{formatMoney(product.price)}</p>
          <button
            aria-label={`Add ${product.name} to cart`}
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-[#bfe4c9] bg-[#eafff8] text-[#008181] transition hover:bg-[#008181] hover:text-white"
            onClick={handleAddToCart}
            type="button"
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}

function NewArrivals({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return null;
  }

  return (
    <ProductRail
      eyebrow="Fresh in store"
      products={products}
      title="New Arrivals"
    />
  );
}

function MonthlyBestDeals({ products }: { products: Product[] }) {
  const { formatMoney } = useCurrency();

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#f6faf7] px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-9 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#008181]">Monthly best deals</p>
            <h2 className="mt-2 font-serif text-3xl italic text-[#a77b15] sm:text-4xl">Best Deals This Month</h2>
          </div>
          <Link className="inline-flex w-fit items-center gap-2 text-[12px] font-black text-[#008181]" href="/shop">
            View More <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {products.map((product) => (
            <article
              className="grid gap-4 rounded-[22px] border border-[#bfe4c9] bg-white p-3 shadow-[0_16px_36px_rgba(30,64,48,0.05)] transition hover:-translate-y-1 hover:border-[#8dd7a4] hover:shadow-[0_22px_50px_rgba(30,64,48,0.1)] sm:grid-cols-[150px_1fr]"
              key={product.id}
            >
              <Link className="relative aspect-square overflow-hidden rounded-[16px] bg-[#f2f2f2]" href={`/product/${product.slug ?? product.id}`}>
                <Image alt={product.name} className="h-full w-full object-cover" height={300} src={product.image} width={300} />
              </Link>
              <div className="flex flex-col justify-center">
                <p className="text-xs lowercase text-[#68717a]">{product.brand}</p>
                <Link className="mt-1 font-semibold text-[#252a31] hover:text-[#008181]" href={`/product/${product.slug ?? product.id}`}>
                  {product.name}
                </Link>
                <p className="mt-2 text-sm leading-6 text-[#68717a]">{product.shortDescription}</p>
                <p className="mt-3 font-black text-[#008181]">{formatMoney(product.price)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductRail({
  eyebrow,
  products,
  title,
}: {
  eyebrow: string;
  products: Product[];
  title: string;
}) {
  return (
    <section className="bg-white px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#008181]">{eyebrow}</p>
            <h2 className="mt-2 font-serif text-3xl italic text-[#a77b15] sm:text-4xl">{title}</h2>
          </div>
          <Link className="inline-flex w-fit items-center gap-2 text-[12px] font-black text-[#008181]" href="/shop">
            View More <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureTiles({ tiles }: { tiles: PromoTile[] }) {
  return (
    <section className="bg-white px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="mx-auto mb-8 max-w-6xl">
        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#008181]">Curated edits</p>
        <h2 className="mt-2 font-serif text-3xl italic text-[#856817] sm:text-4xl">Shop The Look</h2>
      </div>
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
        {tiles.map((tile) => (
          <article key={tile.title} className="group overflow-hidden rounded-[20px] border border-[#d8eadc] bg-white p-4 shadow-[0_14px_34px_rgba(37,42,49,0.06)] transition hover:-translate-y-1 hover:border-[#8dd7a4]">
            <div className="aspect-[4/3] overflow-hidden rounded-[16px] bg-[#f6f2eb]">
              <Image
                alt={tile.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                height={390}
                loading="eager"
                src={tile.image}
                width={520}
              />
            </div>
            <p className="mt-5 text-[11px] font-black uppercase tracking-[0.22em] text-[#008181]">{tile.kicker}</p>
            <h3 className="mt-2 font-serif text-xl leading-6 text-[#4a4134]">{tile.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[#6f766f]">
              Signature beauty picks boxed for gifting, discovery, and daily glow.
            </p>
            <a
              className="mt-5 inline-flex h-10 items-center justify-center rounded-full border border-[#cfe7d6] px-5 text-[11px] font-black uppercase tracking-[0.16em] text-[#008181] hover:border-[#008181] hover:bg-[#e8fff7]"
              href={tile.href}
            >
              View More
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function WellnessBand() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#f4f4f3] px-4 py-14 sm:px-6 sm:py-20">
      <div className="pointer-events-none absolute -left-24 bottom-0 hidden aspect-[4/3] w-[420px] lg:block">
        <Image
          alt=""
          className="object-cover"
          fill
          loading="eager"
          sizes="420px"
          src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=760&q=80"
        />
      </div>
      <div className="pointer-events-none absolute -right-20 bottom-0 hidden aspect-[4/3] w-[360px] lg:block">
        <Image
          alt=""
          className="object-cover"
          fill
          loading="eager"
          sizes="360px"
          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=760&q=80"
        />
      </div>
      <div className="relative mx-auto max-w-2xl text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#c0952d]">Beauty rituals</p>
        <h2 className="mt-3 font-serif text-3xl italic text-[#6a5a40]">Clean formulas for calm, polished days.</h2>
        <p className="mt-5 text-sm leading-7 text-[#70685e]">
          Mugnee Multiple Limited brings premium e-commerce merchandising together with serene editorial presentation,
          making every section feel deliberate, shoppable, and easy to scan.
        </p>
        <p className="mt-6 font-serif text-xl text-[#b98b20]">Mugnee Care Team</p>
      </div>
    </section>
  );
}

function DailyDeals({ products }: { products: Product[] }) {
  const { formatMoney } = useCurrency();

  return (
    <section className="bg-white px-4 py-14 sm:px-6 sm:py-18">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#008181]">Daily deals</p>
          <h2 className="mt-2 font-serif text-3xl italic text-[#856817] sm:text-4xl">Limited Time Picks</h2>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {products.map((product) => (
            <article key={product.id} className="grid gap-5 rounded-[22px] border border-[#d8eadc] bg-[#fbfdfb] p-4 shadow-[0_14px_34px_rgba(37,42,49,0.05)] sm:grid-cols-[180px_1fr]">
              <Link className="relative aspect-[4/5] overflow-hidden rounded-[16px] bg-[#f7f4ef]" href={`/product/${product.slug ?? product.id}`}>
                <Image
                  alt={product.name}
                  className="h-full w-full object-cover"
                  height={400}
                  loading="eager"
                  src={product.image}
                  width={300}
                />
              </Link>
              <div className="flex flex-col justify-center">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#008181]">Today only</p>
                <Link className="mt-2 font-serif text-2xl text-[#4a4134] hover:text-[#008181]" href={`/product/${product.slug ?? product.id}`}>
                  {product.name}
                </Link>
                <p className="mt-2 text-sm leading-6 text-[#6f766f]">{product.shortDescription}</p>
                <p className="mt-3 text-2xl font-black text-[#008181]">{formatMoney(product.price)}</p>
              <div className="mt-5 grid max-w-64 grid-cols-4 gap-2">
                {["20", "12", "45", "09"].map((value, index) => (
                  <span key={`${product.id}-${value}`} className="rounded-[8px] border border-[#cfe7d6] bg-white py-2 text-center">
                    <strong className="block text-sm text-[#008181]">{value}</strong>
                    <span className="text-[9px] uppercase text-[#6f766f]">
                      {["Day", "Hrs", "Min", "Sec"][index]}
                    </span>
                  </span>
                ))}
              </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journal({ posts }: { posts: BlogPost[] }) {
  return (
    <section id="journal" className="relative bg-[#2f281f] text-white">
      <Image
        alt="Spa candles on rustic wooden table"
        className="absolute inset-0 h-full w-full object-cover opacity-55"
        fill
        loading="eager"
        sizes="100vw"
        src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1600&q=80"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#f1ca70]">Latest blog posts</p>
        <h2 className="mt-3 max-w-xl font-serif text-4xl italic">You Don&apos;t Want To Miss This</h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-white/80">
          Editorial stories, buying guides, and care rituals from the Mugnee beauty desk.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {posts.map((post) => (
            <article key={post.title} className="grid min-h-40 grid-cols-[90px_1fr] bg-[#b69232] text-white">
              <Image
                alt={post.title}
                className="h-full w-full object-cover"
                height={160}
                loading="eager"
                src={post.image}
                width={90}
              />
              <div className="p-4">
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/80">{post.category}</p>
                <h3 className="mt-2 font-serif text-lg leading-6">{post.title}</h3>
                <p className="mt-4 text-xs font-bold">{post.date}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="bg-[#f6faf7] px-4 py-16 text-center sm:px-6">
      <div className="mx-auto max-w-2xl rounded-[28px] border border-[#d8eadc] bg-white px-5 py-10 shadow-[0_18px_48px_rgba(37,42,49,0.06)]">
      <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#008181]">Newsletter sign up</p>
      <h2 className="mt-2 font-serif text-3xl italic text-[#856817]">Join our care circle</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#6f766f]">
        Get new arrivals, skincare edits, and seasonal deals in one clean weekly note.
      </p>
      <form className="mobile-friendly-form mx-auto mt-7 flex max-w-md overflow-hidden rounded-full border border-[#cfe7d6] bg-white shadow-[0_12px_30px_rgba(37,42,49,0.06)]" onSubmit={(event) => event.preventDefault()}>
        <input
          aria-label="Email address"
          className="min-w-0 flex-1 px-5 text-sm outline-none"
          placeholder="Email address"
          type="email"
        />
        <button className="bg-[#008181] px-6 text-[11px] font-black uppercase tracking-[0.14em] text-white hover:bg-[#006b6b]" type="submit">
          Subscribe
        </button>
      </form>
      </div>
    </section>
  );
}

function BrandStrip({ brands }: { brands: string[] }) {
  return (
    <section id="brands" className="border-y border-[#edf3ee] bg-white px-4 py-9 sm:px-6">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 text-center font-serif text-lg text-[#6f766f] sm:grid-cols-3 lg:grid-cols-6">
        {brands.map((brand) => (
          <span key={brand} className="mobile-brand-tile rounded-[14px] border border-[#d8eadc] px-2 py-4 transition hover:border-[#008181] hover:text-[#008181]">
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-[#fbfaf7] px-4 py-16 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <h2 className="font-serif text-2xl text-[#8f6e19]">Mugnee Multiple Limited</h2>
          <p className="mt-4 max-w-sm text-sm leading-7 text-[#746b5f]">
            Enterprise-ready commerce frontend crafted for beauty, wellness, and lifestyle merchandising.
          </p>
        </div>
        {["Company", "Products"].map((title) => (
          <div key={title}>
            <h3 className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#3f382e]">{title}</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#746b5f]">
              <li><a href="/about">About</a></li>
              <li><a href="/shop">Shop</a></li>
              <li><a href="/contact">Delivery</a></li>
              <li><a href="/contact">Support</a></li>
            </ul>
          </div>
        ))}
        <div>
          <h3 className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#3f382e]">Instagram</h3>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=180&q=70",
              "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=180&q=70",
              "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=180&q=70",
              "https://images.unsplash.com/photo-1631730359585-38a4935cbec4?auto=format&fit=crop&w=180&q=70",
              "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=180&q=70",
              "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=180&q=70",
            ].map((image) => (
              <Image
                key={image}
                alt=""
                className="aspect-square w-full object-cover"
                height={120}
                loading="eager"
                src={image}
                width={120}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-6xl border-t border-[#eee7da] pt-6 text-xs text-[#8c8376]">
        © 2026 Mugnee Multiple Limited. All rights reserved.
      </p>
    </footer>
  );
}
