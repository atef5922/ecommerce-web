import { BlogService } from "@/services/blog-service";

export class BlogController {
  constructor(private readonly blogService = new BlogService()) {}

  getViewModel() {
    const model = this.blogService.getBlogPage();

    return {
      ...model,
      pageTitle: "Blog Page",
      cartTotal: "$57.99",
    };
  }
}
