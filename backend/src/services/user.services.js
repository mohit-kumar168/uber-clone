import { User } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";

const createUser = async ({ firstName, lastName, email, password }) => {
    if (!firstName || !email || !password) {
        throw new apiError(400, "First name, email, and password are required");
    }

    const user = await User.create({
        fullName: {
            firstName,
            lastName,
        },
        email,
        password,
    });
    user.save();

    return user;
};

export { createUser };
