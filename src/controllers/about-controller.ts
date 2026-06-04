import { AboutService } from "@/services/about-service";

export class AboutController {
  constructor(private readonly aboutService = new AboutService()) {}

  getViewModel() {
    const model = this.aboutService.getAboutPage();

    return {
      ...model,
      pageTitle: "About Us",
      cartTotal: "$57.99",
    };
  }
}
