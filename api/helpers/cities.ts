import { PickerItemProps } from "@react-native-picker/picker/typings/Picker";

export interface City {
  id: string;
  name: string;
  county: string;
  latitude: number;
  longitude: number;
}

export const availableCities: City[] = [
  {
    id: "d6744b0e-b8d8-4d1e-93b8-31eccd3f9472",
    name: "Cluj-Napoca",
    county: "Cluj",
    latitude: 46.7834818, 
    longitude: 23.5464725,
  },{
    id: "8d681e75-755c-4629-a6e9-3f8dadb6a355", 
    name: "Iași", 
    county: "Iași", 
    latitude: 47.1562327, 
    longitude: 27.5169304,
  },{
    id: "81d1e28e-915f-41f3-8514-c739ccfdacfb", 
    name: "București", 
    county: "București", 
    latitude: 44.4379853, 
    longitude: 25.9545531,
  },{
    id: "00c3300f-fa1f-41b7-ace2-92bf08e67d06", 
    name: "Constanța", 
    county: "Constanța", 
    latitude: 44.1812034, 
    longitude: 28.4899218,
  },{
    id: "a849f99c-49cf-401c-a586-47c22a9ef8a3", 
    name: "Timișoara", 
    county: "Timișoara", 
    latitude: 45.741163, 
    longitude: 21.1465498,
  },{
    id: "95c39ee9-fe71-4cc5-ae6f-b4f8bda8495a", 
    name: "Brașov", 
    county: "Brașov", 
    latitude: 45.6525767, 
    longitude: 25.5264228,
  },
];

export const availableCitiesPickerOptions: PickerItemProps[] = availableCities.map(city => ({
  value: city.id,
  label: city.name
}));

export const getCityById = (id: string) => availableCities.find(c => c.id == id);