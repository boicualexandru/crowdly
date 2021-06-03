import { CheckoutState, CheckoutItem } from "./checkoutState";

export enum CheckoutActionType {
  Load,
  AddItemToCheckout,
  RemoveItemFromCheckout,
  ClearCheckout,
}

export interface Load {
  type: CheckoutActionType.Load;
  payload: CheckoutState;
}

export interface AddItemToCheckout {
  type: CheckoutActionType.AddItemToCheckout;
  payload: CheckoutItem;
}

export interface RemoveItemFromCheckout {
  type: CheckoutActionType.RemoveItemFromCheckout;
  payload: {
    index: number;
  };
}

export interface ClearCheckout {
  type: CheckoutActionType.ClearCheckout;
}

export type CheckoutActions =
  Load
  | AddItemToCheckout
  | RemoveItemFromCheckout
  | ClearCheckout;
