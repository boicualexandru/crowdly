import { DataPage } from "../common/models/datapage";
import { API_BASE_URL, IMAGES_BASE_URL } from '@env';

export interface VendorDTO {
  id: string;
  name: string;
  city: string;
  price: number;
  imageUrl: string;
  isFavourite: boolean;
}

export interface GetVendorsFilters {}

export const getVendorsPage = async (
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
      },
      {
        id: Math.random().toString(),
        name: "Opal Events",
        city: "Brasov, Romania",
        price: randomprice + 20,
        imageUrl:
          "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        isFavourite: false,
      },
      {
        id: Math.random().toString(),
        name: "Sun Garden",
        city: "Cluj-Napoca, Romania",
        price: randomprice + 30,
        imageUrl:
          "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        isFavourite: false,
      },
      {
        id: Math.random().toString(),
        name: "Sun Garden",
        city: "Cluj-Napoca, Romania",
        price: randomprice + 40,
        imageUrl:
          "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        isFavourite: false,
      },
      {
        id: Math.random().toString(),
        name: "Sun Garden",
        city: "Cluj-Napoca, Romania",
        price: randomprice + 50,
        imageUrl:
          "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        isFavourite: false,
      },
    ],
    hasMore: randomprice % 100 < 80,
  };
};

export interface GetVendorResponse {
  name: string;
  city: string;
  price: number;
  description: string;
  images: string[];
}

export const getVendorById = async (vendorId: string): Promise<GetVendorResponse> => {
  const responseRaw = await fetch(`${API_BASE_URL}/vendors/${vendorId}`, {
    method: "GET",
    headers: {
      'Accept': "application/json",
    },
  });
  
  const response = await responseRaw.json();
  return {
    ...response,
    price: parseInt(response.price),
    images: response.imageUrls?.map((img: string) => `${IMAGES_BASE_URL}/vendors/${response.id}/${img}`)
  };
}

export interface CreateVendorRequest {
  name: string;
  city: string;
  price: number;
  description: string;
  images: string[];
}

export const createVendor = async (
  vendor: CreateVendorRequest
): Promise<string> => {

  var body = new FormData();
  body.append('name', vendor.name);
  body.append('city', vendor.city);
  body.append('price', vendor.price.toString());
  
  vendor.images?.forEach(image => {
    var formImage = {
      uri: image,
      type: 'image/jpeg',
      name: 'photo.jpg',
    };
    body.append('formFiles', formImage);
  });

  const responseRaw = await fetch(`${API_BASE_URL}/vendors`, {
    method: "POST",
    headers: {
      'Accept': "application/json",
      'Content-Type': 'multipart/form-data',
    },
    body: body,
  });

  const response = await responseRaw.json();
  return response.id;
};

export interface UpdateVendorRequest {
  id: string;
  name: string;
  city: string;
  price: number;
  description: string;
  existingImages: string[];
  newImages: string[];
}

export const updateVendor = async (
  vendor: UpdateVendorRequest
): Promise<void> => {

  var body = new FormData();
  body.append('name', vendor.name);
  body.append('city', vendor.city);
  body.append('price', vendor.price.toString());

  vendor.existingImages?.map(img => img.replace(/^.*[\\\/]/, '')).forEach(img => {
    body.append('existingImageUrls', img);
  });
  
  vendor.newImages?.forEach(image => {
    var formImage = {
      uri: image,
      type: 'image/jpeg',
      name: 'photo.jpg',
    };
    body.append('formFiles', formImage);
  });

  const responseRaw = await fetch(`${API_BASE_URL}/vendors/${vendor.id}`, {
    method: "PUT",
    headers: {
      'Accept': "application/json",
      'Content-Type': 'multipart/form-data',
    },
    body: body,
  });

  const response = await responseRaw.json();
};
