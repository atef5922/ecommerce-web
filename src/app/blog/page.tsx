import type { Metadata } from "next";
import { BlogController } from "@/controllers/blog-controller";
import { BlogPageView } from "@/views/blog/BlogPageView";

export const metadata: Metadata = {
  title: "Blog | Mugnee Multiple Limited",
  description:
    "Read Mugnee Multiple Limited articles, beauty stories, skincare guides, video posts, and audio updates.",
};

export default function BlogPage() {
  const viewModel = new BlogController().getViewModel();

  return <BlogPageView viewModel={viewModel} />;
}
