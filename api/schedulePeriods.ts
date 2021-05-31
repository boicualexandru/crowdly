import { useContext } from "react";

import { AuthContext } from "@context/auth/authContext";

export interface SchedulePeriod {
  id: string;
  description: string;
  startDate: Date;
  endDate: Date;
  vendorId: string;
  bookedByUserId?: string;
}

export interface CreateSchedulePeriodModel {
  description: string;
  startDate: Date;
  endDate: Date;
}

const useSchdulePeriodsApi = () => {
  const { state } = useContext(AuthContext);

  return {
    getSchdulePeriodsByVendorId: async (
      vendorId: string
    ): Promise<SchedulePeriod[]> => {
      console.log(`vendors/${vendorId}/schedulePeriods`);
      const responseRaw = await state.axiosInstance?.get(
        `vendors/${vendorId}/schedulePeriods`
      );
      
      const response = responseRaw?.data;

      return response;
    },
    getUsersSchdulePeriods: async (): Promise<SchedulePeriod[]> => {
      const responseRaw = await state.axiosInstance?.get(
        `user/schedulePeriods`
      );
      const response = responseRaw?.data;

      return response;
    },
    deleteSchedulePeriodAsVendor: async (
      vendorId: string,
      periodId: string
    ): Promise<void> => {
      const responseRaw = await state.axiosInstance?.delete(
        `vendors/${vendorId}/schedulePeriods/${periodId}`
      );
    },
    deleteSchedulePeriodAsUser: async (periodId: string): Promise<void> => {
      const responseRaw = await state.axiosInstance?.delete(
        `user/schedulePeriods/${periodId}`
      );
    },
    createSchedulePeriodAsVendor: async (
      vendorId: string,
      period: CreateSchedulePeriodModel
    ): Promise<SchedulePeriod> => {
      const responseRaw = await state.axiosInstance?.post(
        `vendors/${vendorId}/schedulePeriods`,
        period
      );
      const response = responseRaw?.data;

      return response;
    },
    bookSchedulePeriodAsUser: async (
      vendorId: string,
      period: CreateSchedulePeriodModel
    ): Promise<SchedulePeriod> => {
      const responseRaw = await state.axiosInstance?.post(
        `vendors/${vendorId}/book`,
        period
      );
      const response = responseRaw?.data;

      return response;
    },
  };
};

export default useSchdulePeriodsApi;
