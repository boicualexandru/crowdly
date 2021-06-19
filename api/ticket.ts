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

export interface Ticket {
  id: string;
  eventId: string;
  userId: string;
}

export const useTicketApi = () => {
  const { state } = useContext(AuthContext);

  return {
    validateTicket: async (eventId: string, ticketId: string): Promise<TicketValidationResult> => {
      const responseRaw = await state.axiosInstance?.post(`events/${eventId}/ValidateTicket`, {
        ticketId: ticketId
      });
      const response = responseRaw?.data as ValidTicketResult;

      if(!response) return {
        isValid: false,
      };

      return {
        ...response,
        isValid: true,
      };
    },
    book: async (eventId: string): Promise<void> => {
      const responseRaw = await state.axiosInstance?.post(`events/${eventId}/book`);
    },
    getTicketsByUser: async (): Promise<Ticket[]> => {
      const responseRaw = await state.axiosInstance?.get(`user/tickets`);
      const response = responseRaw?.data as Ticket[];
      return response;
    },
    getTicketsByEvent: async (eventId: string): Promise<Ticket[]> => {
      const responseRaw = await state.axiosInstance?.get(`events/${eventId}/tickets`);
      const response = responseRaw?.data as Ticket[];
      return response;
    }
  };
};
