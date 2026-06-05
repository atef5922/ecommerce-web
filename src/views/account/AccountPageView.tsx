"use client";

import { LogIn, PackageCheck, ShoppingBasket, UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/views/shared/CartContext";
import { useCurrency } from "@/views/shared/CurrencyContext";

export function AccountPageView() {
  const { formatMoney } = useCurrency();
  const { itemCount, items, subtotal } = useCart();

  return (
    <main className="premium-shell min-h-screen text-[#252a31]">
      <div className="border-y border-[#eee7da] bg-white/70">
        <div className="mx-auto max-w-6xl px-4 py-6 text-[12px] text-[#7d8389] sm:px-6">
          Home <span className="mx-2">&gt;</span>
          <span className="text-[#a99734]">My Account</span>
        </div>
      </div>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:py-24">
        <div className="premium-card rounded-[22px] p-5 sm:rounded-[28px] sm:p-8">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-[#f5efdf] text-[#aa9737]">
            <UserCircle size={28} />
          </span>
          <h1 className="mt-5 font-serif text-2xl font-bold uppercase sm:text-3xl">My Account</h1>
          <p className="mt-3 text-sm leading-7 text-[#68717a]">
            Review your cart, continue shopping, or proceed to checkout. Sign-in is ready to connect when an auth
            service is added.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#252a31] px-6 text-[12px] font-bold uppercase text-white hover:bg-[#aa9737]"
              href="/shop"
            >
              <ShoppingBasket size={16} /> Shop
            </Link>
            <Link
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#d6ccb8] bg-white px-6 text-[12px] font-bold uppercase text-[#5a5147] hover:border-[#aa9737] hover:text-[#aa9737]"
              href="/checkout"
            >
              <LogIn size={16} /> Checkout
            </Link>
          </div>
        </div>

        <aside className="premium-card rounded-[22px] p-5 sm:rounded-[28px] sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-serif text-xl font-bold uppercase sm:text-2xl">Cart Summary</h2>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#f5efdf] px-4 py-2 text-[12px] font-bold text-[#7d6d20]">
              <PackageCheck size={15} /> {itemCount} items
            </span>
          </div>

          {items.length > 0 ? (
            <div className="mt-6 divide-y divide-[#eeeeee]">
              {items.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-4">
                  <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-2xl bg-[#f7f7f7]">
                    <Image alt={item.name} className="object-contain" fill sizes="56px" src={item.image} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-serif text-sm uppercase">{item.name}</h3>
                    <p className="mt-1 text-xs text-[#68717a]">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-serif text-sm text-[#aa9737]">{formatMoney(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm leading-7 text-[#68717a]">Your cart is empty.</p>
          )}

          <div className="mt-6 flex items-center justify-between border-t border-[#e5e5e5] pt-5 font-serif text-xl font-bold">
            <span>Total</span>
            <span className="text-[#aa9737]">{formatMoney(subtotal)}</span>
          </div>
          <Link
            className="mt-7 inline-flex h-11 w-full items-center justify-center rounded-full bg-[#aa9737] px-7 text-[12px] font-bold uppercase text-white hover:bg-[#8d7b28] sm:w-auto"
            href="/cart"
          >
            View Cart
          </Link>
        </aside>
      </section>
    </main>
  );
}
