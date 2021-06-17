import { getImageUrlByVendorId, } from './helpers/getImage';
import { useContext } from "react";

import { AuthContext } from "@context/auth/authContext";
import { PreferencesContext } from "@context/preferences/preferencesContext";

import { DataPage } from "./models/datapage";

export interface Vendor {
  id: string;
  name: string;
  city: string;
  price: number;
  thumbnail: string;
  // isFavourite: boolean;
  category: VendorCategoryType;
}

export interface VendorsFiltersModel {
  city?: string;
  category?: VendorCategoryType;
  priceMin?: number;
  priceMax?: number;
  guests?: number;
  periodStart?: Date;
  periodEnd?: Date;
}

export interface VendorDetails {
  id: string;
  name: string;
  city: string;
  longitude?: number;
  latitude?: number;
  phone: string;
  email: string;
  description: string;
  price: number;
  guestsMin?: number;
  guestsMax?: number;
  images: string[];
  isEditable: boolean;
  category: VendorCategoryType;
  isFavourite: boolean;
}

export interface CreateVendorRequest {
  name: string;
  city: string;
  price: number;
  guestsMin?: number;
  guestsMax?: number;
  phone: string;
  email: string;
  description: string;
  images: string[];
  category: VendorCategoryType;
}

export interface UpdateVendorRequest {
  id: string;
  name: string;
  city: string;
  price: number;
  guestsMin?: number;
  guestsMax?: number;
  phone: string;
  email: string;
  description: string;
  existingImages: string[];
  newImages: string[];
  category: VendorCategoryType;
}

export enum VendorCategoryType {
  None = 0,
  Location = 1,
  Music = 2,
  Photo = 3,
  Video = 4,
  Food = 5,
  Entertainment = 6,
  Decoration = 7,
  Flowers = 8,
}

export const availableCities = [
  { value: "", label: "Toate orasele" },
  { value: "Cluj-Napoca, Romania", label: "Cluj-Napoca, Romania" },
  { value: "Iasi, Romania", label: "Iasi, Romania" },
  { value: "Brasov, Romania", label: "Brasov, Romania" },
  { value: "Bucuresti, Romania", label: "Bucuresti, Romania" },
];

export const vendorCategoryNameDictionary: {[key in VendorCategoryType]: string} = {
  [VendorCategoryType.None]: "Nicio categorie",
  [VendorCategoryType.Location]: "Locatie",
  [VendorCategoryType.Music]: "Muzica",
  [VendorCategoryType.Photo]: "Fotograf",
  [VendorCategoryType.Video]: "Video",
  [VendorCategoryType.Food]: "Catering",
  [VendorCategoryType.Entertainment]: "Divertisment",
  [VendorCategoryType.Decoration]: "Decoratiuni",
  [VendorCategoryType.Flowers]: "Aranjamente Florale",
}

export const vendorCategoryOptions: {
  value: VendorCategoryType;
  label: string;
}[] = Object.keys(vendorCategoryNameDictionary).map(categoryType => {
  return ({
    value: categoryType,
    label: vendorCategoryNameDictionary[categoryType] as string,
  });
})

export const getInitialVendorsFilters = (
  category?: VendorCategoryType
): VendorsFiltersModel => ({
  city: "",
  category: category ?? VendorCategoryType.None,
});

const useVendorsApi = () => {
  const { state } = useContext(AuthContext);
  const { state: preferencesState } = useContext(PreferencesContext);

  return {
    getVendorById: async (vendorId: string): Promise<VendorDetails> => {
      const responseRaw = await state.axiosInstance?.get(`vendors/${vendorId}`);
      const response = responseRaw?.data;

      return {
        ...response,
        price: parseInt(response.price),
        images: response.images?.map((imageFileName: string) =>
          getImageUrlByVendorId(response.id, imageFileName)
        ),
        isFavourite:
          preferencesState.favoriteVendors?.includes(vendorId) ?? false,
      };
    },
    createVendor: async (vendor: CreateVendorRequest): Promise<string> => {
      var body = new FormData();
      body.append("name", vendor.name);
      body.append("city", vendor.city);
      body.append("price", vendor.price.toString());
      if (vendor.guestsMin) body.append("guestsMin", vendor.guestsMin.toString());
      if (vendor.guestsMax) body.append("guestsMax", vendor.guestsMax.toString());
      if (vendor.phone) body.append("phone", vendor.phone);
      if (vendor.email) body.append("email", vendor.email);
      if (vendor.description) body.append("description", vendor.description);
      body.append("category", vendor.category.toString());

      vendor.images?.forEach((image) => {
        var formImage = {
          uri: image,
          type: "image/jpeg",
          name: "photo.jpg",
        };
        body.append("formFiles", formImage);
      });

      const responseRaw = await state.axiosInstance?.post("vendors", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return responseRaw?.data.id;
    },
    updateVendor: async (vendor: UpdateVendorRequest): Promise<void> => {
      var body = new FormData();
      body.append("name", vendor.name);
      body.append("city", vendor.city);
      body.append("price", vendor.price.toString());
      if (vendor.guestsMin) body.append("guestsMin", vendor.guestsMin.toString());
      if (vendor.guestsMax) body.append("guestsMax", vendor.guestsMax.toString());
      if (vendor.phone) body.append("phone", vendor.phone);
      if (vendor.email) body.append("email", vendor.email);
      if (vendor.description) body.append("description", vendor.description);
      body.append("category", vendor.category.toString());

      vendor.existingImages
        ?.map((img) => img.replace(/^.*[\\\/]/, ""))
        .forEach((img) => {
          body.append("existingImages", img);
        });

      vendor.newImages?.forEach((image) => {
        var formImage = {
          uri: image,
          type: "image/jpeg",
          name: "photo.jpg",
        };
        body.append("formFiles", formImage);
      });

      const responseRaw = await state.axiosInstance?.put(
        `vendors/${vendor.id}`,
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const response = responseRaw.data;
    },
    getVendorsPage: async (
      filters: VendorsFiltersModel | undefined,
      skip?: number
    ): Promise<DataPage<Vendor>> => {
      const responseRaw = await state.axiosInstance?.get(`vendors`, {
        params: { ...filters, skip },
      });

      const response = responseRaw?.data as DataPage<Vendor>;

      const parsedVendors = response.data.map((vendor) => ({
        ...vendor,
        thumbnail: getImageUrlByVendorId(vendor.id, vendor.thumbnail),
      }));

      console.log("getVendorsPage: ", response.data.length);

      return {
        data: parsedVendors,
        hasMore: response.hasMore,
      };
    },
    getMyVendors: async (): Promise<Vendor[]> => {
      const responseRaw = await state.axiosInstance?.get(`vendors/editable`);

      const response = responseRaw?.data as Vendor[];

      const parsedVendors = response.map((vendor) => ({
        ...vendor,
        thumbnail: getImageUrlByVendorId(vendor.id, vendor.thumbnail),
      }));

      return parsedVendors;
    },
  };
};

export default useVendorsApi;
