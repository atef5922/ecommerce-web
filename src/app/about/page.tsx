import type { Metadata } from "next";
import { AboutController } from "@/controllers/about-controller";
import { AboutPageView } from "@/views/about/AboutPageView";

export const metadata: Metadata = {
  title: "About Us | Mugnee Multiple Limited",
  description:
    "Learn about Mugnee Multiple Limited, our commerce experience, product curation, and beauty retail mission.",
};

export default function AboutPage() {
  const viewModel = new AboutController().getViewModel();

  return <AboutPageView viewModel={viewModel} />;
}
