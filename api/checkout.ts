import { useContext } from "react";

import { AuthContext } from "@context/auth/authContext";

import { VendorSchedulePeriod } from "./schedulePeriods";

export interface ConfirmCheckoutModel {
  items: ConfirmCheckoutItem[];
}

interface ConfirmCheckoutItem {
  vendorId: string;
  startDate: Date;
  endDate: Date;
}

const useCheckoutApi = () => {
  const { state } = useContext(AuthContext);

  return {
    confirmCheckout: async (
      checkoutModel: ConfirmCheckoutModel
    ): Promise<string[]> => {
      const responseRaw = await state.axiosInstance?.post(
        `checkout`,
        checkoutModel
      );
      const response = responseRaw?.data as string[];

      return response;
    },
  };
};

export default useCheckoutApi;
