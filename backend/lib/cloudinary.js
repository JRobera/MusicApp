import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const uploadToCloudinary = async (path, folder) => {
  return cloudinary.uploader
    .upload(path, {
      resource_type: "auto",
      folder,
      timeout: 30000, // seconds
    })
    .then((data) => {
      return {
        url: data.secure_url,
        public_id: data.public_id,
        format: data.format,
      };
    })
    .catch((error) => {
      throw error;
    });
};

const removeFromCloudinary = async (public_id, type) => {
  await cloudinary.uploader.destroy(
    public_id,
    { resource_type: type },
    function (error, result) {
      if (error) {
        console.log(error);
      }
    }
  );
};

export { uploadToCloudinary, removeFromCloudinary };
