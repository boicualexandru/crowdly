import { VendorCategoryType } from 'api/vendors';
import { Period } from "api/schedulePeriods";

export interface CheckoutItem {
  vendorId: string;
  vendorName: string;
  vendorPrice: number;
  vendorThumbnail?: string;
  vendorCategory: VendorCategoryType;
  period: Period;
}

export interface CheckoutState {
  items: CheckoutItem[];
}

export const initialCheckoutState: CheckoutState = {
  items: [],
};
