import { HomeService } from "@/services/home-service";

export class HomeController {
  constructor(private readonly homeService = new HomeService()) {}

  getViewModel() {
    const model = this.homeService.getHomePage();
    const featuredProducts = model.products.slice(0, 4);
    const dailyDeals = model.products.slice(0, 2);

    return {
      ...model,
      featuredProducts,
      dailyDeals,
    };
  }
}
