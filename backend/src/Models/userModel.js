import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "node:crypto";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"],
            trim: true,
            maxlength: [50, "Your name cannot be more than 50 characters"],
        },

        email: {
            type: String,
            required: [true, "Please enter email id"],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, "Please enter a valid email address"],
        },

        password: {
            type: String,
            required: [true, "Please enter password"],
            minlength: [6, "Your password must be longer than 6 characters"],
            select: false,
        },

        passwordConfirm: {
            type: String,
            required: [true, "Please confirm your password"],
            validate: {
                validator: function (value) {
                    return value === this.password;
                },
                message: "Passwords are not the same!",
            },
        },

        phoneNumber: {
            type: String,
            required: [true, "Please enter phone number"],
            unique: true,
            trim: true,
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        avatar: {
            url: {
                type: String,
            },
            public_id: {
                type: String,
            },
        },

        passwordChangedAt: {
            type: Date,
        },

        passwordResetToken: {
            type: String,
            select: false,
            index: true,
        },

        passwordResetExpires: {
            type: Date,
            select: false,
        },
    },
    {
        timestamps: true,
    }
);


// PASSWORD HASHING
userSchema.pre("save", async function () {

    // If password has not changed, do nothing.
    if (!this.isModified("password")) {
        return;
    }

    // Hash password
    this.password = await bcrypt.hash(this.password, 12);

    // Do not store passwordConfirm
    this.passwordConfirm = undefined;
});


// REMOVE SENSITIVE FIELDS FROM JSON
userSchema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.password;
        delete ret.passwordConfirm;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpires;
        delete ret.__v;

        return ret;
    },
});


// CHECK PASSWORD
userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};


// CHECK IF PASSWORD WAS CHANGED AFTER JWT WAS CREATED
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {

    if (this.passwordChangedAt) {

        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );

        return JWTTimestamp < changedTimestamp;
    }

    return false;
};


// CREATE PASSWORD RESET TOKEN
userSchema.methods.createPasswordResetToken = function () {

    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};


const User = mongoose.model("User", userSchema);

export { User };