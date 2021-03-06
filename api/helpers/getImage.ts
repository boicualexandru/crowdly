import { IMAGES_BASE_URL } from "@env";

export const getImageUrlByVendorId = (
  vendorId: string,
  imageFileName: string
) => `${IMAGES_BASE_URL}/vendors/${vendorId}/${imageFileName}`;

export const getImageUrlByEventId = (eventId: string, imageFileName: string) =>
  `${IMAGES_BASE_URL}/events/${eventId}/${imageFileName}`;

export const getImageUrlByUserId = (userId: string, imageFileName: string) =>
  `${IMAGES_BASE_URL}/users/${userId}/${imageFileName}`;
