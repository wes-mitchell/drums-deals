const cloudApi = "https://api.cloudinary.com/v1_1/wmdrums/image/upload"

export const uploadImageToCloudinary = (data) => {
  return fetch(cloudApi, {
    method: "POST",
    body: data,
  });
};