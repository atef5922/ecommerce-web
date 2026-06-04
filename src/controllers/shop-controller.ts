import { ShopService } from "@/services/shop-service";

export class ShopController {
  constructor(private readonly shopService = new ShopService()) {}

  getViewModel() {
    const model = this.shopService.getShopPage();
    const countBy = (key: "color" | "size") =>
      Object.entries(
        model.products.reduce<Record<string, number>>((counts, product) => {
          counts[product[key]] = (counts[product[key]] ?? 0) + 1;
          return counts;
        }, {}),
      ).map(([label, count]) => ({ label, count }));

    return {
      ...model,
      colorFilters: countBy("color"),
      sizeFilters: countBy("size"),
      productCountLabel: `There are ${model.products.length} products`,
      activeCategory: "Arts & Crafts",
      priceRangeLabel: "$0 - $700",
      cartTotal: "$57.99",
    };
  }
}
