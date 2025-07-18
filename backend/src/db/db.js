import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDB = async () => {
    try {
        const connectionInstence = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("Database connected !! DB host: ", connectionInstence.connection.host)
        console.log("Database name: ", connectionInstence.connection.name);
    } catch (error) {
        console.error("❌ Database connection failed: ", error);
        process.exit(1);
    }
}

export default connectDB;