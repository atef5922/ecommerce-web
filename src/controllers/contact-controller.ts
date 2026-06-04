import { ContactService } from "@/services/contact-service";

export class ContactController {
  constructor(private readonly contactService = new ContactService()) {}

  getViewModel() {
    const model = this.contactService.getContactPage();

    return {
      ...model,
      pageTitle: "Contact Us",
      cartTotal: "$57.99",
    };
  }
}
