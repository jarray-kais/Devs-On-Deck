import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config(); 

export const uploadImage = async (imagePath) => {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: "devs-on-deck",
    type: "private",
    resource_type: "auto",
  };
  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    if (result.resource_type === "image") {
      const url = cloudinary.url(result.public_id, {
        transformation: [
          {
            fetch_format: "auto",
            quality: "auto",
          },
          {
            width: 500,
            height: 500,
            crop: "auto",
            gravity: "auto",
          },
        ],
      });
      return url;
    } else {
      return result.secure_url;
    }
    
  } catch (error) {
    console.error("❌ Erreur lors de l'upload sur Cloudinary :", error.message);
  }
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    let destinationFolder;
    if (file.mimetype === "application/pdf") {
      destinationFolder = "uploads/pdf/";
    } else if (file.fieldname === "logo") {
      destinationFolder = "uploads/logo/";
    } else if (file.fieldname === "image") {
      destinationFolder = "uploads/image/";
    } else {
      destinationFolder = "uploads/profiles/";
    }
    cb(null, destinationFolder);
  },
  // Définir le nom du fichier téléchargé
  filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only images and PDF files are allowed"));
  }
};
// Créer un middleware Multer avec la configuration définie
export const upload = multer({ storage, fileFilter });
