"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  Mail,
  Menu,
  Phone,
  Search,
  ShoppingBasket,
  UserCircle,
  X,
} from "lucide-react";
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
            <span className="flex items-center gap-3 text-xs font-bold text-[#60676f]">
              <span>f</span>
              <span>t</span>
              <span>yt</span>
              <span>G+</span>
              <span>ig</span>
            </span>
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
        <div className="mx-auto flex min-h-20 max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:flex-nowrap">
          <Link className="group flex items-center gap-3" href="/">
            <span className="grid h-12 w-12 place-items-center rounded-2xl border border-[#b29d3a]/70 bg-[#f8f3e5] font-serif text-2xl italic text-[#a99632] shadow-inner transition group-hover:rotate-[-4deg]">
              M
            </span>
            <span className="font-serif text-3xl italic leading-none text-[#9d8a2b]">
              Mugnee
              <span className="block font-sans text-[10px] not-italic uppercase tracking-[0.3em] text-[#8a8a8a]">
                Multiple Limited
              </span>
            </span>
          </Link>
          <nav className="hidden items-center rounded-full border border-[#eee7da] bg-white/80 p-1 text-[12px] font-bold uppercase tracking-[0.08em] shadow-sm lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.label}
                className="rounded-full px-4 py-2 text-[#2d3238] transition hover:bg-[#f5efdf] hover:text-[#a99734]"
                href={item.href}
                onClick={closeTransientPanels}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 text-[#343a40] sm:gap-3">
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
              className="hidden items-center gap-2 rounded-full border border-[#eee7da] bg-white px-4 py-2 text-[12px] font-bold shadow-sm hover:border-[#aa9737] hover:text-[#aa9737] sm:inline-flex"
              href="/cart"
              onClick={closeTransientPanels}
            >
              <span className="relative grid h-8 w-8 place-items-center rounded-full bg-[#f5efdf]">
                <ShoppingBasket className="text-[#a99734]" size={17} />
                {itemCount > 0 ? (
                  <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#252a31] px-1 text-[9px] text-white">
                    {itemCount}
                  </span>
                ) : null}
              </span>
              Cart ({itemCount}) - {formatMoney(subtotal)}
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
          {searchOpen ? (
            <SearchPanel
              onNavigate={closeTransientPanels}
              query={query}
              results={searchResults}
              setQuery={setQuery}
            />
          ) : null}
        </div>
      </div>
      {menuOpen ? (
        <div className="border-t border-[#eee7da] bg-white/95 px-4 py-4 shadow-lg lg:hidden">
          <nav className="mx-auto grid max-w-6xl gap-2 text-sm font-bold uppercase tracking-[0.08em]">
            {navigation.map((item) => (
              <Link
                key={item.label}
                className="rounded-xl px-3 py-3 transition hover:bg-[#f7f1e3] hover:text-[#a99734]"
                href={item.href}
                onClick={closeTransientPanels}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-wrap items-center gap-4 border-t border-[#eeeeee] pt-4 text-xs">
              <Link href="#" onClick={closeTransientPanels}>My Account</Link>
              <Link href="/checkout" onClick={closeTransientPanels}>Checkout</Link>
              <Link href="#" onClick={closeTransientPanels}>Sign In</Link>
              <Link href="/cart" onClick={closeTransientPanels}>Cart ({itemCount})</Link>
              <CurrencySelect currency={currency} setCurrency={setCurrency} compact />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
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
    <div className="basis-full">
      <form className="relative" onSubmit={(event) => event.preventDefault()}>
        <label className="sr-only" htmlFor="site-search">Search website</label>
        <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#a99734]" size={17} />
        <input
          autoFocus
          id="site-search"
          className="h-12 w-full rounded-2xl border border-[#e7dfcf] bg-[#fbfaf7] pl-11 pr-4 text-sm shadow-inner outline-none transition focus:border-[#aa9737] focus:bg-white"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products, pages, articles..."
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
              className="flex items-center justify-between border-b border-[#f1f1f1] px-5 py-4 text-sm transition last:border-b-0 hover:bg-[#f8f6ee]"
              href={result.href}
              onClick={onNavigate}
            >
              <span>{result.title}</span>
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#aa9737]">{result.type}</span>
            </Link>
          ))
        ) : (
          <p className="px-4 py-3 text-sm text-[#68717a]">No results found.</p>
        )}
      </div>
    </div>
  );
}

function AccountMenu({ onNavigate }: { onNavigate: () => void }) {
  const links = [
    { href: "#", label: "My Account" },
    { href: "/checkout", label: "Checkout" },
    { href: "#", label: "Sign In" },
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
