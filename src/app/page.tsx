import { HomeController } from "@/controllers/home-controller";
import { HomePageView } from "@/views/home/HomePageView";

export default function Home() {
  const viewModel = new HomeController().getViewModel();

  return <HomePageView viewModel={viewModel} />;
}
