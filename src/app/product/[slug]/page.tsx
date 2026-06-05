import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { catalogProducts, getProductBySlug, getRelatedProducts } from "@/models/product-catalog";
import { ProductDetailPageView } from "@/views/product/ProductDetailPageView";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return catalogProducts.map((product) => ({
    slug: product.slug ?? product.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product not found | Mugnee Multiple Limited",
    };
  }

  return {
    title: `${product.name} | Mugnee Multiple Limited`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailPageView product={product} relatedProducts={getRelatedProducts(product)} />;
}
