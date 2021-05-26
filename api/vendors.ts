import { IMAGES_BASE_URL } from "@env";
import { AuthContext } from "context/authContext";
import { useContext } from "react";

import { DataPage } from "../common/models/datapage";

export interface VendorDTO {
  id: string;
  name: string;
  city: string;
  price: number;
  imageUrl: string;
  isFavourite: boolean;
  category: VendorCategoryType;
}

export interface GetVendorsFilters {}

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

export const vendorCategoryOptions = [
  { label: "", value: VendorCategoryType.None },
  { label: "Locatie", value: VendorCategoryType.Location },
  { label: "Muzica", value: VendorCategoryType.Music },
  { label: "Fotograf", value: VendorCategoryType.Photo },
  { label: "Video", value: VendorCategoryType.Video },
  { label: "Catering", value: VendorCategoryType.Food },
];

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
      filters: GetVendorsFilters | undefined,
      after?: VendorDTO
    ): Promise<DataPage<VendorDTO>> => {
      const randomprice = 2000 + Math.floor(Math.random() * 100);

      return {
        data: [
          {
            id: Math.random().toString(),
            name: "Charlie",
            city: "Sibiu, Romania",
            price: randomprice + 10,
            imageUrl:
              "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            isFavourite: false,
            category: VendorCategoryType.Location,
          },
          {
            id: Math.random().toString(),
            name: "Opal Events",
            city: "Brasov, Romania",
            price: randomprice + 20,
            imageUrl:
              "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            isFavourite: false,
            category: VendorCategoryType.Location,
          },
          {
            id: Math.random().toString(),
            name: "Sun Garden",
            city: "Cluj-Napoca, Romania",
            price: randomprice + 30,
            imageUrl:
              "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            isFavourite: false,
            category: VendorCategoryType.Location,
          },
          {
            id: Math.random().toString(),
            name: "Sun Garden",
            city: "Cluj-Napoca, Romania",
            price: randomprice + 40,
            imageUrl:
              "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            isFavourite: false,
            category: VendorCategoryType.Location,
          },
          {
            id: Math.random().toString(),
            name: "Sun Garden",
            city: "Cluj-Napoca, Romania",
            price: randomprice + 50,
            imageUrl:
              "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            isFavourite: false,
            category: VendorCategoryType.Location,
          },
        ],
        hasMore: randomprice % 100 < 80,
      };
    },
  };
};

export default useVendorsApi;
