"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgePercent,
  ChevronDown,
  CreditCard,
  Crown,
  Droplets,
  Gift,
  Home,
  Info,
  Layers,
  LogIn,
  Mail,
  Menu,
  MessageCircle,
  Newspaper,
  Phone,
  ShieldCheck,
  Search,
  ShoppingBasket,
  Sparkles,
  Store,
  Truck,
  UserCircle,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CurrencyCode, NavItem } from "@/models/ecommerce";
import { currencies } from "@/services/currency-service";
import { searchSite } from "@/services/site-search-service";
import { CartProvider, useCart } from "./CartContext";
import { CurrencyProvider, useCurrency } from "./CurrencyContext";

const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Features", href: "/shop" },
];

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "Twitter", href: "https://twitter.com", icon: "twitter" },
  { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
  { label: "Google", href: "https://google.com", icon: "google" },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
] as const;

const mobileNavigation = [
  { label: "Home", href: "/", icon: Home },
  { label: "Shop", href: "/shop", icon: Store },
  { label: "Blog", href: "/blog", icon: Newspaper },
  { label: "About Us", href: "/about", icon: Info },
  { label: "Contact", href: "/contact", icon: MessageCircle },
];

const megaMenuCollections = [
  { label: "New Arrivals", description: "Fresh fashion and beauty drops", href: "/shop", icon: Sparkles },
  { label: "Premium Skincare", description: "Essences, creams, masks, toner", href: "/shop", icon: Droplets },
  { label: "Style Essentials", description: "Shirts, tees, knits, resort edits", href: "/shop", icon: Layers },
  { label: "Gift Sets", description: "Curated boxes for polished gifting", href: "/shop", icon: Gift },
] as const;

const megaMenuHighlights = [
  { label: "Free shipping over $59", href: "/contact", icon: Truck },
  { label: "Limited monthly deals", href: "/shop", icon: BadgePercent },
  { label: "Verified premium quality", href: "/about", icon: ShieldCheck },
] as const;

const megaMenuQuickLinks = [
  { label: "Featured Products", href: "/shop" },
  { label: "Best Sellers", href: "/shop" },
  { label: "Beauty Rituals", href: "/blog" },
  { label: "Support Center", href: "/contact" },
] as const;

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <CurrencyProvider>
      <CartProvider>
        <SharedHeader />
        {children}
      </CartProvider>
    </CurrencyProvider>
  );
}

function SharedHeader() {
  const [accountOpen, setAccountOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { currency, formatMoney, setCurrency } = useCurrency();
  const { itemCount, subtotal } = useCart();
  const searchResults = useMemo(() => searchSite(query), [query]);
  const closeTransientPanels = () => {
    setAccountOpen(false);
    setMenuOpen(false);
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#eee7da]/80 bg-white/90 shadow-[0_12px_38px_rgba(37,42,49,0.06)] backdrop-blur-xl">
      <div className="hidden border-b border-[#eee7da] bg-[#fbfaf7] text-[12px] text-[#46505a] lg:block">
        <div className="mx-auto flex h-10 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <Phone size={14} /> Call Us : (012) 800 456 789
            </span>
            <span className="inline-flex items-center gap-2">
              <Mail size={14} /> Email : Demo@Example.Com
            </span>
            <SocialLinks />
          </div>
          <div className="flex items-center gap-5">
            <div className="relative">
              <button
                aria-expanded={accountOpen}
                className="inline-flex cursor-pointer items-center gap-1 rounded-full px-2 py-1 transition hover:bg-white hover:text-[#aa9737]"
                onClick={() => setAccountOpen((open) => !open)}
                type="button"
              >
                <UserCircle size={14} /> My Account <ChevronDown size={12} />
              </button>
              {accountOpen ? <AccountMenu onNavigate={closeTransientPanels} /> : null}
            </div>
            <CurrencySelect currency={currency} setCurrency={setCurrency} />
          </div>
        </div>
      </div>
      <div>
        <div className="mx-auto flex min-h-18 max-w-6xl flex-nowrap items-center justify-between gap-2 px-3 py-3 sm:min-h-20 sm:gap-3 sm:px-6 sm:py-4">
          <Link className="group flex min-w-0 items-center gap-2 sm:gap-3" href="/">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[#b29d3a]/70 bg-[#f8f3e5] font-serif text-xl italic text-[#a99632] shadow-inner transition group-hover:rotate-[-4deg] sm:h-12 sm:w-12 sm:text-2xl">
              M
            </span>
            <span className="min-w-0 font-serif text-[1.55rem] italic leading-none text-[#9d8a2b] sm:text-3xl">
              Mugnee
              <span className="block truncate font-sans text-[8px] not-italic uppercase tracking-[0.24em] text-[#8a8a8a] sm:text-[10px] sm:tracking-[0.3em]">
                Multiple Limited
              </span>
            </span>
          </Link>
          <nav className="hidden items-center rounded-full border border-[#eee7da] bg-white/80 p-1 text-[12px] font-bold uppercase tracking-[0.08em] shadow-sm lg:flex">
            {navigation.map((item) =>
              item.label === "Features" ? (
                <div className="group relative" key={item.label}>
                  <Link
                    aria-haspopup="true"
                    className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-[#2d3238] transition hover:bg-[#f5efdf] hover:text-[#a99734] focus:bg-[#f5efdf] focus:text-[#a99734]"
                    href={item.href}
                    onClick={closeTransientPanels}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className="transition duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
                      size={13}
                    />
                  </Link>
                  <span className="absolute right-0 top-full hidden h-4 w-64 group-hover:block group-focus-within:block" />
                  <MegaMenu onNavigate={closeTransientPanels} />
                </div>
              ) : (
                <Link
                  key={item.label}
                  className="rounded-full px-4 py-2 text-[#2d3238] transition hover:bg-[#f5efdf] hover:text-[#a99734]"
                  href={item.href}
                  onClick={closeTransientPanels}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
          <div className="flex shrink-0 items-center gap-1.5 text-[#343a40] sm:gap-3">
            <button
              aria-expanded={searchOpen}
              aria-label="Search"
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-[#eee7da] bg-white transition hover:border-[#aa9737] hover:text-[#aa9737] hover:shadow-md"
              onClick={() => setSearchOpen((open) => !open)}
              title="Search"
              type="button"
            >
              {searchOpen ? <X size={19} /> : <Search size={19} />}
            </button>
            <Link
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#eee7da] bg-white text-[12px] font-bold shadow-sm hover:border-[#aa9737] hover:text-[#aa9737] sm:h-auto sm:w-auto sm:justify-start sm:gap-2 sm:px-4 sm:py-2"
              href="/cart"
              onClick={closeTransientPanels}
              aria-label={`Cart with ${itemCount} items`}
            >
              <span className="relative grid h-8 w-8 place-items-center rounded-full bg-[#f5efdf]">
                <ShoppingBasket className="text-[#a99734]" size={17} />
                {itemCount > 0 ? (
                  <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#252a31] px-1 text-[9px] text-white">
                    {itemCount}
                  </span>
                ) : null}
              </span>
              <span className="hidden sm:inline">Cart ({itemCount}) - {formatMoney(subtotal)}</span>
            </Link>
            <div className="hidden sm:block lg:hidden">
              <CurrencySelect currency={currency} setCurrency={setCurrency} compact />
            </div>
            <button
              aria-expanded={menuOpen}
              aria-label="Menu"
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-[#eee7da] bg-white transition hover:border-[#aa9737] hover:text-[#aa9737] lg:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              title="Menu"
              type="button"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {searchOpen ? (
          <SearchPanel
            onNavigate={closeTransientPanels}
            query={query}
            results={searchResults}
            setQuery={setQuery}
          />
        ) : null}
      </div>
      {menuOpen ? (
        <div className="border-t border-[#eee7da] bg-white px-3 py-4 shadow-[0_22px_45px_rgba(37,42,49,0.1)] lg:hidden">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-[24px] border border-[#eee7da] bg-[#fbfaf7] p-3">
              <nav className="grid grid-cols-2 gap-2 text-[12px] font-bold uppercase tracking-[0.08em]">
                {mobileNavigation.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.label}
                      className="flex min-h-12 items-center gap-2 rounded-2xl border border-[#eee7da] bg-white px-3 text-[#2d3238] shadow-sm transition hover:border-[#aa9737] hover:text-[#a99734]"
                      href={item.href}
                      onClick={closeTransientPanels}
                    >
                      <Icon className="shrink-0 text-[#a99734]" size={16} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <MobileMegaMenu onNavigate={closeTransientPanels} />

              <div className="mt-3 grid gap-2 border-t border-[#eee7da] pt-3 text-[12px] font-bold uppercase tracking-[0.08em] sm:grid-cols-2">
                <Link
                  className="flex min-h-11 items-center gap-2 rounded-2xl bg-[#252a31] px-3 text-white transition hover:bg-[#aa9737]"
                  href="/account"
                  onClick={closeTransientPanels}
                >
                  <UserCircle size={16} /> My Account
                </Link>
                <Link
                  className="flex min-h-11 items-center gap-2 rounded-2xl border border-[#d8cfbd] bg-white px-3 text-[#4f5962] transition hover:border-[#aa9737] hover:text-[#aa9737]"
                  href="/checkout"
                  onClick={closeTransientPanels}
                >
                  <CreditCard size={16} /> Checkout
                </Link>
                <Link
                  className="flex min-h-11 items-center gap-2 rounded-2xl border border-[#d8cfbd] bg-white px-3 text-[#4f5962] transition hover:border-[#aa9737] hover:text-[#aa9737]"
                  href="/account"
                  onClick={closeTransientPanels}
                >
                  <LogIn size={16} /> Sign In
                </Link>
                <Link
                  className="flex min-h-11 items-center justify-between gap-2 rounded-2xl border border-[#d8cfbd] bg-white px-3 text-[#4f5962] transition hover:border-[#aa9737] hover:text-[#aa9737]"
                  href="/cart"
                  onClick={closeTransientPanels}
                >
                  <span className="inline-flex items-center gap-2">
                    <ShoppingBasket size={16} /> Cart
                  </span>
                  <span className="text-[#aa9737]">{itemCount}</span>
                </Link>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#eee7da] pt-3">
                <div className="flex items-center gap-2 text-[12px] text-[#68717a]">
                  <Phone size={14} />
                  <span>(012) 800 456 789</span>
                </div>
                <CurrencySelect currency={currency} setCurrency={setCurrency} compact />
              </div>

              <div className="mt-3 flex items-center justify-between gap-3 border-t border-[#eee7da] pt-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8a8a8a]">Follow us</span>
                <SocialLinks compact />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="pointer-events-none absolute right-0 top-[calc(100%+0.85rem)] z-50 w-[min(92vw,940px)] origin-top-right translate-y-2 opacity-0 transition duration-300 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
      <div className="overflow-hidden rounded-[28px] border border-[#e8dfcf] bg-white shadow-[0_28px_80px_rgba(37,42,49,0.16)] ring-1 ring-white/80">
        <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr_0.72fr]">
          <div className="bg-[#fbfaf7] p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#008181]">Explore features</p>
                <h2 className="mt-1 font-serif text-2xl italic normal-case tracking-normal text-[#806618]">
                  Premium shopping paths
                </h2>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#252a31] text-white shadow-[0_12px_25px_rgba(37,42,49,0.18)]">
                <Crown size={18} />
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {megaMenuCollections.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    className="group/item flex min-h-[92px] items-start gap-3 rounded-[18px] border border-[#eee7da] bg-white p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#008181]/35 hover:shadow-[0_16px_36px_rgba(37,42,49,0.09)]"
                    href={item.href}
                    key={item.label}
                    onClick={onNavigate}
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#e8fff7] text-[#008181] transition group-hover/item:bg-[#008181] group-hover/item:text-white">
                      <Icon size={17} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[13px] font-black uppercase tracking-[0.08em] text-[#252a31]">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-[12px] font-medium normal-case leading-5 tracking-normal text-[#68717a]">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="border-l border-[#eee7da] bg-white p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#aa9737]">Shop smarter</p>
            <div className="mt-4 grid gap-3">
              {megaMenuHighlights.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    className="flex min-h-12 items-center gap-3 rounded-[16px] border border-[#f0eadf] px-3 text-[12px] font-black uppercase tracking-[0.08em] text-[#343a40] transition hover:border-[#aa9737] hover:bg-[#fbfaf7] hover:text-[#aa9737]"
                    href={item.href}
                    key={item.label}
                    onClick={onNavigate}
                  >
                    <Icon className="shrink-0 text-[#008181]" size={17} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
            <div className="mt-5 border-t border-[#eee7da] pt-4">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#8a8a8a]">Quick links</p>
              <div className="mt-3 grid gap-1">
                {megaMenuQuickLinks.map((item) => (
                  <Link
                    className="inline-flex items-center justify-between rounded-xl px-2 py-2 text-[13px] font-semibold normal-case tracking-normal text-[#4f5962] hover:bg-[#f8f6ee] hover:text-[#008181]"
                    href={item.href}
                    key={item.label}
                    onClick={onNavigate}
                  >
                    {item.label}
                    <ArrowRight size={14} />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            className="group/promo relative min-h-[320px] overflow-hidden bg-[#e9d9cf] text-white"
            href="/shop"
            onClick={onNavigate}
          >
            <Image
              alt="Premium Mugnee skincare and beauty products"
              className="h-full w-full object-cover opacity-[0.88] transition duration-500 group-hover/promo:scale-105"
              fill
              loading="eager"
              sizes="300px"
              src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=760&q=82"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e2227] via-[#1e2227]/44 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#f0d47a]">Limited edit</p>
              <h3 className="mt-2 font-serif text-2xl italic normal-case leading-7 tracking-normal">
                Glow care, style picks, and daily deals.
              </h3>
              <span className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[11px] font-black uppercase tracking-[0.12em] text-[#252a31]">
                Shop now <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileMegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <section className="mt-3 border-t border-[#eee7da] pt-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#008181]">Features</p>
        <Link
          className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-[0.12em] text-[#aa9737]"
          href="/shop"
          onClick={onNavigate}
        >
          View all <ArrowRight size={13} />
        </Link>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {megaMenuCollections.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              className="flex min-h-14 items-center gap-3 rounded-2xl border border-[#eee7da] bg-white px-3 py-2 text-[#2d3238] shadow-sm transition hover:border-[#008181] hover:text-[#008181]"
              href={item.href}
              key={item.label}
              onClick={onNavigate}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e8fff7] text-[#008181]">
                <Icon size={16} />
              </span>
              <span className="min-w-0">
                <span className="block text-[12px] font-black uppercase tracking-[0.08em]">{item.label}</span>
                <span className="block truncate text-[11px] font-medium normal-case tracking-normal text-[#68717a]">
                  {item.description}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function SearchPanel({
  onNavigate,
  query,
  results,
  setQuery,
}: {
  onNavigate: () => void;
  query: string;
  results: ReturnType<typeof searchSite>;
  setQuery: (query: string) => void;
}) {
  return (
    <div className="mx-auto max-w-6xl px-3 pb-3 sm:px-6">
      <form className="relative" onSubmit={(event) => event.preventDefault()}>
        <label className="sr-only" htmlFor="site-search">Search products and articles</label>
        <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#a99734]" size={17} />
        <input
          autoFocus
          id="site-search"
          className="h-12 w-full rounded-2xl border border-[#e7dfcf] bg-[#fbfaf7] pl-11 pr-4 text-sm shadow-inner outline-none transition focus:border-[#aa9737] focus:bg-white"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products, brands, categories, articles..."
          suppressHydrationWarning
          type="search"
          value={query}
        />
      </form>
      <div className="mt-3 overflow-hidden rounded-2xl border border-[#eee7da] bg-white shadow-[0_18px_45px_rgba(37,42,49,0.12)]">
        {results.length > 0 ? (
          results.map((result) => (
            <Link
              key={`${result.type}-${result.title}`}
              className="grid gap-1 border-b border-[#f1f1f1] px-4 py-3 text-sm transition last:border-b-0 hover:bg-[#f8f6ee] sm:grid-cols-[1fr_auto] sm:items-center sm:px-5 sm:py-4"
              href={result.href}
              onClick={onNavigate}
            >
              <span>
                <span className="block font-semibold text-[#252a31]">{result.title}</span>
                <span className="mt-0.5 block text-xs text-[#68717a]">{result.description}</span>
              </span>
              <span className="w-fit rounded-full bg-[#f5efdf] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#aa9737]">
                {result.type}
              </span>
            </Link>
          ))
        ) : (
          <p className="px-4 py-4 text-sm text-[#68717a]">
            No matching products or articles found. Try serum, cream, toner, mask, beauty, or Mugnee.
          </p>
        )}
      </div>
    </div>
  );
}

function SocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-center ${compact ? "gap-2" : "gap-2.5"}`}>
      {socialLinks.map((social) => (
        <a
          aria-label={social.label}
          className={`${compact ? "h-8 w-8" : "h-7 w-7"} grid place-items-center rounded-full border border-[#e4dccd] bg-white text-[#5f666d] transition hover:border-[#aa9737] hover:bg-[#f8f3e5] hover:text-[#aa9737]`}
          href={social.href}
          key={social.label}
          rel="noreferrer"
          target="_blank"
          title={social.label}
        >
          <SocialIcon name={social.icon} />
        </a>
      ))}
    </div>
  );
}

function SocialIcon({ name }: { name: (typeof socialLinks)[number]["icon"] }) {
  const commonProps = {
    "aria-hidden": true,
    className: "h-3.5 w-3.5",
    fill: "currentColor",
    viewBox: "0 0 24 24",
  };

  if (name === "facebook") {
    return (
      <svg {...commonProps}>
        <path d="M14.2 8.1V6.7c0-.7.5-.9.9-.9h2.2V2.1L14.2 2c-3.5 0-4.3 2.6-4.3 4.3v1.8H7.1V12h2.8v10h4.1V12h3l.5-3.9h-3.3Z" />
      </svg>
    );
  }

  if (name === "twitter") {
    return (
      <svg {...commonProps}>
        <path d="M22 5.9c-.7.3-1.5.6-2.4.7.9-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.7 1A4.1 4.1 0 0 0 11.6 9c0 .3 0 .6.1.9A11.7 11.7 0 0 1 3.2 5.6a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4-.3.1-.7.1-1.1.1-.3 0-.5 0-.8-.1.5 1.7 2.1 2.9 3.9 2.9A8.3 8.3 0 0 1 2 19.2 11.7 11.7 0 0 0 8.3 21c7.6 0 11.8-6.3 11.8-11.8v-.5c.8-.6 1.5-1.3 1.9-2.2Z" />
      </svg>
    );
  }

  if (name === "youtube") {
    return (
      <svg {...commonProps}>
        <path d="M21.6 7.2s-.2-1.5-.8-2.1c-.8-.8-1.6-.8-2-.9C16 4 12 4 12 4s-4 0-6.8.2c-.4.1-1.2.1-2 .9-.6.6-.8 2.1-.8 2.1S2.2 9 2.2 10.7v1.6c0 1.7.2 3.5.2 3.5s.2 1.5.8 2.1c.8.8 1.8.8 2.2.9 1.6.1 6.6.2 6.6.2s4 0 6.8-.2c.4-.1 1.2-.1 2-.9.6-.6.8-2.1.8-2.1s.2-1.8.2-3.5v-1.6c0-1.7-.2-3.5-.2-3.5ZM10.1 14.3V8.2l5.7 3.1-5.7 3Z" />
      </svg>
    );
  }

  if (name === "google") {
    return (
      <svg {...commonProps}>
        <path d="M21.8 12.2c0-.7-.1-1.3-.2-1.9h-9.4v3.6h5.4a4.7 4.7 0 0 1-2 3.1v2.6h3.2c1.9-1.8 3-4.3 3-7.4Z" />
        <path d="M12.2 22c2.7 0 5-1 6.6-2.5L15.6 17a6 6 0 0 1-8.9-3.2H3.4v2.6A10 10 0 0 0 12.2 22Z" />
        <path d="M6.7 13.8a6 6 0 0 1 0-3.6V7.6H3.4a10 10 0 0 0 0 8.8l3.3-2.6Z" />
        <path d="M12.2 6a5.4 5.4 0 0 1 3.8 1.5l2.9-2.9A9.7 9.7 0 0 0 12.2 2a10 10 0 0 0-8.8 5.6l3.3 2.6A6 6 0 0 1 12.2 6Z" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Z" />
      <path d="M12 7.3A4.7 4.7 0 1 1 12 16.7 4.7 4.7 0 0 1 12 7.3Zm0 2A2.7 2.7 0 1 0 12 14.7 2.7 2.7 0 0 0 12 9.3Z" />
      <path d="M17.1 6.7a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z" />
    </svg>
  );
}

function AccountMenu({ onNavigate }: { onNavigate: () => void }) {
  const links = [
    { href: "/account", label: "My Account" },
    { href: "/checkout", label: "Checkout" },
    { href: "/account", label: "Sign In" },
  ];

  return (
    <div className="absolute right-0 top-8 z-50 w-48 overflow-hidden rounded-2xl border border-[#eee7da] bg-white py-2 shadow-[0_18px_45px_rgba(37,42,49,0.12)]">
      {links.map((item) => (
        <Link
          key={item.label}
          className="block px-4 py-3 text-sm transition hover:bg-[#f8f6ee] hover:text-[#aa9737]"
          href={item.href}
          onClick={onNavigate}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

function CurrencySelect({
  compact = false,
  currency,
  setCurrency,
}: {
  compact?: boolean;
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
}) {
  return (
    <label className="inline-flex items-center gap-1 text-[12px]">
      <span className={compact ? "sr-only" : ""}>Currency</span>
      <select
        aria-label="Currency"
        className="cursor-pointer rounded-full bg-transparent px-2 py-1 text-[12px] font-semibold outline-none transition hover:bg-white hover:text-[#aa9737]"
        onChange={(event) => setCurrency(event.target.value as CurrencyCode)}
        value={currency}
      >
        {currencies.map((option) => (
          <option key={option.code} value={option.code}>
            {option.code}
          </option>
        ))}
      </select>
    </label>
  );
}
