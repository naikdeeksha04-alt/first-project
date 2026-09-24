
import slugify from "slugify";
import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    propertyName: {
      type: String,
      required: [true, "Please enter your property name"],
    },

    description: {
      type: String,
      required: [true, "Please add information about your property"],
    },

    extraInfo: {
      type: String,
      default: "Check in on time",
    },

    propertyType: {
      type: String,
      enum: ["House", "Flat", "Guest House", "Hotel"],
      default: "House",
    },

    roomType: {
      type: String,
      enum: ["Anytype", "Room", "Entire Home"],
      default: "Anytype",
    },

    maximumGuest: {
      type: Number,
      required: [
        true,
        "Please give the maximum number of guests that can occupy",
      ],
    },

    amenities: [
      {
        name: {
          type: String,
          required: true,
          enum: [
            "Wifi",
            "Kitchen",
            "AC",
            "Washing Machine",
            "TV",
            "Pool",
            "Free Parking",
          ],
        },

        icon: {
          type: String,
          required: true,
        },
      },
    ],

    images: {
      type: [
        {
          public_id: {
            type: String,
          },

          url: {
            type: String,
            required: true,
          },
        },
      ],

      validate: {
        validator: function (arr) {
          return arr.length >= 6;
        },

        message: "The images must contain at least 6 images",
      },
    },

    price: {
      type: Number,
      required: [true, "Please enter the price per night"],
      default: 500,
    },

    address: {
      area: String,
      city: String,
      state: String,
      pincode: Number,
    },

    currentBooking: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        fromDate: {
          type: Date,
        },

        toDate: {
          type: Date,
        },
      },
    ],

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    checkInTime: {
      type: String,
      default: "11:00",
    },

    checkOutTime: {
      type: String,
      default: "13:00",
    },
  },
  {
    timestamps: true,
  }
);

// Generate slug before saving
// Generate slug before saving
propertySchema.pre("save", async function () {
  if (this.isModified("propertyName")) {
    this.slug = slugify(this.propertyName, {
      lower: true,
      strict: true,
    });
  }

  if (this.address?.city) {
    this.address.city = this.address.city.toLowerCase();
  }
});

const Property =
  mongoose.models.Property ||
  mongoose.model("Property", propertySchema);

export { Property };

