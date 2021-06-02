import { CheckoutState, CheckoutItem } from "./checkoutState";

export enum CheckoutActionType {
  AddItemToCheckout,
  RemoveItemFromCheckout,
  ClearCheckout,
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
  | AddItemToCheckout
  | RemoveItemFromCheckout
  | ClearCheckout;
