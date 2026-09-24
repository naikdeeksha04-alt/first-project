import jwt from "jsonwebtoken";


// Create JWT
const signinToken = (id) => {

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing in .env file");
    }

    if (!process.env.JWT_EXPIRES_IN) {
        throw new Error("JWT_EXPIRES_IN is missing in .env file");
    }

    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );
};


// Create token, store it in cookie and send response
const createSendToken = (user, statusCode, res) => {

    const token = signinToken(user._id);

    const cookieOptions = {
        expires: new Date(
            Date.now() +
            Number(process.env.JWT_COOKIE_EXPIRES_IN || 7) *
            24 *
            60 *
            60 *
            1000
        ),

        httpOnly: true,

        sameSite:
            process.env.NODE_ENV === "production"
                ? "none"
                : "lax",

        secure:
            process.env.NODE_ENV === "production"
    };

    res.cookie("jwt", token, cookieOptions);

    user.password = undefined;

    res.status(statusCode).json({
        status: "Success",
        token,
        user
    });
};


// Default avatar
const defaultAvatarUrl = (name) =>
    "https://ui-avatars.com/api/?name=" +
    encodeURIComponent(name || "User") +
    "&background=0e8b53&color=fff&size=256&bold=true";


// Filter allowed fields
const filterObj = (obj, ...allowedFields) => {

    const newObj = {};

    Object.keys(obj).forEach((el) => {

        if (allowedFields.includes(el)) {
            newObj[el] = obj[el];
        }

    });

    return newObj;
};


export {
    signinToken,
    createSendToken,
    defaultAvatarUrl,
    filterObj
};