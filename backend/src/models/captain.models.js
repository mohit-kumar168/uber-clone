import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minLength: [3, "Firstname must be atleast 3 character long"]
        },
        lastName: {
            type: String,
            minLength: [3, "Lastname must be atleast 3 character long"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minLength: [3, "Color must be atleast 3 character long"]
        },
        plate: {
            type: String,
            required: true,
            unique: true,
            minLength: [3, "Please enter a valid vehicle plate"]
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be atleast 1"]
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ["car", "motorcycle", "auto"],
        }
    },
    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
}, {timestamps: true})

captainSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

captainSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

captainSchema.methods.generateToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWT_TOKEN_SECRET, {
        expiresIn: process.env.JWT_TOKEN_EXPIRY
    })

    return token;
}

export const Captain = mongoose.model("Captain", captainSchema)