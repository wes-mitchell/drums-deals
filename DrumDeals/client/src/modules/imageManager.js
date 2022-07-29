import { settings } from "../settings";
const cloudApi = settings.cloudinaryKey

export const uploadImageToCloudinary = (data) => {
  return fetch(cloudApi, {
    method: "POST",
    body: data,
  });
};