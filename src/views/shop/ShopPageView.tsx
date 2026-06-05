"use client";

import { useMemo, useState } from "react";
import {
  Filter,
  Grid3X3,
  List,
  Mail,
  MapPin,
  Phone,
  SlidersHorizontal,
  Search,
  ShoppingBag,
  Star,
  Tag,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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

export function ShopPageView({ viewModel }: Props) {
  const maxCatalogPrice = useMemo(
    () => Math.max(10, Math.ceil(Math.max(...viewModel.products.map((product) => product.price), 0) / 10) * 10),
    [viewModel.products],
  );
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [draftMaxPrice, setDraftMaxPrice] = useState(maxCatalogPrice);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(maxCatalogPrice);
  const [sortMode, setSortMode] = useState<SortMode>("default");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);
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
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      const matchesColor = selectedColor ? product.color === selectedColor : true;
      const matchesSize = selectedSize ? product.size === selectedSize : true;
      const matchesPrice = product.price <= appliedMaxPrice;

      return matchesSearch && matchesCategory && matchesColor && matchesSize && matchesPrice;
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
  }, [appliedMaxPrice, query, selectedCategory, selectedColor, selectedSize, sortMode, viewModel.products]);

  const categoryFilters = useMemo(
    () =>
      Object.entries(
        viewModel.products.reduce<Record<string, number>>((counts, product) => {
          counts[product.category] = (counts[product.category] ?? 0) + 1;
          return counts;
        }, {}),
      ).map(([label, count]) => ({ label, count })),
    [viewModel.products],
  );

  const pageSize = viewMode === "grid" ? 6 : 4;
  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pagedProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const activeFilters = [
    selectedCategory ? `Category: ${selectedCategory}` : null,
    selectedColor ? `Color: ${selectedColor}` : null,
    selectedSize ? `Size: ${selectedSize}` : null,
    appliedMaxPrice < maxCatalogPrice ? `Up to $${appliedMaxPrice}` : null,
    query.trim() ? `Search: ${query.trim()}` : null,
  ].filter(Boolean) as string[];

  function resetToFirstPage() {
    setPage(1);
  }

  function clearFilters() {
    setQuery("");
    setSelectedCategory(null);
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
      <section className="mx-auto grid max-w-6xl gap-5 px-3 py-7 sm:px-6 sm:py-16 lg:grid-cols-[265px_1fr] lg:gap-8 lg:py-24">
        <MobileFilterToggle activeFilterCount={activeFilters.length} filteredCount={filteredProducts.length} isOpen={filtersOpen} onToggle={() => setFiltersOpen((open) => !open)} />
        <ShopSidebar
          activeCategory={viewModel.activeCategory}
          activeFilterCount={activeFilters.length}
          categoryFilters={categoryFilters}
          colorFilters={viewModel.colorFilters}
          draftMaxPrice={draftMaxPrice}
          isOpen={filtersOpen}
          maxCatalogPrice={maxCatalogPrice}
          newProducts={viewModel.newProducts}
          onApplyPrice={() => {
            setAppliedMaxPrice(draftMaxPrice);
            setFiltersOpen(false);
            resetToFirstPage();
          }}
          onClearFilters={clearFilters}
          onClose={() => setFiltersOpen(false)}
          onSelectCategory={(category) => {
            setSelectedCategory((currentCategory) => (currentCategory === category ? null : category));
            resetToFirstPage();
          }}
          onSelectColor={(color) => {
            setSelectedColor((currentColor) => (currentColor === color ? null : color));
            resetToFirstPage();
          }}
          onSelectSize={(size) => {
            setSelectedSize((currentSize) => (currentSize === size ? null : size));
            resetToFirstPage();
          }}
          selectedCategory={selectedCategory}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          setDraftMaxPrice={setDraftMaxPrice}
          sizeFilters={viewModel.sizeFilters}
        />
        <Catalog
          activeFilters={activeFilters}
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
          onClearFilters={clearFilters}
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
    <div className="border-y border-[#edf3ee] bg-white/80">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="text-[12px] text-[#7d8389]">
          Home <span className="mx-2">&gt;</span> Catalog <span className="mx-2">&gt;</span>
          <span className="font-bold text-[#008181]">Shop</span>
        </div>
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#008181]">Mugnee catalog</p>
            <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-[#252a31] sm:text-4xl">Shop products by category</h1>
          </div>
          <p className="max-w-md text-sm leading-7 text-[#68717a]">
            Browse fashion, skincare, body care, and curated deals with live filters, sorting, and product details.
          </p>
        </div>
      </div>
    </div>
  );
}

function MobileFilterToggle({
  activeFilterCount,
  filteredCount,
  isOpen,
  onToggle,
}: {
  activeFilterCount: number;
  filteredCount: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="lg:hidden">
      <button
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center justify-between rounded-2xl border border-[#cfe7d6] bg-white px-4 py-3 text-left shadow-[0_12px_28px_rgba(37,42,49,0.06)] transition hover:border-[#008181]"
        onClick={onToggle}
        type="button"
      >
        <span className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.08em] text-[#252a31]">
          <SlidersHorizontal size={17} className="text-[#008181]" />
          Filters
        </span>
        <span className="text-xs font-bold text-[#008181]">
          {activeFilterCount > 0 ? `${activeFilterCount} active` : `${filteredCount} items`}
        </span>
      </button>
    </div>
  );
}

function ShopSidebar({
  activeCategory,
  activeFilterCount,
  categoryFilters,
  colorFilters,
  draftMaxPrice,
  isOpen,
  maxCatalogPrice,
  newProducts,
  onApplyPrice,
  onClearFilters,
  onClose,
  onSelectCategory,
  onSelectColor,
  onSelectSize,
  selectedCategory,
  selectedColor,
  selectedSize,
  setDraftMaxPrice,
  sizeFilters,
}: {
  activeCategory: string;
  activeFilterCount: number;
  categoryFilters: FilterOption[];
  colorFilters: FilterOption[];
  draftMaxPrice: number;
  isOpen: boolean;
  maxCatalogPrice: number;
  newProducts: ShopProduct[];
  onApplyPrice: () => void;
  onClearFilters: () => void;
  onClose: () => void;
  onSelectCategory: (category: string) => void;
  onSelectColor: (color: string) => void;
  onSelectSize: (size: string) => void;
  selectedCategory: string | null;
  selectedColor: string | null;
  selectedSize: string | null;
  setDraftMaxPrice: (price: number) => void;
  sizeFilters: FilterOption[];
}) {
  const { formatMoney } = useCurrency();

  return (
    <aside className={`${isOpen ? "block" : "hidden"} premium-card h-fit space-y-4 rounded-[20px] p-3 sm:rounded-[26px] sm:p-5 lg:sticky lg:top-28 lg:block lg:space-y-5`}>
      <div className="rounded-2xl bg-[#252a31] px-4 py-4 text-sm font-bold text-white sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-3">
            <SlidersHorizontal size={15} /> {activeCategory}
          </span>
          <button
            aria-label="Close filters"
            className="grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 lg:hidden"
            onClick={onClose}
            type="button"
          >
            <X size={15} />
          </button>
        </div>
        <p className="mt-2 text-xs font-normal text-white/70">{activeFilterCount} active filter{activeFilterCount === 1 ? "" : "s"}</p>
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
            className="cursor-pointer rounded-full bg-[#008181] px-5 py-2 text-[11px] font-bold uppercase text-white transition hover:bg-[#006b6b]"
            onClick={onApplyPrice}
            type="button"
          >
            Filter
          </button>
        </div>
      </FilterPanel>
      <FilterPanel title="Category">
        <FilterList activeValue={selectedCategory} onSelect={onSelectCategory} options={categoryFilters} />
      </FilterPanel>
      <FilterPanel title="Color">
        <FilterList activeValue={selectedColor} onSelect={onSelectColor} options={colorFilters} />
      </FilterPanel>
      <FilterPanel title="Size">
        <FilterList activeValue={selectedSize} onSelect={onSelectSize} options={sizeFilters} />
      </FilterPanel>
      <button
        className="inline-flex cursor-pointer items-center gap-2 rounded-full px-1 py-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#008181] transition hover:text-[#006b6b]"
        onClick={onClearFilters}
        type="button"
      >
        <X size={13} /> Clear all filters
      </button>
      <section className="hidden lg:block">
        <h2 className="font-serif text-lg font-bold uppercase text-[#008181]">New Products</h2>
        <div className="mt-5 space-y-4">
          {newProducts.map((product) => (
            <Link key={product.id} className="grid grid-cols-[70px_1fr] gap-3 rounded-2xl border border-[#eef4ef] bg-white p-2 transition hover:border-[#bfe4c9]" href={`/product/${product.slug ?? product.id}`}>
              <div className="relative aspect-square overflow-hidden rounded-xl bg-[#f5f3ef]">
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
                <p className="mt-2 font-serif text-base font-bold text-[#008181]">{formatMoney(product.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </aside>
  );
}

function FilterPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-[#edf3ee] bg-white p-3 sm:p-4">
      <h2 className="font-serif text-base font-bold text-[#252a31]">{title}</h2>
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
    <ul className="mt-3 max-h-56 space-y-1 overflow-auto pr-1 text-sm text-[#5a626b]">
      {options.map((option) => (
        <li key={option.label}>
          <button
            aria-pressed={activeValue === option.label}
            className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-left transition hover:bg-[#e8fff7] hover:text-[#008181] ${
              activeValue === option.label ? "bg-[#e8fff7] font-bold text-[#008181]" : ""
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
  activeFilters,
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
  onClearFilters,
}: {
  activeFilters: string[];
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
  onClearFilters: () => void;
}) {
  return (
    <section>
      <div className="rounded-[22px] border border-[#d8eadc] bg-white/90 px-4 py-4 shadow-[0_14px_34px_rgba(37,42,49,0.05)] sm:rounded-[26px] sm:px-6 sm:py-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#008181]">Catalog results</p>
            <h2 className="mt-1 font-serif text-xl font-bold tracking-[0.02em] sm:text-2xl">{activeCategory}</h2>
          </div>
          <span className="w-fit rounded-full bg-[#e8fff7] px-4 py-2 text-xs font-bold text-[#008181]">
            {filteredCount} of {totalCount} products
          </span>
        </div>
      </div>
      <div className="mt-4 grid gap-3 rounded-[22px] border border-[#d8eadc] bg-white/90 p-3 shadow-sm md:flex-row md:items-center md:justify-between md:rounded-[26px] lg:flex lg:p-4">
        <div className="flex items-center justify-between gap-3 sm:justify-start sm:gap-6">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              aria-label="Grid view"
              aria-pressed={viewMode === "grid"}
              className={`grid h-10 w-10 cursor-pointer place-items-center rounded-full border transition hover:border-[#008181] hover:text-[#008181] ${viewMode === "grid" ? "border-[#008181] bg-[#e8fff7] text-[#008181]" : "border-[#e5e5e5] text-[#252a31]"}`}
              onClick={() => onViewModeChange("grid")}
              title="Grid view"
              type="button"
            >
              <Grid3X3 size={22} />
            </button>
            <button
              aria-label="List view"
              aria-pressed={viewMode === "list"}
              className={`grid h-10 w-10 cursor-pointer place-items-center rounded-full border transition hover:border-[#008181] hover:text-[#008181] ${viewMode === "list" ? "border-[#008181] bg-[#e8fff7] text-[#008181]" : "border-[#e5e5e5] text-[#252a31]"}`}
              onClick={() => onViewModeChange("list")}
              title="List view"
              type="button"
            >
              <List size={24} />
            </button>
          </div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold text-[#5f666d] sm:text-sm">
            <Filter size={15} className="text-[#008181]" /> Showing {filteredCount} results
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto] lg:flex lg:items-center">
          <label className="relative block">
            <span className="sr-only">Search products</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9ba0a6]" size={15} />
            <input
              className="h-11 w-full rounded-full border border-[#d9e7df] bg-white pl-9 pr-4 text-sm outline-none transition focus:border-[#008181] lg:w-56"
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search products..."
              type="search"
              value={searchQuery}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center">
            <span className="sr-only sm:not-sr-only">Sort By :</span>
            <select
              className="h-11 w-full cursor-pointer rounded-full border border-[#d9e7df] bg-white px-4 text-sm text-[#6c737c] outline-none transition focus:border-[#008181] sm:w-auto"
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
      {activeFilters.length > 0 ? (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {activeFilters.map((filter) => (
            <span key={filter} className="rounded-full border border-[#cfe7d6] bg-[#e8fff7] px-3 py-1.5 text-xs font-bold text-[#008181]">
              {filter}
            </span>
          ))}
          <button className="rounded-full px-3 py-1.5 text-xs font-bold text-[#68717a] hover:bg-white hover:text-[#008181]" onClick={onClearFilters} type="button">
            Clear all
          </button>
        </div>
      ) : null}
      {products.length > 0 ? (
        <div className={viewMode === "grid" ? "grid grid-cols-2 gap-3 py-5 sm:gap-x-6 sm:gap-y-7 sm:py-8 md:grid-cols-2 xl:grid-cols-3" : "space-y-4 py-5 sm:space-y-6 sm:py-8"}>
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
  const productHref = `/product/${product.slug ?? product.id}`;

  function handleAddToCart() {
    addToCart(product);
    router.push("/cart");
  }

  return (
    <article className="group relative rounded-[18px] border border-[#bfe4c9] bg-white p-2 text-left shadow-[0_12px_28px_rgba(30,64,48,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#7fd29a] hover:shadow-[0_22px_55px_rgba(30,64,48,0.12)] sm:rounded-[22px] sm:p-3">
      <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-[14px] bg-[#f2f2f2] sm:rounded-[16px]">
        {product.badge && !product.badge.startsWith("-") ? (
          <span className="absolute left-2 top-2 z-20 rounded-full bg-[#9bc9b7] px-2 py-0.5 text-[9px] font-bold text-white sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[10px]">
            {product.badge}
          </span>
        ) : null}
        {product.compareAt ? (
          <span className="absolute right-2 top-2 z-20 rounded-full bg-[#9bd0ef] px-2 py-0.5 text-[9px] font-bold text-white sm:right-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[10px]">
            Sale
          </span>
        ) : null}
        <Link aria-label={`View ${product.name}`} href={productHref}>
          <Image
            alt={product.name}
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            fill
            loading="eager"
            sizes="(min-width: 1280px) 285px, (min-width: 640px) 42vw, 90vw"
            src={product.image}
          />
        </Link>
        <div className="absolute inset-0 grid place-items-center bg-white/0 opacity-0 transition duration-300 group-hover:bg-white/35 group-hover:opacity-100">
          <Link
            aria-label={`View ${product.name}`}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#e8fff7] px-3 text-[11px] font-bold text-[#008181] shadow-sm hover:bg-[#008181] hover:text-white sm:h-10 sm:gap-2 sm:px-4 sm:text-[12px]"
            href={productHref}
          >
            <Search size={15} /> Quick view
          </Link>
        </div>
        <div
          aria-label={`${product.rating} out of 5 stars`}
          className="absolute inset-x-0 bottom-4 z-20 flex translate-y-2 justify-center gap-0.5 text-white opacity-0 drop-shadow transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} size={20} fill={index < product.rating ? "currentColor" : "none"} />
          ))}
        </div>
      </div>
      <p className="mt-3 inline-flex max-w-full items-center gap-1 truncate text-[10px] text-[#9da1a6] sm:mt-4 sm:text-[12px]">
        <Tag className="shrink-0" size={13} /> {product.designer}
      </p>
      <Link className="mt-1.5 line-clamp-2 min-h-9 text-sm font-semibold leading-4 text-[#252a31] hover:text-[#008181] sm:mt-2 sm:min-h-11 sm:text-base sm:leading-5" href={productHref}>
        {product.name}
      </Link>
      <p className="mt-2 text-xs text-[#8a9096] sm:text-sm">
        {product.compareAt ? (
          <span className="mr-2 text-[#969696] line-through">{formatMoney(product.compareAt)}</span>
        ) : null}
        <span className="font-black text-[#008181]">{formatMoney(product.price)}</span>
      </p>
      <button
        className="mt-3 inline-flex h-9 w-full cursor-pointer items-center justify-center gap-1.5 rounded-full border border-[#bfe4c9] bg-[#eafff8] px-2 text-[10px] font-black uppercase text-[#008181] shadow-sm transition hover:bg-[#008181] hover:text-white sm:mt-4 sm:h-10 sm:gap-2 sm:px-5 sm:text-[12px]"
        onClick={handleAddToCart}
        type="button"
      >
        <ShoppingBag size={14} /> <span>Add</span><span className="hidden sm:inline"> to Cart</span>
      </button>
    </article>
  );
}

function ShopProductRow({ product }: { product: ShopProduct }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const productHref = `/product/${product.slug ?? product.id}`;

  function handleAddToCart() {
    addToCart(product);
    router.push("/cart");
  }

  return (
    <article className="premium-card group relative grid gap-5 rounded-[22px] p-4 sm:grid-cols-[180px_1fr] sm:p-5">
      <Link className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-[#f7f5f1]" href={productHref}>
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
      </Link>
      <div className="text-left">
        <ProductMeta align="left" product={product} />
        <p className="mt-4 max-w-xl text-sm leading-7 text-[#68717a]">
          {product.shortDescription ?? `${product.brand} pick in ${product.category}, available in ${product.color} and size ${product.size}.`}
        </p>
        <button
          className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#008181] px-5 py-2 text-[12px] font-bold uppercase text-white transition hover:bg-[#006b6b]"
          onClick={handleAddToCart}
          type="button"
        >
          <ShoppingBag size={15} /> Add to cart
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
        <span className="font-serif text-lg text-[#008181]">{formatMoney(product.price)}</span>
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
              className={`grid h-9 min-w-9 cursor-pointer place-items-center rounded-full transition hover:bg-[#008181] hover:text-white ${
                currentPage === pageNumber ? "bg-[#008181] text-white" : "text-[#252a31]"
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
          className="grid h-9 min-w-9 cursor-pointer place-items-center rounded-full text-[#252a31] transition hover:bg-[#008181] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#252a31]"
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
    <section className="bg-[#f6faf7] px-4 py-14 text-center sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl rounded-[28px] border border-[#d8eadc] bg-white px-5 py-10 shadow-[0_18px_48px_rgba(37,42,49,0.06)]">
        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#008181]">Newsletter sign up</p>
        <h2 className="mt-2 font-serif text-3xl italic text-[#856817]">Get new drops first</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#6f766f]">
          Receive new arrivals, skincare edits, and catalog deals in one simple note.
        </p>
        <form
          className="mobile-friendly-form mx-auto mt-8 flex max-w-xl overflow-hidden rounded-full border border-[#cfe7d6] bg-white shadow-[0_12px_30px_rgba(37,42,49,0.06)]"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            aria-label="Email address"
            className="min-w-0 flex-1 px-5 text-sm outline-none"
            placeholder="Your email address"
            type="email"
          />
          <button className="cursor-pointer bg-[#008181] px-8 text-[12px] font-bold uppercase text-white transition hover:bg-[#006b6b]" type="submit">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

function BrandStrip({ brands }: { brands: string[] }) {
  return (
    <section className="px-4 pb-16 sm:px-6">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 text-center sm:grid-cols-3 lg:grid-cols-6">
        {brands.map((brand) => (
          <span
            key={brand}
            className="mobile-brand-tile rounded-[14px] border border-[#d8eadc] bg-white px-2 py-5 font-serif text-base font-bold uppercase tracking-[0.04em] text-[#6f6f6f] transition hover:border-[#008181] hover:text-[#008181] sm:py-6 sm:text-lg"
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
