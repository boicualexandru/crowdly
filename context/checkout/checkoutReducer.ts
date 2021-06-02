import AsyncStorage from "@react-native-async-storage/async-storage";

import { CheckoutActions, CheckoutActionType } from "./checkoutActions";
import { CheckoutState, initialCheckoutState } from "./checkoutState";

export function checkoutReducer(
  state: CheckoutState,
  action: CheckoutActions
): CheckoutState {
  switch (action.type) {
    case CheckoutActionType.AddItemToCheckout: {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case CheckoutActionType.RemoveItemFromCheckout: {
      return {
        ...state,
        items: state.items.filter((_, index) => index !== action.payload.index),
      };
    }
    case CheckoutActionType.ClearCheckout: {
      return { ...initialCheckoutState };
    }
  }
}
