import { useContext } from "react";

import { AuthContext } from "@context/auth/authContext";

import { SchedulePeriod } from "./schedulePeriods";

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
    ): Promise<SchedulePeriod[]> => {
      const responseRaw = await state.axiosInstance?.post(
        `checkout`,
        checkoutModel
      );
      const response = responseRaw?.data as SchedulePeriod[];

      const schedulePeriods = response.map((period) => ({
        ...period,
        startDate: new Date(period.startDate),
        endDate: new Date(period.endDate),
      }));

      return schedulePeriods;
    },
  };
};

export default useCheckoutApi;
