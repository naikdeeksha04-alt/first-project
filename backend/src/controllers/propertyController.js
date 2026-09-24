import { Property } from "../Models/propertyModel.js";
import { APIFeatures } from "../utils/APIFeatures.js";
import imagekit from "../utils/ImagekitIO.js";

// GET ALL PROPERTIES
const getProperties = async (req, res) => {
  try {
    const features = new APIFeatures(Property.find(), req.query)
      .filter()
      .search()
      .paginate();

    const doc = await features.query;

    res.status(200).json({
      status: "success",
      no_of_responses: doc.length,
      data: doc,
    });
  } catch (error) {
    console.error("Error searching properties:", error);

    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// GET ONE PROPERTY
const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        status: "fail",
        message: "Property not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: property,
    });
  } catch (error) {
    console.error("Error getting property:", error);

    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

// CREATE A PROPERTY
const createProperty = async (req, res) => {
  try {
    console.log("========== CREATE PROPERTY ==========");
    console.log("User:", req.user?._id);
    console.log("Property data received:", req.body);

    const {
      propertyName,
      description,
      propertyType,
      roomType,
      extraInfo,
      address,
      amenities,
      checkInTime,
      checkOutTime,
      maximumGuest,
      price,
      images,
    } = req.body;

    // Basic validation
    if (!propertyName) {
      return res.status(400).json({
        status: "fail",
        message: "Property name is required",
      });
    }

    if (!description) {
      return res.status(400).json({
        status: "fail",
        message: "Property description is required",
      });
    }

    if (!images || !Array.isArray(images) || images.length < 6) {
      return res.status(400).json({
        status: "fail",
        message: "Please add at least 6 images",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        status: "fail",
        message: "You must be logged in to add a property",
      });
    }

    // Upload images to ImageKit
    const uploadedImages = [];

    for (const image of images) {
      if (!image.url) {
        continue;
      }

      console.log("Uploading image to ImageKit...");

      const result = await imagekit.upload({
        file: image.url,
        fileName: `property_${Date.now()}.jpg`,
        folder: "property_images",
      });

      uploadedImages.push({
        url: result.url,
        public_id: result.fileId,
      });
    }

    console.log("Uploaded images:", uploadedImages.length);

    if (uploadedImages.length < 6) {
      return res.status(400).json({
        status: "fail",
        message: "At least 6 valid images are required",
      });
    }

    // Create property
    const property = await Property.create({
      propertyName,
      description,
      propertyType,
      roomType,
      extraInfo,
      address,
      amenities,
      checkInTime,
      checkOutTime,
      maximumGuest: Number(maximumGuest),
      price: Number(price),
      images: uploadedImages,
      userId: req.user._id,
    });

    console.log("PROPERTY CREATED SUCCESSFULLY:", property._id);
    console.log("====================================");

    res.status(201).json({
      status: "success",
      message: "Property created successfully",
      data: property,
    });
  } catch (error) {
    console.error("========== CREATE PROPERTY ERROR ==========");
    console.error(error);
    console.error(error.message);
    console.error("============================================");

    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// GET MY PROPERTIES
const getUsersProperties = async (req, res) => {
  try {
    const userId = req.user._id;

    const properties = await Property.find({
      userId: userId,
    });

    res.status(200).json({
      status: "success",
      data: properties,
    });
  } catch (error) {
    console.error("Error getting user's properties:", error);

    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export {
  getProperties,
  getProperty,
  createProperty,
  getUsersProperties,
};