import moment from "moment";
import { useContext } from "react";

import { AuthContext } from "@context/auth/authContext";
import { PreferencesContext } from "@context/preferences/preferencesContext";

import { getImageUrlByEventId } from "./helpers/getImage";
import { DataPage } from "./models/datapage";

export interface Event {
  id: string;
  name: string;
  cityId: string;
  price: number;
  thumbnail: string;
  category: EventCategoryType;
  startDateTime: Date;
  endDateTime: Date;
}

export interface EventsFiltersModel {
  cityId?: string;
  category?: EventCategoryType;
  priceMin?: number;
  priceMax?: number;
  afterDateTime?: Date;
}

export interface EventDetails {
  id: string;
  name: string;
  cityId: string;
  longitude?: number;
  latitude?: number;
  startDateTime: Date;
  endDateTime: Date;
  guests?: number;
  phone: string;
  email: string;
  description: string;
  price: number;
  isPublic: boolean;
  images: string[];
  isEditable: boolean;
  category: EventCategoryType;
}

export interface CreateEventRequest {
  name: string;
  cityId: string;
  price: number;
  startDateTime: Date;
  endDateTime: Date;
  guests?: number;
  phone: string;
  email: string;
  description: string;
  isPublic: boolean;
  images: string[];
  category: EventCategoryType;
}

export interface UpdateEventRequest {
  id: string;
  name: string;
  cityId: string;
  price: number;
  startDateTime: Date;
  endDateTime: Date;
  guests?: number;
  phone: string;
  email: string;
  description: string;
  isPublic: boolean;
  existingImages: string[];
  newImages: string[];
  category: EventCategoryType;
}

export enum EventCategoryType {
  None = 0,
  Party = 1,
  Music = 2,
  Comedy = 3,
  Art = 4,
  Lifestyle = 5,
  Comunity = 6,
  Corporate = 7,
  Personal = 8,
}

export const eventCategoryNameDictionary: {
  [key in EventCategoryType]: string;
} = {
  [EventCategoryType.None]: "Nicio categorie",
  [EventCategoryType.Party]: "Petrecere",
  [EventCategoryType.Music]: "Concert",
  [EventCategoryType.Comedy]: "Comedie",
  [EventCategoryType.Art]: "Arta",
  [EventCategoryType.Lifestyle]: "Stil de viata",
  [EventCategoryType.Comunity]: "Comunitate",
  [EventCategoryType.Corporate]: "Corporativ",
  [EventCategoryType.Personal]: "Personal",
};

export const eventCategoryOptions: {
  value: EventCategoryType;
  label: string;
}[] = Object.keys(eventCategoryNameDictionary).map((categoryType) => {
  return {
    value: categoryType,
    label: eventCategoryNameDictionary[categoryType] as string,
  };
});

export const getInitialEventsFilters = (
  cityId?: string,
  category?: EventCategoryType
): EventsFiltersModel => ({
  cityId: cityId ?? undefined,
  category: category ?? EventCategoryType.None,
});

const useEventsApi = () => {
  const { state } = useContext(AuthContext);
  // const { state: preferencesState } = useContext(PreferencesContext);

  return {
    getEventById: async (eventId: string): Promise<EventDetails> => {
      const responseRaw = await state.axiosInstance?.get(`events/${eventId}`);
      const response = responseRaw?.data;

      return {
        ...response,
        price: parseInt(response.price),
        startDateTime: new Date(response.startDateTime),
        endDateTime: new Date(response.endDateTime),
        images: response.images?.map((imageFileName: string) =>
          getImageUrlByEventId(response.id, imageFileName)
        ),
        // isFavourite:
        //   preferencesState.favoriteEvents?.includes(eventId) ?? false,
      };
    },
    createEvent: async (event: CreateEventRequest): Promise<string> => {
      var body = new FormData();
      body.append("name", event.name);
      body.append("cityId", event.cityId);
      body.append("price", event.price.toString());
      body.append(
        "startDateTime",
        moment(event.startDateTime).format("YYYY-MM-DD")
      );
      body.append(
        "endDateTime",
        moment(event.endDateTime).format("YYYY-MM-DD")
      );
      if (event.guests) body.append("guests", event.guests.toString());
      if (event.phone) body.append("phone", event.phone);
      if (event.email) body.append("email", event.email);
      if (event.description) body.append("description", event.description);
      body.append("isPublic", event.isPublic.toString());
      body.append("category", event.category.toString());

      event.images?.forEach((image) => {
        var formImage = {
          uri: image,
          type: "image/jpeg",
          name: "photo.jpg",
        };
        body.append("formFiles", formImage);
      });

      const responseRaw = await state.axiosInstance?.post("events", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(responseRaw.status);

      return responseRaw?.data.id;
    },
    updateEvent: async (event: UpdateEventRequest): Promise<void> => {
      var body = new FormData();
      body.append("name", event.name);
      body.append("cityId", event.cityId);
      body.append("price", event.price.toString());
      body.append("startDateTime", moment(event.startDateTime).format("YYYY-MM-DD"));
      body.append("endDateTime", moment(event.endDateTime).format("YYYY-MM-DD"));
      if (event.guests) body.append("guests", event.guests.toString());
      if (event.phone) body.append("phone", event.phone);
      if (event.email) body.append("email", event.email);
      if (event.description) body.append("description", event.description);
      body.append("isPublic", event.isPublic.toString());
      body.append("category", event.category.toString());

      event.existingImages
        ?.map((img) => img.replace(/^.*[\\\/]/, ""))
        .forEach((img) => {
          body.append("existingImages", img);
        });

      event.newImages?.forEach((image) => {
        var formImage = {
          uri: image,
          type: "image/jpeg",
          name: "photo.jpg",
        };
        body.append("formFiles", formImage);
      });

      const responseRaw = await state.axiosInstance?.put(
        `events/${event.id}`,
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const response = responseRaw.data;
    },
    getEventsPage: async (
      filters: EventsFiltersModel | undefined,
      skip?: number
    ): Promise<DataPage<Event>> => {
      const responseRaw = await state.axiosInstance?.get(`events`, {
        params: { ...filters, skip },
      });

      const response = responseRaw?.data as DataPage<Event>;

      const parsedEvents = response.data.map((event) => ({
        ...event,
        startDateTime: new Date(event.startDateTime),
        endDateTime: new Date(event.endDateTime),
        thumbnail: getImageUrlByEventId(event.id, event.thumbnail),
      }));

      console.log("getEventsPage: ", response.data.length);

      return {
        data: parsedEvents,
        hasMore: response.hasMore,
      };
    },
    getMyEvents: async (): Promise<Event[]> => {
      const responseRaw = await state.axiosInstance?.get(`events/editable`);

      const response = responseRaw?.data as Event[];

      const parsedEvents = response.map((event) => ({
        ...event,
        startDateTime: new Date(event.startDateTime),
        endDateTime: new Date(event.endDateTime),
        thumbnail: getImageUrlByEventId(event.id, event.thumbnail),
      }));

      return parsedEvents;
    },
  };
};

export default useEventsApi;
