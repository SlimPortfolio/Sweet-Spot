import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
  if (isConnected) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL!, {
      dbName: "SweetSpot-DB",
    });
    isConnected = true;
    console.log("mongodb is connected using: ", mongoose.connection.name);
  } catch (error) {
    console.log(error);
  }
};
