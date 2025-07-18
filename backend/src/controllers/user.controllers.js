import { User } from "../models/user.models.js";
import { createUser } from "../services/user.services.js";
import { validationResult } from "express-validator";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";


const registerUser = async (req, res) => {
    try {
        // console.log("Request body: ", req.body);
        
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            console.log("Validation errors: ", errors.array());
            throw new apiError(400, "Validation failed", errors.array());
        }
        
        const { fullName, email, password } = req.body;
        const user = await createUser({ 
            firstName: fullName.firstName, 
            lastName: fullName.lastName, 
            email, 
            password 
        });

        const token = await user.generateToken();

        console.log("User and token: ", user, token);

        return res
            .status(201)
            .json(
                new apiResponse(201, {token, user}, "User registered successfully")
            )
    } catch (error) {
        throw new apiError(501, "Failed to register user");
    }
}

const loginUser = async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            throw new apiError(400, "Validation failed", errors.array());
        }
        
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if(!user){
            throw new apiError(401, "Invalid email or password");
        }

        const isPasswordValid = await user.isPasswordCorrect(password);

        if(!isPasswordValid){
            throw new apiError(401, "Invalid email or password");
        }

        const token = await user.generateToken();

        return res
            .status(200)
            .json(
                new apiResponse(200, {token, user}, "User Logged In successfully")
            )

    } catch(error) {
        throw new apiError(501, "Login Failed")
    }
}

const getUserProfile = async (req, res) => {

}

export {
    registerUser,
    loginUser,
    getUserProfile
}