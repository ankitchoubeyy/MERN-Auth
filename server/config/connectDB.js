import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`);
        console.log("Database connected");
    } catch (error) {
        console.log(`Error in Db connection : ${error}`);
    }
}

export default connectDB;