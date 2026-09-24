import express from "express";
import { getProperties,getProperty } from "../controllers/propertyController.js";
const propertyRouter=express.Router()

propertyRouter.get("/test", (req, res) => {
    res.send("Property router is working");
});
propertyRouter.route("/").get(getProperties)
propertyRouter.route("/:id").get(getProperty)
export {propertyRouter};