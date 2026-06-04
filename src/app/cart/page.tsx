import { shopPageModel } from "@/models/shop-data";
import { CartPageView } from "@/views/cart/CartPageView";

export default function CartPage() {
  return (
    <CartPageView
      brandMarks={shopPageModel.brandMarks}
      instagramImages={shopPageModel.instagramImages}
    />
  );
}
