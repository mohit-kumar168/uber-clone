import { Captain } from "../models/captain.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { createCaptain } from "../services/captain.services.js";
import { validationResult } from "express-validator";
import { BlacklistToken } from "../models/blacklistToken.models.js";

const registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new apiError(400, "Validation failed", errors.array());
    }

    const { fullName, email, password, vehicle } = req.body;

    const isCaptainAlreadyExist = await Captain.findOne({ email });
    if (isCaptainAlreadyExist) {
        throw new apiError(409, "Captain with this email already exists");
    }

    const captain = await createCaptain({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    });

    const token = await captain.generateToken();

    return res
        .status(201)
        .json(
            new apiResponse(
                201,
                { token, captain },
                "Captain registered successfully"
            )
        );
};

const loginCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new apiError(400, "Validation failed", errors.array());
    }

    const { email, password } = req.body;
    const captain = await Captain.findOne({ email }).select("+password");
    if (!captain) {
        throw new apiError(401, "Invalid email or password");
    }

    const isPasswordValid = await captain.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new apiError(401, "Invalid email or password");
    }

    const token = await captain.generateToken();
    return res
        .status(200)
        .cookie("token", token)
        .json(
            new apiResponse(
                200,
                { token, captain },
                "Captain logged in successfully"
            )
        );
};

const getCaptainProfile = async (req, res) => {
    const captain = req.captain;
    if(!captain) {
        throw new apiError(404, "Captain not found");
    }

    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                captain,
                "Captain profile fetched successfully"
            )
        )
}

const logoutCaptain = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    await BlacklistToken.create({ token });

    return res
        .status(200)
        .clearCookie("token")
        .json(
            new apiResponse(200, {}, "Captain logged out successfully")
        );
}

export { 
    registerCaptain, 
    loginCaptain,
    getCaptainProfile,
    logoutCaptain
};
