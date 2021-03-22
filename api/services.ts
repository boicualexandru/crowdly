import { DataPage } from "./../common/models/datapage";

export interface ServiceDTO {
  id: string;
  name: string;
  city: string;
  price: number;
  imageUrl: string;
  isFavourite: boolean;
}

export interface GetServicesFilters {}

export const getServicesPage = async (
  filters: GetServicesFilters | undefined,
  after?: ServiceDTO
): Promise<DataPage<ServiceDTO>> => {
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

export interface CreateServiceRequest {
  name: string;
  city: string;
  price: string;
  description: string;
}

export const createService = async (
  service: CreateServiceRequest
): Promise<string> => {
  const responseRaw = await fetch("https://jsonbase.com/crowdly/services", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...service,
      id: "asd",
    }),
  });

  console.log(responseRaw);
  const response = await responseRaw.json();
  console.log(response);
  return "asd";
};
