"use client";

import { useMemo, useState } from "react";
import {
  Grid3X3,
  List,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  Star,
  Tag,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { FilterOption, ShopPageModel, ShopProduct } from "@/models/ecommerce";
import { useCart } from "@/views/shared/CartContext";
import { useCurrency } from "@/views/shared/CurrencyContext";

type ShopViewModel = ShopPageModel & {
  productCountLabel: string;
  activeCategory: string;
  priceRangeLabel: string;
  cartTotal: string;
};

type Props = {
  viewModel: ShopViewModel;
};

type SortMode = "default" | "latest" | "price-asc" | "price-desc";
type ViewMode = "grid" | "list";

const maxCatalogPrice = 700;

export function ShopPageView({ viewModel }: Props) {
  const [query, setQuery] = useState("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [draftMaxPrice, setDraftMaxPrice] = useState(maxCatalogPrice);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(maxCatalogPrice);
  const [sortMode, setSortMode] = useState<SortMode>("default");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [page, setPage] = useState(1);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = viewModel.products.filter((product) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        [product.name, product.brand, product.designer, product.category]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesColor = selectedColor ? product.color === selectedColor : true;
      const matchesSize = selectedSize ? product.size === selectedSize : true;
      const matchesPrice = product.price <= appliedMaxPrice;

      return matchesSearch && matchesColor && matchesSize && matchesPrice;
    });

    return [...filtered].sort((a, b) => {
      if (sortMode === "latest") {
        return b.id.localeCompare(a.id, undefined, { numeric: true });
      }
      if (sortMode === "price-asc") {
        return a.price - b.price;
      }
      if (sortMode === "price-desc") {
        return b.price - a.price;
      }
      return viewModel.products.findIndex((product) => product.id === a.id) -
        viewModel.products.findIndex((product) => product.id === b.id);
    });
  }, [appliedMaxPrice, query, selectedColor, selectedSize, sortMode, viewModel.products]);

  const pageSize = viewMode === "grid" ? 6 : 4;
  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pagedProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function resetToFirstPage() {
    setPage(1);
  }

  function clearFilters() {
    setQuery("");
    setSelectedColor(null);
    setSelectedSize(null);
    setDraftMaxPrice(maxCatalogPrice);
    setAppliedMaxPrice(maxCatalogPrice);
    setSortMode("default");
    setPage(1);
  }

  return (
    <main className="premium-shell min-h-screen text-[#252a31]">
      <Breadcrumb />
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[265px_1fr] lg:gap-8 lg:py-24">
        <ShopSidebar
          activeCategory={viewModel.activeCategory}
          colorFilters={viewModel.colorFilters}
          draftMaxPrice={draftMaxPrice}
          newProducts={viewModel.newProducts}
          onApplyPrice={() => {
            setAppliedMaxPrice(draftMaxPrice);
            resetToFirstPage();
          }}
          onClearFilters={clearFilters}
          onSelectColor={(color) => {
            setSelectedColor((currentColor) => (currentColor === color ? null : color));
            resetToFirstPage();
          }}
          onSelectSize={(size) => {
            setSelectedSize((currentSize) => (currentSize === size ? null : size));
            resetToFirstPage();
          }}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          setDraftMaxPrice={setDraftMaxPrice}
          sizeFilters={viewModel.sizeFilters}
        />
        <Catalog
          activeCategory={viewModel.activeCategory}
          currentPage={currentPage}
          filteredCount={filteredProducts.length}
          onPageChange={setPage}
          onSortChange={(mode) => {
            setSortMode(mode);
            resetToFirstPage();
          }}
          onSearchChange={(value) => {
            setQuery(value);
            resetToFirstPage();
          }}
          onViewModeChange={(mode) => {
            setViewMode(mode);
            resetToFirstPage();
          }}
          pageCount={pageCount}
          products={pagedProducts}
          searchQuery={query}
          sortMode={sortMode}
          totalCount={viewModel.products.length}
          viewMode={viewMode}
        />
      </section>
      <Newsletter />
      <BrandStrip brands={viewModel.brandMarks} />
      <Footer instagramImages={viewModel.instagramImages} />
    </main>
  );
}

function Breadcrumb() {
  return (
    <div className="border-y border-[#eee7da] bg-white/70">
      <div className="mx-auto max-w-6xl px-4 py-6 text-[12px] text-[#7d8389] sm:px-6">
        Home <span className="mx-2">&gt;</span> Fashion <span className="mx-2">&gt;</span>
        <span className="text-[#a99734]">Shop</span>
      </div>
    </div>
  );
}

function ShopSidebar({
  activeCategory,
  colorFilters,
  draftMaxPrice,
  newProducts,
  onApplyPrice,
  onClearFilters,
  onSelectColor,
  onSelectSize,
  selectedColor,
  selectedSize,
  setDraftMaxPrice,
  sizeFilters,
}: {
  activeCategory: string;
  colorFilters: FilterOption[];
  draftMaxPrice: number;
  newProducts: ShopProduct[];
  onApplyPrice: () => void;
  onClearFilters: () => void;
  onSelectColor: (color: string) => void;
  onSelectSize: (size: string) => void;
  selectedColor: string | null;
  selectedSize: string | null;
  setDraftMaxPrice: (price: number) => void;
  sizeFilters: FilterOption[];
}) {
  const { formatMoney } = useCurrency();

  return (
    <aside className="premium-card h-fit space-y-6 rounded-[22px] p-4 sm:space-y-8 sm:rounded-[26px] sm:p-5">
      <div className="rounded-2xl bg-[#252a31] px-5 py-4 text-sm font-bold text-white">
        <span className="inline-flex items-center gap-3">
          <Menu size={15} /> {activeCategory}
        </span>
      </div>
      <FilterPanel title="Filter by price">
        <input
          aria-label="Maximum price"
          className="mt-5 h-2 w-full cursor-pointer accent-[#aa9737]"
          max={maxCatalogPrice}
          min={0}
          onChange={(event) => setDraftMaxPrice(Number(event.target.value))}
          type="range"
          value={draftMaxPrice}
        />
        <div className="mt-6 flex items-center justify-between gap-4 text-[12px]">
          <span>
            Price: <strong className="font-normal">$0 - ${draftMaxPrice}</strong>
          </span>
          <button
            className="cursor-pointer rounded-full bg-[#aa9737] px-5 py-2 text-[11px] font-bold uppercase text-white transition hover:bg-[#8d7b28]"
            onClick={onApplyPrice}
            type="button"
          >
            Filter
          </button>
        </div>
      </FilterPanel>
      <FilterPanel title="Color">
        <FilterList activeValue={selectedColor} onSelect={onSelectColor} options={colorFilters} />
      </FilterPanel>
      <FilterPanel title="Size">
        <FilterList activeValue={selectedSize} onSelect={onSelectSize} options={sizeFilters} />
      </FilterPanel>
      <button
        className="cursor-pointer text-[12px] font-bold uppercase tracking-[0.12em] text-[#aa9737] transition hover:text-[#7d6d20]"
        onClick={onClearFilters}
        type="button"
      >
        Clear all filters
      </button>
      <section>
        <h2 className="font-serif text-lg font-bold uppercase text-[#aa9737]">* New Products</h2>
        <div className="mt-5 space-y-5">
          {newProducts.map((product) => (
            <article key={product.id} className="grid grid-cols-[76px_1fr] gap-4">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#f5f3ef]">
                <Image
                  alt={product.name}
                  className="object-cover"
                  fill
                  loading="eager"
                  sizes="76px"
                  src={product.image}
                />
              </div>
              <div className="min-w-0">
                <p className="inline-flex items-center gap-1 text-[11px] text-[#9ba0a6]">
                  <Tag size={12} /> {product.designer}
                </p>
                <h3 className="mt-2 truncate font-serif text-sm uppercase text-[#252a31]">{product.name}</h3>
                <p className="mt-2 font-serif text-lg text-[#252a31]">{formatMoney(product.price)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </aside>
  );
}

function FilterPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-serif text-lg font-bold text-[#252a31]">{title}</h2>
      {children}
    </section>
  );
}

function FilterList({
  activeValue,
  onSelect,
  options,
}: {
  activeValue: string | null;
  onSelect: (value: string) => void;
  options: FilterOption[];
}) {
  return (
    <ul className="mt-4 divide-y divide-[#eeeeee] text-sm text-[#5a626b]">
      {options.map((option) => (
        <li key={option.label}>
          <button
            aria-pressed={activeValue === option.label}
            className={`flex w-full cursor-pointer items-center justify-between py-3 text-left transition hover:text-[#aa9737] ${
              activeValue === option.label ? "font-bold text-[#aa9737]" : ""
            }`}
            onClick={() => onSelect(option.label)}
            type="button"
          >
            <span>{option.label}</span>
            <span>({option.count})</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function Catalog({
  activeCategory,
  currentPage,
  filteredCount,
  onPageChange,
  onSearchChange,
  onSortChange,
  onViewModeChange,
  pageCount,
  products,
  searchQuery,
  sortMode,
  totalCount,
  viewMode,
}: {
  activeCategory: string;
  currentPage: number;
  filteredCount: number;
  onPageChange: (page: number) => void;
  onSearchChange: (query: string) => void;
  onSortChange: (mode: SortMode) => void;
  onViewModeChange: (mode: ViewMode) => void;
  pageCount: number;
  products: ShopProduct[];
  searchQuery: string;
  sortMode: SortMode;
  totalCount: number;
  viewMode: ViewMode;
}) {
  return (
    <section>
      <div className="rounded-[26px] border border-[#eee7da] bg-white/80 px-6 py-5 shadow-sm">
        <h1 className="font-serif text-2xl font-bold uppercase tracking-[0.02em]">{activeCategory}</h1>
      </div>
      <div className="mt-5 flex flex-col gap-4 rounded-[22px] border border-[#eee7da] bg-white/85 p-4 shadow-sm md:flex-row md:items-center md:justify-between md:rounded-[26px]">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-4">
            <button
              aria-label="Grid view"
              aria-pressed={viewMode === "grid"}
              className={`grid h-10 w-10 cursor-pointer place-items-center rounded-full border transition hover:border-[#aa9737] hover:text-[#aa9737] ${viewMode === "grid" ? "border-[#aa9737] bg-[#f5efdf] text-[#aa9737]" : "border-[#e5e5e5] text-[#252a31]"}`}
              onClick={() => onViewModeChange("grid")}
              title="Grid view"
              type="button"
            >
              <Grid3X3 size={22} />
            </button>
            <button
              aria-label="List view"
              aria-pressed={viewMode === "list"}
              className={`grid h-10 w-10 cursor-pointer place-items-center rounded-full border transition hover:border-[#aa9737] hover:text-[#aa9737] ${viewMode === "list" ? "border-[#aa9737] bg-[#f5efdf] text-[#aa9737]" : "border-[#e5e5e5] text-[#252a31]"}`}
              onClick={() => onViewModeChange("list")}
              title="List view"
              type="button"
            >
              <List size={24} />
            </button>
          </div>
          <p className="text-sm font-semibold">
            Showing {filteredCount} of {totalCount} products
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative block">
            <span className="sr-only">Search products</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9ba0a6]" size={15} />
            <input
              className="h-11 w-full rounded-full border border-[#e0e0e0] bg-white pl-9 pr-4 text-sm outline-none transition focus:border-[#aa9737] sm:w-56"
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search products..."
              type="search"
              value={searchQuery}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center">
            <span>Sort By :</span>
            <select
              className="h-11 w-full cursor-pointer rounded-full border border-[#e0e0e0] bg-white px-4 text-sm text-[#6c737c] outline-none transition focus:border-[#aa9737] sm:w-auto"
              onChange={(event) => onSortChange(event.target.value as SortMode)}
              value={sortMode}
            >
              <option value="default">Default sorting</option>
              <option value="latest">Latest</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </label>
        </div>
      </div>
      {products.length > 0 ? (
        <div className={viewMode === "grid" ? "grid gap-x-6 gap-y-9 py-8 sm:grid-cols-2 sm:gap-y-14 xl:grid-cols-3 xl:gap-x-8" : "space-y-7 py-8"}>
          {products.map((product) =>
            viewMode === "grid" ? (
              <ShopProductCard key={product.id} product={product} />
            ) : (
              <ShopProductRow key={product.id} product={product} />
            ),
          )}
        </div>
      ) : (
        <div className="py-16 text-center">
          <h2 className="font-serif text-2xl text-[#252a31]">No products found</h2>
          <p className="mt-2 text-sm text-[#68717a]">Try changing the filters or search terms.</p>
        </div>
      )}
      <Pagination currentPage={currentPage} onPageChange={onPageChange} pageCount={pageCount} />
    </section>
  );
}

function ShopProductCard({ product }: { product: ShopProduct }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { formatMoney } = useCurrency();

  function handleAddToCart() {
    addToCart(product);
    router.push("/cart");
  }

  return (
    <article className="premium-product-card group relative mx-auto w-full max-w-[285px] text-center transition duration-300">
      <div className="relative mx-auto aspect-[4/5] w-full overflow-hidden rounded-[18px] bg-gradient-to-b from-[#f7f7f7] to-[#cacaca]">
        {product.badge && !product.badge.startsWith("-") ? (
          <span className="absolute left-0 top-0 z-20 bg-[#25282d] px-4 py-2 text-[11px] font-bold uppercase text-white">
            {product.badge}
          </span>
        ) : null}
        {product.compareAt ? (
          <span className="absolute right-0 top-0 z-20 bg-[#25282d] px-4 py-2 text-[11px] font-bold uppercase text-white">
            -8%
          </span>
        ) : null}
        <Image
          alt={product.name}
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          fill
          loading="eager"
          sizes="(min-width: 1280px) 285px, (min-width: 640px) 42vw, 90vw"
          src={product.image}
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
      <p className="mt-5 inline-flex items-center justify-center gap-1 text-[13px] text-[#9da1a6]">
        <Tag size={14} /> {product.designer}
      </p>
      <h2 className="mx-auto mt-3 max-w-64 truncate font-serif text-base uppercase tracking-[0.02em] text-[#252a31]">
        {product.name}
      </h2>
      <p className="mt-2 text-sm text-[#8a9096]">
        {product.compareAt ? (
          <span className="mr-2 text-[#969696] line-through">{formatMoney(product.compareAt)}</span>
        ) : null}
        <span className="font-serif text-base text-[#aa9737]">{formatMoney(product.price)}</span>
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

function ShopProductRow({ product }: { product: ShopProduct }) {
  const router = useRouter();
  const { addToCart } = useCart();

  function handleAddToCart() {
    addToCart(product);
    router.push("/cart");
  }

  return (
    <article className="premium-card group relative grid gap-5 rounded-[26px] p-5 sm:grid-cols-[180px_1fr]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-[#f7f5f1]">
        <Image
          alt={product.name}
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          fill
          loading="eager"
          sizes="180px"
          src={product.image}
        />
        <div
          aria-label={`${product.rating} out of 5 stars`}
          className="absolute inset-x-0 bottom-4 z-20 flex translate-y-2 justify-center gap-0.5 text-white opacity-0 drop-shadow transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} size={18} fill={index < product.rating ? "currentColor" : "none"} />
          ))}
        </div>
      </div>
      <div className="text-left">
        <ProductMeta align="left" product={product} />
        <p className="mt-4 max-w-xl text-sm leading-7 text-[#68717a]">
          {product.brand} care for {product.color.toLowerCase()} routines in size {product.size}, curated by {product.designer}.
        </p>
        <button
          className="mt-5 cursor-pointer bg-[#aa9737] px-5 py-2 text-[12px] font-bold uppercase text-white transition hover:bg-[#8d7b28]"
          onClick={handleAddToCart}
          type="button"
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}

function ProductMeta({ align = "center", product }: { align?: "center" | "left"; product: ShopProduct }) {
  const { formatMoney } = useCurrency();

  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <p className={`mt-4 inline-flex items-center gap-1 text-[12px] text-[#9da1a6] ${align === "center" ? "justify-center" : ""}`}>
        <Tag size={13} /> {product.designer}
      </p>
      <h2 className="mt-3 max-w-64 truncate font-serif text-base uppercase tracking-[0.02em] text-[#252a31]">
        {product.name}
      </h2>
      <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#8a9096]">
        {product.color} / {product.size}
      </p>
      <div className="mt-4 text-base">
        {product.compareAt ? (
          <span className="mr-2 text-[#969696] line-through">{formatMoney(product.compareAt)}</span>
        ) : null}
        <span className="font-serif text-lg text-[#aa9737]">{formatMoney(product.price)}</span>
      </div>
    </div>
  );
}

function Pagination({
  currentPage,
  onPageChange,
  pageCount,
}: {
  currentPage: number;
  onPageChange: (page: number) => void;
  pageCount: number;
}) {
  return (
    <div className="border-b border-[#e8e8e8] pb-14 pt-8">
      <div className="flex justify-center gap-4 text-sm">
        {Array.from({ length: pageCount }).map((_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              aria-current={currentPage === pageNumber ? "page" : undefined}
              className={`grid h-9 min-w-9 cursor-pointer place-items-center transition hover:bg-[#aa9737] hover:text-white ${
                currentPage === pageNumber ? "bg-[#aa9737] text-white" : "text-[#252a31]"
              }`}
              onClick={() => onPageChange(pageNumber)}
              type="button"
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          aria-label="Next page"
          className="grid h-9 min-w-9 cursor-pointer place-items-center text-[#252a31] transition hover:bg-[#aa9737] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#252a31]"
          disabled={currentPage >= pageCount}
          onClick={() => onPageChange(Math.min(pageCount, currentPage + 1))}
          type="button"
        >
          -&gt;
        </button>
      </div>
    </div>
  );
}

function Newsletter() {
  return (
    <section className="bg-[#fbfaf7] px-4 py-14 text-center sm:px-6 sm:py-20">
      <h2 className="font-serif text-3xl font-bold uppercase text-[#aa9737]">Newsletter Sign Up</h2>
      <p className="mt-2 text-sm text-[#6d747c]">(Get 30% OFF coupon today subscribers)</p>
      <form className="mobile-friendly-form mx-auto mt-8 flex max-w-xl overflow-hidden rounded-full border border-[#ded5c2] bg-white shadow-[0_16px_40px_rgba(37,42,49,0.08)]" onSubmit={(event) => event.preventDefault()}>
        <input
          aria-label="Email address"
          className="min-w-0 flex-1 px-5 text-sm outline-none"
          placeholder="Your email address"
          type="email"
        />
        <button className="cursor-pointer bg-[#aa9737] px-8 text-[12px] font-bold uppercase text-white transition hover:bg-[#8d7b28]" type="submit">
          Subscribe
        </button>
      </form>
    </section>
  );
}

function BrandStrip({ brands }: { brands: string[] }) {
  return (
    <section className="px-4 pb-16 sm:px-6">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-0 border border-[#e5e5e5] bg-white text-center sm:grid-cols-3 lg:grid-cols-6">
        {brands.map((brand) => (
          <span
            key={brand}
            className="mobile-brand-tile border-b border-r border-[#e5e5e5] px-2 py-5 font-serif text-base font-bold uppercase tracking-[0.04em] text-[#6f6f6f] sm:py-8 sm:text-xl sm:tracking-[0.06em] lg:border-b-0"
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}

function Footer({ instagramImages }: { instagramImages: string[] }) {
  return (
    <footer className="bg-[#fbfaf7] px-4 pb-10 pt-10 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-8 border-b border-[#e8e8e8] pb-12 sm:gap-10 sm:pb-20 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="font-serif text-lg uppercase">Contact Info</h2>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-[#68717a]">
            <li className="flex gap-3"><MapPin className="mt-1 shrink-0" size={16} /> 123 Main Street, Anytown, CA 12345 - USA.</li>
            <li className="flex gap-3"><Phone className="mt-1 shrink-0" size={16} /> (+1)866-550-3669</li>
            <li className="flex gap-3"><Mail className="mt-1 shrink-0" size={16} /> yourmail@domain.com</li>
            <li>Working time: 9.00 - 21.00</li>
          </ul>
          <div className="mt-6 flex gap-4 text-sm font-bold text-[#444b52]">
            <span>f</span>
            <span>t</span>
            <span>yt</span>
            <span>G+</span>
            <span>ig</span>
          </div>
        </div>
        <FooterLinks title="Products" links={["Prices drop", "New products", "Best sales", "Stores", "Login", "My account"]} />
        <FooterLinks
          title="Our Company"
          links={["Delivery", "Legal Notice", "Terms and conditions of use", "About us", "Secure payment", "Contact us"]}
        />
        <div>
          <h2 className="font-serif text-lg uppercase">Instagram</h2>
          <div className="mt-6 grid grid-cols-3 gap-2">
            {instagramImages.map((image) => (
              <div key={image} className="relative aspect-square bg-[#f4f1ec]">
                <Image alt="" className="object-cover" fill loading="eager" sizes="86px" src={image} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-5 pt-8 text-xs text-[#68717a] sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Mugnee Multiple Limited. Made with care for modern commerce.</p>
        <div className="flex gap-1">
          {["PayPal", "VISA", "MC", "DISC", "2CO"].map((card) => (
            <span key={card} className="bg-[#aaa] px-2 py-1 text-[10px] font-bold text-white">
              {card}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({ title, links }: { title: string; links: string[] }) {
  const hrefByLabel: Record<string, string> = {
    "About us": "/about",
    "Best sales": "/shop",
    "Contact us": "/contact",
    Delivery: "/contact",
    Login: "/account",
    "My account": "/account",
    "New products": "/shop",
    "Prices drop": "/shop",
    "Secure payment": "/checkout",
    Stores: "/contact",
    "Terms and conditions of use": "/contact",
  };

  return (
    <div>
      <h2 className="font-serif text-lg uppercase">{title}</h2>
      <ul className="mt-6 list-disc space-y-2 pl-4 text-sm text-[#68717a]">
        {links.map((link) => (
          <li key={link}>
            <a className="transition hover:text-[#aa9737]" href={hrefByLabel[link] ?? "/shop"}>
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
