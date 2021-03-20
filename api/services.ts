export interface ServiceDTO {
  id: string;
  name: string;
  city: string;
  price: number;
  imageUrl: string;
  isFavourite: boolean;
}

export const getServices = async(): Promise<ServiceDTO[]> => {
  return [
    {
      id: "asd",
      name: "Charlie",
      city: "Sibiu, Romania",
      price: 2000,
      imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      isFavourite: false
    },
    {
      id: "asd2",
      name: "Opal Events",
      city: "Brasov, Romania",
      price: 3500,
      imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      isFavourite: false
    },
    {
      id: "asd3",
      name: "Sun Garden",
      city: "Cluj-Napoca, Romania",
      price: 2900,
      imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      isFavourite: false
    },
  ];
}