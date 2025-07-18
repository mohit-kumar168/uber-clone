import { Captain } from "../models/captain.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { createCaptain } from "../services/captain.services.js";
import { validationResult } from "express-validator";

const registerCaptain = async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw new apiError(400, "Validation failed", errors.array());
        }

        const { fullName, email, password, vehicle } = req.body;

        const isCaptainAlreadyExist = await Captain.findOne({ email });
        if(isCaptainAlreadyExist){
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
            vehicleType: vehicle.vehicleType
        })

        const token = await captain.generateToken();

        return res
            .status(201)
            .json(
                new apiResponse(
                    201,
                    {token, captain},
                    "Captain registered successfully"
                )
            )

    } catch (error) {
        throw new apiError(501, "Failed to register captain");
    }
}

export {
    registerCaptain
}