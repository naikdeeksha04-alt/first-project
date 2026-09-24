import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        property: {
            type: mongoose.Schema.ObjectId,
            ref: "Property",
            required: [true, "Booking must belong to a property"],
        },

        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User", // ❗ User, not Property
            required: [true, "Booking must belong to a user"],
        },

        price: {
            type: Number,
            required: [true, "Booking must have price"],
        },

        createdAt: {
            type: Date,
            default: Date.now, // ❗ Don't use Date.now()
        },

        paid: {
            type: Boolean,
            default: true, // ❗ Missing comma was here
        },

        fromDate: {
            type: Date,
        },

        toDate: {
            type: Date,
        },

        guests: {
            type: Number,
        },

        numberofnights: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

bookingSchema.pre(/^find/, function () {
    this.populate("user");
    this.populate({
        path: "property",
        select: "maximumGuest images propertyName address",
    });

    
});

const Booking = mongoose.model("Booking", bookingSchema);

export { Booking };