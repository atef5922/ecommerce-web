import type { Metadata } from "next";
import { ShopController } from "@/controllers/shop-controller";
import { ShopPageView } from "@/views/shop/ShopPageView";

export const metadata: Metadata = {
  title: "Shop | Mugnee Multiple Limited",
  description:
    "Browse Mugnee Multiple Limited beauty, wellness, and skincare products with filters and curated collections.",
};

export default function ShopPage() {
  const viewModel = new ShopController().getViewModel();

  return <ShopPageView viewModel={viewModel} />;
}
