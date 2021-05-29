import { IMAGES_BASE_URL } from "@env";
import { useContext } from "react";

import { AuthContext } from "@context/authContext";

import { DataPage } from "./models/datapage";

export interface VendorDTO {
  id: string;
  name: string;
  city: string;
  price: number;
  thumbnailUrl: string;
  // isFavourite: boolean;
  category: VendorCategoryType;
}

export interface VendorsFiltersModel {
  city?: string;
  category?: VendorCategoryType;
}

export interface GetVendorResponse {
  name: string;
  city: string;
  price: number;
  description: string;
  images: string[];
  category: VendorCategoryType;
}

export interface CreateVendorRequest {
  name: string;
  city: string;
  price: number;
  description: string;
  images: string[];
  category: VendorCategoryType;
}

export interface UpdateVendorRequest {
  id: string;
  name: string;
  city: string;
  price: number;
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
}

export const availableCities = [
  { value: "", label: "Toate orasele" },
  { value: "Cluj-Napoca, Romania", label: "Cluj-Napoca, Romania" },
  { value: "Iasi, Romania", label: "Iasi, Romania" },
  { value: "Brasov, Romania", label: "Brasov, Romania" },
  { value: "Bucuresti, Romania", label: "Bucuresti, Romania" },
];

export const vendorCategoryOptions = [
  { label: "Nicio categorie", value: VendorCategoryType.None },
  { label: "Locatie", value: VendorCategoryType.Location },
  { label: "Muzica", value: VendorCategoryType.Music },
  { label: "Fotograf", value: VendorCategoryType.Photo },
  { label: "Video", value: VendorCategoryType.Video },
  { label: "Catering", value: VendorCategoryType.Food },
];

export const initialVendorsFilters: VendorsFiltersModel = {
  city: "Brasov, Romania",
  category: VendorCategoryType.None,
};

const getImageUrl = (vendorId: string, imageFileName: string) =>
  `${IMAGES_BASE_URL}/vendors/${vendorId}/${imageFileName}`;

const useVendorsApi = () => {
  const { state } = useContext(AuthContext);

  return {
    getVendorById: async (vendorId: string): Promise<GetVendorResponse> => {
      const responseRaw = await state.axiosInstance?.get(`vendors/${vendorId}`);
      const response = responseRaw?.data;

      return {
        ...response,
        price: parseInt(response.price),
        images: response.imageUrls?.map((imageFileName: string) =>
          getImageUrl(response.id, imageFileName)
        ),
      };
    },
    createVendor: async (vendor: CreateVendorRequest): Promise<string> => {
      var body = new FormData();
      body.append("name", vendor.name);
      body.append("city", vendor.city);
      body.append("price", vendor.price.toString());
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
      body.append("category", vendor.category.toString());

      vendor.existingImages
        ?.map((img) => img.replace(/^.*[\\\/]/, ""))
        .forEach((img) => {
          body.append("existingImageUrls", img);
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
    ): Promise<DataPage<VendorDTO>> => {
      const responseRaw = await state.axiosInstance?.get(`vendors`, {
        params: { ...filters, skip },
      });

      const response = responseRaw?.data as DataPage<VendorDTO>;

      const parsedVendors = response.data.map((vendor) => ({
        ...vendor,
        thumbnailUrl: getImageUrl(vendor.id, vendor.thumbnailUrl),
      }));

      return {
        data: parsedVendors,
        hasMore: response.hasMore,
      };
    },
  };
};

export default useVendorsApi;
