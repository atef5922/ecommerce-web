"use client";

import { Mail, MapPin, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/views/shared/CartContext";
import { useCurrency } from "@/views/shared/CurrencyContext";

type Props = {
  brandMarks: string[];
  instagramImages: string[];
};

export function CartPageView({ brandMarks, instagramImages }: Props) {
  const router = useRouter();
  const { formatMoney } = useCurrency();
  const { items, removeFromCart, subtotal, updateQuantity } = useCart();

  return (
    <main className="premium-shell min-h-screen text-[#252a31]">
      <Breadcrumb />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-28">
        {items.length > 0 ? (
          <>
            <div className="premium-card hidden overflow-hidden rounded-[28px] lg:block">
              <table className="w-full table-fixed border-collapse text-center font-serif text-sm text-[#5c6570]">
                <thead>
                  <tr className="h-20 border-b border-[#e5e5e5]">
                    <th className="w-[16%] border-r border-[#e5e5e5] font-bold">Image</th>
                    <th className="w-[31%] border-r border-[#e5e5e5] font-bold">Product</th>
                    <th className="w-[15%] border-r border-[#e5e5e5] font-bold">Price</th>
                    <th className="w-[20%] border-r border-[#e5e5e5] font-bold">Quantity</th>
                    <th className="w-[13%] border-r border-[#e5e5e5] font-bold">Total</th>
                    <th className="w-[13%] font-bold">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="h-72 border-b border-[#e5e5e5] bg-white/70 last:border-b-0 hover:bg-[#fffdf8]">
                      <td className="border-r border-[#e5e5e5]">
                        <div className="relative mx-auto h-44 w-24 overflow-hidden rounded-2xl bg-[#fbfaf7]">
                          <Image alt={item.name} className="object-contain" fill sizes="96px" src={item.image} />
                        </div>
                      </td>
                      <td className="border-r border-[#e5e5e5]">{item.name}</td>
                      <td className="border-r border-[#e5e5e5]">{formatMoney(item.price)}</td>
                      <td className="border-r border-[#e5e5e5]">
                        <input
                          aria-label={`Quantity for ${item.name}`}
                          className="h-10 w-16 rounded-xl bg-[#f0eee9] px-3 text-left outline-none focus:ring-1 focus:ring-[#aa9737]"
                          min={1}
                          onChange={(event) => updateQuantity(item.id, Number(event.target.value))}
                          type="number"
                          value={item.quantity}
                        />
                      </td>
                      <td className="border-r border-[#e5e5e5] font-bold">{formatMoney(item.price * item.quantity)}</td>
                      <td>
                        <button
                          aria-label={`Remove ${item.name}`}
                          className="inline-grid h-9 w-9 place-items-center text-[#8a8a8a] transition hover:text-[#aa9737]"
                          onClick={() => removeFromCart(item.id)}
                          type="button"
                        >
                          <X size={18} strokeWidth={3} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-5 lg:hidden">
              {items.map((item) => (
                <article key={item.id} className="premium-card grid gap-4 rounded-[24px] p-4 sm:grid-cols-[120px_1fr]">
                  <div className="relative mx-auto aspect-square w-32 overflow-hidden rounded-2xl bg-[#f8f8f8]">
                    <Image alt={item.name} className="object-contain" fill sizes="128px" src={item.image} />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg text-[#252a31]">{item.name}</h2>
                    <p className="mt-1 text-sm text-[#68717a]">{item.designer}</p>
                    <p className="mt-4 text-sm">Price: {formatMoney(item.price)}</p>
                    <label className="mt-3 flex items-center gap-3 text-sm">
                      Quantity
                      <input
                        className="h-10 w-16 rounded-xl bg-[#f0eee9] px-3 outline-none focus:ring-1 focus:ring-[#aa9737]"
                        min={1}
                        onChange={(event) => updateQuantity(item.id, Number(event.target.value))}
                        type="number"
                        value={item.quantity}
                      />
                    </label>
                    <p className="mt-3 font-bold text-[#aa9737]">Total: {formatMoney(item.price * item.quantity)}</p>
                    <button
                      className="mt-4 inline-flex items-center gap-2 text-[12px] font-bold uppercase text-[#68717a] transition hover:text-[#aa9737]"
                      onClick={() => removeFromCart(item.id)}
                      type="button"
                    >
                      <X size={15} /> Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-14 grid items-start gap-12 lg:grid-cols-[1fr_320px]">
              <div className="flex flex-wrap items-start gap-4">
                <button
                  className="inline-flex h-10 shrink-0 items-center justify-center bg-[#273241] px-5 text-[11px] font-bold uppercase leading-none text-white shadow-sm hover:-translate-y-0.5 hover:bg-[#aa9737]"
                  type="button"
                >
                  Update Cart
                </button>
                <Link
                  className="inline-flex h-10 shrink-0 items-center justify-center bg-[#273241] px-5 text-[11px] font-bold uppercase leading-none text-white shadow-sm hover:-translate-y-0.5 hover:bg-[#aa9737]"
                  href="/shop"
                >
                  Continue Shopping
                </Link>
              </div>
              <aside className="premium-card rounded-[28px] p-7 text-center lg:text-left">
                <h1 className="inline-block border-b-2 border-[#252a31] pb-1 font-serif text-3xl uppercase">
                  Cart Totals
                </h1>
                <div className="mx-auto mt-8 max-w-72 space-y-4 lg:mx-0">
                  <div className="flex justify-between text-[13px] font-bold uppercase">
                    <span>Subtotal</span>
                    <span className="text-[#aa9737]">{formatMoney(subtotal)}</span>
                  </div>
                  <div className="flex justify-between font-serif text-xl font-bold uppercase">
                    <span>Total</span>
                    <span className="text-[#aa9737]">{formatMoney(subtotal)}</span>
                  </div>
                </div>
                <button
                  className="premium-button mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[#aa9737] px-9 font-serif text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#8d7b28]"
                  onClick={() => router.push("/checkout")}
                  type="button"
                >
                  Proceed to Checkout
                </button>
              </aside>
            </div>
          </>
        ) : (
          <div className="premium-card mx-auto max-w-xl rounded-[28px] px-6 py-14 text-center">
            <h1 className="font-serif text-3xl uppercase">Your Cart Is Empty</h1>
            <p className="mt-4 text-sm leading-7 text-[#68717a]">Add a product from the shop to see it here.</p>
            <Link className="mt-7 inline-flex bg-[#aa9737] px-8 py-3 text-[12px] font-bold uppercase text-white" href="/shop">
              Continue Shopping
            </Link>
          </div>
        )}
      </section>
      <Newsletter />
      <BrandStrip brands={brandMarks} />
      <Footer instagramImages={instagramImages} />
    </main>
  );
}

function Breadcrumb() {
  return (
    <div className="border-y border-[#ededed] bg-[#f7f7f7]">
      <div className="mx-auto max-w-6xl px-4 py-6 text-[12px] text-[#7d8389] sm:px-6">
        Home <span className="mx-2">&gt;</span>
        <span className="text-[#a99734]">Cart</span>
      </div>
    </div>
  );
}

function Newsletter() {
  return (
    <section className="bg-[#fbfaf7] px-4 py-16 text-center sm:px-6">
      <h2 className="font-serif text-3xl font-bold uppercase text-[#aa9737]">Newsletter Sign Up</h2>
      <p className="mt-2 text-sm text-[#6d747c]">(Get 30% OFF coupon today subscribers)</p>
      <form className="mx-auto mt-8 flex max-w-xl overflow-hidden rounded-full border border-[#ded5c2] bg-white shadow-[0_16px_40px_rgba(37,42,49,0.08)]">
        <input aria-label="Email address" className="min-w-0 flex-1 px-5 text-sm outline-none" placeholder="Your email address" type="email" />
        <button className="bg-[#aa9737] px-8 text-[12px] font-bold uppercase text-white" type="submit">Subscribe</button>
      </form>
    </section>
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
            <li>Working time: 9.00 - 21.00</li>
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
      <div className="mx-auto flex max-w-6xl flex-col gap-5 pt-8 text-xs text-[#68717a] sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Mugnee Multiple Limited. Made with care for modern commerce.</p>
        <div className="flex gap-1">
          {["PayPal", "VISA", "MC", "DISC", "2CO"].map((card) => (
            <span key={card} className="bg-[#aaa] px-2 py-1 text-[10px] font-bold text-white">{card}</span>
          ))}
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
