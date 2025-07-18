import express from "express";
import { body } from "express-validator";
import { 
    registerCaptain
} from "../controllers/captain.controllers.js";


const router = express.Router();

router.post("/register", [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("fullName.firstName").isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("vehicle.color").isLength({ min: 3 }).withMessage("Color must be at least 3 characters long"),
    body("vehicle.plate").isLength({ min: 3 }).withMessage("Please enter a valid vehicle plate"),
    body("vehicle.capacity").isInt({ min: 1 }).withMessage("Capacity must be at least 1"),
    body("vehicle.vehicleType").isIn(["car", "motorcycle", "auto"]).withMessage("Vehicle type must be one of: car, motorcycle, auto")
], registerCaptain)

export { router };