import mongoose from "mongoose";

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("DB Connected Successfuly!");
    })
    .catch((err) => {
      console.error(`DB Connection failed: ${err}`);
    });
};

export default dbConnect;
