import { shopPageModel } from "@/models/shop-data";
import { CheckoutPageView } from "@/views/checkout/CheckoutPageView";

export default function CheckoutPage() {
  return (
    <CheckoutPageView
      brandMarks={shopPageModel.brandMarks}
      instagramImages={shopPageModel.instagramImages}
    />
  );
}
