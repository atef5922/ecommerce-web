import type { Metadata } from "next";
import { ContactController } from "@/controllers/contact-controller";
import { ContactPageView } from "@/views/contact/ContactPageView";

export const metadata: Metadata = {
  title: "Contact Us | Mugnee Multiple Limited",
  description:
    "Contact Mugnee Multiple Limited for customer care, product support, partnerships, and e-commerce inquiries.",
};

export default function ContactPage() {
  const viewModel = new ContactController().getViewModel();

  return <ContactPageView viewModel={viewModel} />;
}
