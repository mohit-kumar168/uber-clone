import { User } from "../models/user.models.js";
import { Captain } from "../models/captain.models.js";
import { BlacklistToken } from "../models/blacklistToken.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { apiError } from "../utils/apiError.js";


const authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        throw new apiError(401, "Unauthorized");
    }

    const isBlacklisted = await BlacklistToken.findOne({ token });
    if (isBlacklisted) {
        throw new apiError(401, "Unauthorized");
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        const user = await User.findById(decoded._id);

        req.user = user;

        return next();

    } catch(error) {
        throw new apiError(401, "Unauthorized Access")
    }
}

const authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        throw new apiError(401, "Unauthorized");
    }

    const isBlacklisted = await BlacklistToken.findOne({ token });
    if(isBlacklisted) {
        throw new apiError(401, "Unauthorized");
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        const captain = await Captain.findById(decoded._id);
        req.captain = captain;
        return next();
    } catch (error) {
        throw new apiError(401, "Unauthorized");
    }
}

export { authUser, authCaptain };