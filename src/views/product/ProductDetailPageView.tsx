"use client";

import { useMemo, useState } from "react";
import { Heart, Minus, Plus, ShoppingBag, Shuffle, Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/models/ecommerce";
import { useCart } from "@/views/shared/CartContext";
import { useCurrency } from "@/views/shared/CurrencyContext";

type Props = {
  product: Product;
  relatedProducts: Product[];
};

type ProductTab = "description" | "additional" | "reviews";

const colorOptions = ["Orange", "Gold", "White", "Green", "Blue", "Pink"] as const;
const sizeOptions = ["S", "M", "L", "XL"] as const;

export function ProductDetailPageView({ product, relatedProducts }: Props) {
  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const [activeImage, setActiveImage] = useState(gallery[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.color ?? "Orange");
  const [selectedSize, setSelectedSize] = useState(product.size ?? "M");
  const [activeTab, setActiveTab] = useState<ProductTab>("description");
  const [saved, setSaved] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { formatMoney } = useCurrency();

  const discount = useMemo(() => {
    if (!product.compareAt) {
      return null;
    }

    return Math.max(1, Math.round(((product.compareAt - product.price) / product.compareAt) * 100));
  }, [product.compareAt, product.price]);

  function addSelectedQuantity() {
    Array.from({ length: quantity }).forEach(() => addToCart(product));
    setStatus(`${quantity} item${quantity > 1 ? "s" : ""} added to cart.`);
  }

  return (
    <main className="premium-shell min-h-screen text-[#252a31]">
      <div className="border-y border-[#eee7da] bg-white/70">
        <div className="mx-auto max-w-6xl px-4 py-4 text-[12px] text-[#7d8389] sm:px-6">
          <Link className="text-[#008181]" href="/">Home</Link>
          <span className="mx-2">&gt;</span>
          <Link className="text-[#008181]" href="/shop">Shop</Link>
          <span className="mx-2">&gt;</span>
          <span>{product.name}</span>
        </div>
      </div>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:py-16">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-[6px] bg-[#f2f2f2]">
            <Image alt={product.name} className="h-full w-full object-cover" fill priority sizes="(min-width: 1024px) 540px, 100vw" src={activeImage} />
            {discount ? (
              <span className="absolute left-4 top-4 rounded-full bg-[#ff7dab] px-3 py-1 text-xs font-bold text-white">
                -{discount}%
              </span>
            ) : null}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {gallery.map((image) => (
              <button
                aria-label={`Show ${product.name} image`}
                aria-pressed={activeImage === image}
                className={`relative aspect-square cursor-pointer overflow-hidden rounded-[4px] border bg-[#f2f2f2] ${
                  activeImage === image ? "border-[#008181]" : "border-transparent"
                }`}
                key={image}
                onClick={() => setActiveImage(image)}
                type="button"
              >
                <Image alt="" className="h-full w-full object-cover" height={180} src={image} width={180} />
              </button>
            ))}
          </div>
        </div>

        <aside className="lg:pt-1">
          <h1 className="font-serif text-3xl font-bold text-[#252a31] sm:text-4xl">{product.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 border-b border-[#e2e2e2] pb-4">
            <Link className="text-sm font-bold text-[#008181]" href="/shop">{product.brand}</Link>
            <div className="flex items-center gap-1 text-[#f7b500]">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={14} fill={index < product.rating ? "currentColor" : "none"} />
              ))}
              <span className="ml-2 text-xs text-[#68717a]">({product.reviewCount ?? 90} reviews)</span>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <span className="font-serif text-2xl font-bold text-[#008181]">{formatMoney(product.price)}</span>
            {product.compareAt ? (
              <span className="text-sm text-[#9aa0a6] line-through">{formatMoney(product.compareAt)}</span>
            ) : null}
          </div>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[#4f5962]">{product.shortDescription}</p>

          <div className="mt-6 space-y-4 border-y border-[#e2e2e2] py-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="w-14 text-sm font-bold">Color</span>
              {colorOptions.map((color) => (
                <button
                  aria-label={`Select ${color}`}
                  aria-pressed={selectedColor === color}
                  className={`h-6 w-6 rounded-full border-2 ${
                    selectedColor === color ? "border-[#252a31]" : "border-white"
                  } shadow-sm`}
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color.toLowerCase() }}
                  type="button"
                />
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="w-14 text-sm font-bold">Size</span>
              {sizeOptions.map((size) => (
                <button
                  aria-pressed={selectedSize === size}
                  className={`grid h-8 min-w-8 cursor-pointer place-items-center rounded-[4px] border px-2 text-xs font-bold ${
                    selectedSize === size
                      ? "border-[#008181] bg-[#008181] text-white"
                      : "border-[#d9e7df] bg-white text-[#4f5962]"
                  }`}
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  type="button"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="flex h-11 overflow-hidden rounded-[4px] border border-[#d9e7df]">
              <button
                aria-label="Decrease quantity"
                className="grid w-10 cursor-pointer place-items-center"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                type="button"
              >
                <Minus size={15} />
              </button>
              <span className="grid w-10 place-items-center text-sm font-bold">{quantity}</span>
              <button
                aria-label="Increase quantity"
                className="grid w-10 cursor-pointer place-items-center"
                onClick={() => setQuantity((value) => Math.min(10, value + 1))}
                type="button"
              >
                <Plus size={15} />
              </button>
            </div>
            <button
              className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-[4px] bg-[#008181] px-7 text-[12px] font-bold uppercase text-white transition hover:bg-[#006f6f]"
              onClick={addSelectedQuantity}
              type="button"
            >
              <ShoppingBag size={16} /> Add to cart
            </button>
            <button
              aria-pressed={saved}
              className={`grid h-11 w-11 cursor-pointer place-items-center rounded-[4px] border ${
                saved ? "border-[#008181] bg-[#e8fff7] text-[#008181]" : "border-[#d9e7df] bg-white text-[#4f5962]"
              }`}
              onClick={() => setSaved((value) => !value)}
              type="button"
            >
              <Heart size={17} />
            </button>
            <button className="grid h-11 w-11 cursor-pointer place-items-center rounded-[4px] border border-[#d9e7df] bg-white text-[#4f5962]" type="button">
              <Shuffle size={17} />
            </button>
          </div>
          {status ? <p className="mt-3 text-sm font-semibold text-[#008181]">{status}</p> : null}

          <div className="mt-8 grid gap-3 rounded-[6px] border border-[#d9e7df] bg-white p-4 text-sm text-[#4f5962]">
            <p className="inline-flex items-center gap-2">
              <Truck size={16} className="text-[#008181]" /> Free delivery on orders over $59
            </p>
            <p>SKU: {product.id.toUpperCase()}</p>
            <p>Category: {product.category}</p>
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="border-b border-[#d9e7df]">
          {[
            { id: "description", label: "Description" },
            { id: "additional", label: "Additional Info" },
            { id: "reviews", label: "Reviews" },
          ].map((tab) => (
            <button
              className={`mr-5 border-b-2 py-3 text-[12px] font-bold uppercase ${
                activeTab === tab.id ? "border-[#008181] text-[#008181]" : "border-transparent text-[#4f5962]"
              }`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ProductTab)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="py-6 text-sm leading-7 text-[#4f5962]">
          {activeTab === "description" ? (
            <p>
              {product.shortDescription} Designed for everyday wear, this product balances statement styling with
              comfortable fabric and easy care. Pair it with relaxed denim, tailored trousers, or layered seasonal looks.
            </p>
          ) : null}
          {activeTab === "additional" ? (
            <dl className="grid gap-3 sm:grid-cols-2">
              <div><dt className="font-bold text-[#252a31]">Brand</dt><dd>{product.brand}</dd></div>
              <div><dt className="font-bold text-[#252a31]">Color</dt><dd>{selectedColor}</dd></div>
              <div><dt className="font-bold text-[#252a31]">Size</dt><dd>{selectedSize}</dd></div>
              <div><dt className="font-bold text-[#252a31]">Category</dt><dd>{product.category}</dd></div>
            </dl>
          ) : null}
          {activeTab === "reviews" ? (
            <p>Customers love the soft feel, print quality, and fast delivery. Average rating: {product.rating}/5.</p>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <h2 className="border-b border-[#d9e7df] pb-3 font-serif text-2xl font-bold text-[#252a31]">Related products</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((relatedProduct) => (
            <RelatedProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </section>
    </main>
  );
}

function RelatedProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { formatMoney } = useCurrency();

  return (
    <article className="rounded-[14px] border border-[#bfe4c9] bg-white p-3 shadow-sm">
      <Link className="relative block aspect-square overflow-hidden rounded-[10px] bg-[#f2f2f2]" href={`/product/${product.slug ?? product.id}`}>
        {product.badge ? (
          <span className="absolute left-2 top-2 z-10 rounded-full bg-[#ff7dab] px-2 py-1 text-[9px] font-bold text-white">
            {product.badge}
          </span>
        ) : null}
        <Image alt={product.name} className="h-full w-full object-cover transition hover:scale-105" height={280} src={product.image} width={280} />
      </Link>
      <p className="mt-3 text-[11px] lowercase text-[#68717a]">{product.brand}</p>
      <Link className="mt-1 block min-h-10 text-sm font-semibold text-[#252a31] hover:text-[#008181]" href={`/product/${product.slug ?? product.id}`}>
        {product.name}
      </Link>
      <div className="mt-2 flex items-center justify-between">
        <span className="font-bold text-[#008181]">{formatMoney(product.price)}</span>
        <button
          aria-label={`Add ${product.name} to cart`}
          className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-[#bfe4c9] bg-[#eafff8] text-[#008181]"
          onClick={() => addToCart(product)}
          type="button"
        >
          <ShoppingBag size={14} />
        </button>
      </div>
    </article>
  );
}
