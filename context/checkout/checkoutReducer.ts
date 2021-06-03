import AsyncStorage from "@react-native-async-storage/async-storage";

import { CheckoutActions, CheckoutActionType } from "./checkoutActions";
import { CheckoutState, initialCheckoutState } from "./checkoutState";

export function checkoutReducer(
  state: CheckoutState,
  action: CheckoutActions
): CheckoutState {
  switch (action.type) {
    case CheckoutActionType.Load: {
      return action.payload;
    }
    case CheckoutActionType.AddItemToCheckout: {
      const newState = {
        ...state,
        items: [...state.items, action.payload],
      };
      AsyncStorage.setItem("checkout", JSON.stringify(newState)).then();

      return newState;
    }
    case CheckoutActionType.RemoveItemFromCheckout: {
      const newState = {
        ...state,
        items: state.items.filter((_, index) => index !== action.payload.index),
      };
      AsyncStorage.setItem("checkout", JSON.stringify(newState)).then();

      return newState;
    }
    case CheckoutActionType.ClearCheckout: {
      const newState = { ...initialCheckoutState };
      AsyncStorage.setItem("checkout", JSON.stringify(newState)).then();

      return newState;
    }
  }
}
