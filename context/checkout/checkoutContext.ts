import React from "react";

import { CheckoutActions } from "./checkoutActions";
import { initialCheckoutState, CheckoutState } from "./checkoutState";

export const CheckoutContext = React.createContext<{
  state: CheckoutState;
  dispatch: React.Dispatch<CheckoutActions>;
}>({
  state: initialCheckoutState,
  dispatch: () => undefined,
});
