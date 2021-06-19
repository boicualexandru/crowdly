import { useContext } from "react";

import { AuthContext } from "@context/auth/authContext";

export interface ValidTicketResult {
  isValid: true;
  ticketId: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
}

interface InvalidTicket {
  isValid: false;
}

export type TicketValidationResult = ValidTicketResult | InvalidTicket;

export const useTicketsApi = () => {
  const { state } = useContext(AuthContext);

  return {
    validateTicket: async (
      ticketId: string
    ): Promise<TicketValidationResult> => {
      const responseRaw = await state.axiosInstance?.post(`tickets/validate`, {
        ticketId: ticketId,
      });
      const response = responseRaw?.data as ValidTicketResult;

      return {
        ...response,
        isValid: true,
      };
    },
  };
};
