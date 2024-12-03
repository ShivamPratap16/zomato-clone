import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { ImageModel } from '../../database/allModels.js';

const Router = express.Router();

// Multer configuration: store the file in memory for Cloudinary upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Cloudinary image upload
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload_stream(
      {
        resource_type: 'auto',  // auto-detects image/video type
        public_id: file.originalname,  // optional, to use custom filename
        folder: 'zomato_images',  // optional folder
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    ).end(file.buffer); // end the stream and pass the file buffer
  });
};

/*
   Router    /:id
   Des       Get image by id
   Params    _id
   Access    Public
   Method    GET
 */
Router.get('/:_id', async (req, res) => {
  try {
    const image = await ImageModel.findById(req.params._id);
    return res.json({ image });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
   Router    /
   Des       Upload an image to Cloudinary, then save the file to MongoDB
   Params    none
   Access    Public
   Method    POST
 */
Router.post('/', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload the image to Cloudinary
    const cloudinaryResult = await uploadToCloudinary(file);

    // Save image URL and other details to MongoDB (assuming you have an Image model)
    const newImage = new ImageModel({
      imageUrl: cloudinaryResult.secure_url,  // URL of the uploaded image
      cloudinaryId: cloudinaryResult.public_id, // Cloudinary public ID
      createdAt: new Date(),
    });

    await newImage.save();

    return res.status(200).json({ message: 'Image uploaded successfully', image: newImage });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
