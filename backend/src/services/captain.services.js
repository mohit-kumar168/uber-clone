import { Captain } from "../models/captain.models.js";
import { apiError } from "../utils/apiError.js";

const createCaptain = async ({ firstName, lastName, email, password, color, plate, capacity, vehicleType }) => {
    if (!firstName || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new apiError(400, "All fields are required");
    }

    const captain = await Captain.create({
        fullName: {
            firstName,
            lastName,
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType,
        },
    });
    captain.save();

    return captain;
}

export { createCaptain };