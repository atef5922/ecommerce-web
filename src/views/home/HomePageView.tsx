"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Headphones,
  RefreshCcw,
  Search,
  ShieldCheck,
  Star,
  Tag,
  Truck,
} from "lucide-react";
import Image from "next/image";
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
  const IconMap = {
    truck: Truck,
    shield: ShieldCheck,
    refresh: RefreshCcw,
    headphones: Headphones,
  };

  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => {
          const Icon = IconMap[service.icon];
          return (
            <div key={service.title} className="premium-card flex items-center justify-center gap-4 rounded-2xl px-5 py-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#f5efdf] text-[#b98b20]">
                <Icon size={18} />
              </span>
              <span>
                <strong className="block text-[12px] uppercase tracking-[0.16em]">{service.title}</strong>
                <span className="text-xs text-[#8b8275]">{service.detail}</span>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#c0952d]">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 font-serif text-3xl italic text-[#a77b15] sm:text-4xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#81776a]">
        A refined marketplace experience for daily essentials, elevated formulas, and seasonal care.
      </p>
    </div>
  );
}

function CategorySection({ categories }: { categories: Category[] }) {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 sm:py-20">
      <SectionHeading title="Hot Categories on Today" />
      <div className="mx-auto mt-9 grid max-w-5xl gap-6 sm:mt-12 md:grid-cols-3 md:gap-10">
        {categories.map((category) => (
          <article key={category.name} className="group rounded-[22px] border border-[#eee7da] bg-[#fffdf9] p-5 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-[0_24px_70px_rgba(37,42,49,0.12)] sm:rounded-[28px] sm:p-7">
            <div className="mx-auto h-36 w-36 overflow-hidden rounded-full border border-dashed border-[#bb8b21] bg-white p-2 sm:h-48 sm:w-48">
              <Image
                alt={category.name}
                className="h-full w-full rounded-full object-cover transition duration-500 group-hover:scale-105"
                height={192}
                loading="eager"
                src={category.image}
                width={192}
              />
            </div>
            <h3 className="mt-6 font-serif text-xl text-[#5c4b28]">{category.name}</h3>
            <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[#83796c]">{category.description}</p>
            <a
              href="#products"
              className="mt-6 inline-flex h-9 min-w-32 items-center justify-center rounded-full border border-[#ddd1b5] px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6e6251] transition hover:border-[#b98b20] hover:text-[#b98b20]"
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
    <section className="grid overflow-hidden md:grid-cols-2">
      <div className="relative min-h-52 bg-[#f6dcc0]">
        <Image
          alt="Natural skin and body care promotion"
          className="absolute inset-0 h-full w-full object-cover"
          fill
          loading="eager"
          sizes="(min-width: 768px) 50vw, 100vw"
          src="https://images.unsplash.com/photo-1498843053639-170ff2122f35?auto=format&fit=crop&w=900&q=80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-[#f1d9bd]/80 to-transparent" />
        <div className="relative z-10 max-w-md p-10 md:ml-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-[#9b741a]">Sale upto 50% off</p>
          <h2 className="mt-2 font-serif text-4xl text-[#6d4b1c]">Skin & Body Care</h2>
        </div>
      </div>
      <div className="relative min-h-52 bg-[#d7d0c6]">
        <Image
          alt="Organic cosmetic bottles"
          className="absolute inset-0 h-full w-full object-cover"
          fill
          loading="eager"
          sizes="(min-width: 768px) 50vw, 100vw"
          src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#2c2a24]/65" />
        <div className="relative z-10 ml-auto max-w-sm p-10 text-right text-white">
          <p className="font-serif text-xl italic text-[#f0ce78]">We love organic</p>
          <h2 className="font-serif text-4xl">John master organics</h2>
        </div>
      </div>
    </section>
  );
}

function ProductSection({ products }: { products: Product[] }) {
  return (
    <section id="products" className="bg-white px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-9 flex w-full max-w-md flex-wrap items-center justify-center gap-2 rounded-2xl border border-[#eee7da] bg-[#fbfaf7] p-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#8e8374] sm:mb-12 sm:w-fit sm:max-w-none sm:rounded-full sm:text-[11px] sm:tracking-[0.18em]">
          <button className="rounded-full bg-white px-4 py-3 text-[#b98b20] shadow-sm sm:px-5" type="button">New Arrivals</button>
          <button className="rounded-full px-4 py-3 hover:bg-white hover:text-[#b98b20] sm:px-5" type="button">Best Sellers</button>
          <button className="rounded-full px-4 py-3 hover:bg-white hover:text-[#b98b20] sm:px-5" type="button">Featured Products</button>
        </div>
        <div className="grid gap-x-6 gap-y-9 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8">
          {products.map((product) => (
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

  function handleAddToCart() {
    addToCart(product);
    router.push("/cart");
  }

  return (
    <article className="premium-product-card group relative mx-auto w-full max-w-[285px] text-center transition duration-300">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-gradient-to-b from-[#f7f7f7] to-[#cacaca]">
        {product.badge && !product.badge.startsWith("-") ? (
          <span className="absolute left-0 top-0 z-20 bg-[#262626] px-4 py-2 text-[11px] font-bold uppercase text-white">
            {product.badge}
          </span>
        ) : null}
        {product.compareAt ? (
          <span className="absolute right-0 top-0 z-20 bg-[#262626] px-4 py-2 text-[11px] font-bold uppercase text-white">
            -8%
          </span>
        ) : null}
        <Image
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          height={520}
          loading="eager"
          src={product.image}
          width={416}
        />
        <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/18" />
        <span className="absolute left-1/2 top-1/2 z-20 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 scale-90 place-items-center rounded-full bg-[#b2a13b] text-white opacity-0 shadow-lg transition duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100">
          <Search size={22} />
        </span>
        <div
          aria-label={`${product.rating} out of 5 stars`}
          className="absolute inset-x-0 bottom-4 z-20 flex translate-y-2 justify-center gap-0.5 text-white opacity-0 drop-shadow transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} size={20} fill={index < product.rating ? "currentColor" : "none"} />
          ))}
        </div>
      </div>
      <p className="mt-5 inline-flex items-center justify-center gap-1 text-[13px] text-[#9b9285]">
        <Tag size={14} /> {product.brand}
      </p>
      <h3 className="mx-auto mt-3 max-w-64 truncate font-serif text-lg uppercase leading-6 text-[#3f382e]">
        {product.name}
      </h3>
      <p className="mt-2 text-sm text-[#8f877b]">
        {product.compareAt ? (
          <span className="mr-2 text-[#aaa197] line-through">{formatMoney(product.compareAt)}</span>
        ) : null}
        <span className="font-bold text-[#b98b20]">{formatMoney(product.price)}</span>
      </p>
      <button
        className="mt-4 inline-flex h-10 min-w-44 translate-y-1 cursor-pointer items-center justify-center rounded-full border border-[#d6d6d6] bg-white px-7 font-serif text-sm font-bold uppercase text-[#5a5147] opacity-100 shadow-sm transition duration-300 hover:border-[#aa9737] hover:bg-[#aa9737] hover:text-white group-hover:translate-y-0 group-hover:border-[#aa9737] group-hover:bg-[#aa9737] group-hover:text-white group-focus-within:translate-y-0 group-focus-within:border-[#aa9737] group-focus-within:bg-[#aa9737] group-focus-within:text-white md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
        onClick={handleAddToCart}
        type="button"
      >
        Add to Cart
      </button>
    </article>
  );
}

function FeatureTiles({ tiles }: { tiles: PromoTile[] }) {
  return (
    <section className="bg-white px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
        {tiles.map((tile) => (
          <article key={tile.title} className="border border-[#ece4d6] bg-white p-7 text-center">
            <div className="mx-auto aspect-[4/3] max-w-56 overflow-hidden bg-[#f6f2eb]">
              <Image
                alt={tile.title}
                className="h-full w-full object-cover"
                height={390}
                loading="eager"
                src={tile.image}
                width={520}
              />
            </div>
            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.24em] text-[#c0952d]">{tile.kicker}</p>
            <h3 className="mt-2 font-serif text-xl uppercase leading-6 text-[#4a4134]">{tile.title}</h3>
            <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[#81776a]">
              Signature beauty picks boxed for gifting, discovery, and daily glow.
            </p>
            <a
              className="mt-5 inline-flex h-9 items-center justify-center rounded-full border border-[#ddd1b5] px-6 text-[11px] font-bold uppercase tracking-[0.16em] text-[#6e6251]"
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
    <section className="bg-white px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#c0952d]">Daily Deals</p>
        <div className="mt-8 grid gap-12 md:grid-cols-2">
          {products.map((product) => (
            <article key={product.id} className="text-center">
              <p className="font-serif text-2xl italic text-[#ad7f18]">Hummingbird Print...</p>
              <div className="mx-auto mt-6 aspect-[3/4] max-w-56 overflow-hidden bg-[#f7f4ef]">
                <Image
                  alt={product.name}
                  className="h-full w-full object-cover"
                  height={400}
                  loading="eager"
                  src={product.image}
                  width={300}
                />
              </div>
              <h3 className="mt-5 text-sm uppercase tracking-[0.18em] text-[#554d42]">{product.name}</h3>
              <p className="mt-2 text-3xl font-semibold text-[#b98b20]">{formatMoney(product.price)}</p>
              <div className="mx-auto mt-5 grid max-w-56 grid-cols-4 gap-2">
                {["20", "12", "45", "09"].map((value, index) => (
                  <span key={`${product.id}-${value}`} className="border border-[#c9a34b] py-2 text-center">
                    <strong className="block text-sm text-[#5b4c34]">{value}</strong>
                    <span className="text-[9px] uppercase text-[#928776]">
                      {["Day", "Hrs", "Min", "Sec"][index]}
                    </span>
                  </span>
                ))}
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
    <section className="bg-[#fbfaf7] px-4 py-16 text-center sm:px-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#c0952d]">Newsletter sign up</p>
      <h2 className="mt-2 font-serif text-2xl italic text-[#6a5a40]">Join our care circle</h2>
      <form className="mobile-friendly-form mx-auto mt-7 flex max-w-md overflow-hidden rounded-full border border-[#dbc994] bg-white shadow-[0_16px_40px_rgba(37,42,49,0.08)]" onSubmit={(event) => event.preventDefault()}>
        <input
          aria-label="Email address"
          className="min-w-0 flex-1 px-5 text-sm outline-none"
          placeholder="Email address"
          type="email"
        />
        <button className="bg-[#b98b20] px-6 text-[11px] font-bold uppercase tracking-[0.14em] text-white" type="submit">
          Subscribe
        </button>
      </form>
    </section>
  );
}

function BrandStrip({ brands }: { brands: string[] }) {
  return (
    <section id="brands" className="border-y border-[#eee7da] bg-white px-4 py-9 sm:px-6">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-5 text-center font-serif text-xl text-[#8f877b] sm:grid-cols-3 lg:grid-cols-6">
        {brands.map((brand) => (
          <span key={brand} className="mobile-brand-tile border border-[#eee7da] px-2 py-4">
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
