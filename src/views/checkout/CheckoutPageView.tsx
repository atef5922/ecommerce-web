"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/views/shared/CartContext";
import { useCurrency } from "@/views/shared/CurrencyContext";

type Props = {
  brandMarks: string[];
  instagramImages: string[];
};

export function CheckoutPageView({ brandMarks, instagramImages }: Props) {
  const { formatMoney } = useCurrency();
  const { items, subtotal } = useCart();

  return (
    <main className="premium-shell min-h-screen text-[#252a31]">
      <Breadcrumb />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_380px] lg:py-24">
        <form className="premium-card rounded-[28px] p-5 sm:p-8" onSubmit={(event) => event.preventDefault()}>
          <h1 className="font-serif text-3xl font-bold uppercase">Billing Details</h1>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Field label="First name" />
            <Field label="Last name" />
            <Field label="Email address" type="email" />
            <Field label="Phone" />
            <Field label="Country" />
            <Field label="Town / City" />
          </div>
          <label className="mt-4 block">
            <span className="sr-only">Address</span>
            <input className="h-12 w-full rounded-2xl bg-[#f5f5f5] px-4 text-sm outline-none focus:ring-1 focus:ring-[#aa9737]" placeholder="Street address" />
          </label>
          <textarea className="mt-4 min-h-36 w-full rounded-2xl bg-[#f5f5f5] px-4 py-4 text-sm outline-none focus:ring-1 focus:ring-[#aa9737]" placeholder="Order notes" />
          <button className="premium-button mt-6 rounded-full bg-[#aa9737] px-8 py-3 text-[12px] font-bold uppercase text-white transition hover:-translate-y-0.5 hover:bg-[#8d7b28]" type="submit">
            Place Order
          </button>
        </form>

        <aside className="premium-card h-fit rounded-[28px] p-5 sm:p-8">
          <h2 className="font-serif text-2xl font-bold uppercase">Your Order</h2>
          {items.length > 0 ? (
            <div className="mt-7 divide-y divide-[#eeeeee]">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 py-4">
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-2xl bg-[#f7f7f7]">
                    <Image alt={item.name} className="object-contain" fill sizes="64px" src={item.image} />
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
            <p className="mt-7 text-sm leading-7 text-[#68717a]">Your cart is empty.</p>
          )}
          <div className="mt-7 border-t border-[#e5e5e5] pt-5">
            <div className="flex justify-between text-[13px] font-bold uppercase">
              <span>Subtotal</span>
              <span className="text-[#aa9737]">{formatMoney(subtotal)}</span>
            </div>
            <div className="mt-4 flex justify-between font-serif text-xl font-bold uppercase">
              <span>Total</span>
              <span className="text-[#aa9737]">{formatMoney(subtotal)}</span>
            </div>
          </div>
          <Link className="mt-7 inline-flex text-[12px] font-bold uppercase text-[#aa9737]" href="/cart">
            Back to Cart
          </Link>
        </aside>
      </section>
      <BrandStrip brands={brandMarks} />
      <Footer instagramImages={instagramImages} />
    </main>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label>
      <span className="sr-only">{label}</span>
      <input className="h-12 w-full rounded-2xl bg-[#f5f5f5] px-4 text-sm outline-none focus:ring-1 focus:ring-[#aa9737]" placeholder={label} type={type} />
    </label>
  );
}

function Breadcrumb() {
  return (
    <div className="border-y border-[#ededed] bg-[#f7f7f7]">
      <div className="mx-auto max-w-6xl px-4 py-6 text-[12px] text-[#7d8389] sm:px-6">
        Home <span className="mx-2">&gt;</span>
        <span className="text-[#a99734]">Checkout</span>
      </div>
    </div>
  );
}

function BrandStrip({ brands }: { brands: string[] }) {
  return (
    <section className="px-4 pb-16 sm:px-6">
      <div className="mx-auto grid max-w-6xl grid-cols-2 border border-[#e5e5e5] bg-white text-center sm:grid-cols-3 lg:grid-cols-6">
        {brands.map((brand) => (
          <span key={brand} className="border-b border-r border-[#e5e5e5] py-8 font-serif text-xl font-bold uppercase tracking-[0.06em] text-[#6f6f6f] lg:border-b-0">
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
      <div className="mx-auto grid max-w-6xl gap-10 border-b border-[#e8e8e8] pb-20 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="font-serif text-lg uppercase">Contact Infor</h2>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-[#68717a]">
            <li className="flex gap-3"><MapPin className="mt-1 shrink-0" size={16} /> 123 Main Street, Anytown, CA 12345 - USA.</li>
            <li className="flex gap-3"><Phone className="mt-1 shrink-0" size={16} /> (+1)866-550-3669</li>
            <li className="flex gap-3"><Mail className="mt-1 shrink-0" size={16} /> yourmail@domain.com</li>
          </ul>
        </div>
        <FooterLinks title="Products" links={["Prices drop", "New products", "Best sales", "Stores", "Login", "My account"]} />
        <FooterLinks title="Our Company" links={["Delivery", "Legal Notice", "Terms and conditions of use", "About us", "Secure payment", "Contact us"]} />
        <div>
          <h2 className="font-serif text-lg uppercase">Instagram</h2>
          <div className="mt-6 grid grid-cols-3 gap-2">
            {instagramImages.map((image) => (
              <div key={image} className="relative aspect-square bg-[#f4f1ec]">
                <Image alt="" className="object-cover" fill sizes="86px" src={image} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h2 className="font-serif text-lg uppercase">{title}</h2>
      <ul className="mt-6 list-disc space-y-2 pl-4 text-sm text-[#68717a]">
        {links.map((link) => (
          <li key={link}><a className="transition hover:text-[#aa9737]" href="#">{link}</a></li>
        ))}
      </ul>
    </div>
  );
}
