import { useContext } from "react";

import { AuthContext } from "@context/auth/authContext";

export interface VendorSchedulePeriod {
  id: string;
  description: string;
  startDate: Date;
  endDate: Date;
  vendorId: string;
  bookedByUser: UserDetails;
}

export interface UserSchedulePeriod {
  id: string;
  description: string;
  startDate: Date;
  endDate: Date;
  vendor: VendorDetails;
  bookedByUserId?: string;
}

interface UserDetails {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  phoneNumber: string;
}

interface VendorDetails {
  id: string;
  name: string;
  thumbnail: string;
  cityId: string;
  phone: string;
  email: string;
}

export interface Period {
  startDate: Date;
  endDate: Date;
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
      vendorId: string,
      showPast?: boolean,
    ): Promise<VendorSchedulePeriod[]> => {
      const responseRaw = await state.axiosInstance?.get(
        `vendors/${vendorId}/schedulePeriods?showPast=${showPast ?? false}`
      );

      const response = (responseRaw?.data as VendorSchedulePeriod[]).map(period => ({
        ...period,
        startDate: new Date(period.startDate),
        endDate: new Date(period.endDate),
      }));

      return response;
    },
    getUnavailablePeriodsByVendorId: async (
      vendorId: string
    ): Promise<Period[]> => {
      const responseRaw = await state.axiosInstance?.get(
        `vendors/${vendorId}/unavailablePeriods`
      );

      const response = (responseRaw?.data as Period[]).map(period => ({
        ...period,
        startDate: new Date(period.startDate),
        endDate: new Date(period.endDate),
      }));

      return response;
    },
    getUsersSchdulePeriods: async (): Promise<UserSchedulePeriod[]> => {
      const responseRaw = await state.axiosInstance?.get(
        `user/schedulePeriods`
      );

      const response = (responseRaw?.data as UserSchedulePeriod[]).map(
        (period) => ({
          ...period,
          startDate: new Date(period.startDate),
          endDate: new Date(period.endDate),
        })
      );

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
    ): Promise<string> => {
      const responseRaw = await state.axiosInstance?.post(
        `vendors/${vendorId}/schedulePeriods`,
        period
      );
      const response = responseRaw?.data as string;

      return response;
    },
    bookSchedulePeriodAsUser: async (
      vendorId: string,
      period: CreateSchedulePeriodModel
    ): Promise<string> => {
      const responseRaw = await state.axiosInstance?.post(
        `vendors/${vendorId}/book`,
        period
      );
      const response = responseRaw?.data as string;

      return response;
    },
  };
};

export default useSchdulePeriodsApi;
