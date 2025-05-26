// import mongoose from "mongoose";
// let isConnected: boolean = false;

// export const connectToDB = async ():Promise<void> => {
//     if(isConnected) {
//         console.log("mongodb is connected")
//         return;

//     }
//     try {
//         await mongoose.connect(process.env.MONGO_URL || dbnam)
//     }
// }

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
    console.log("mongodb is connected");
    console.log("Using DB:", mongoose.connection.name);
  } catch (error) {
    console.log(error);
  }
};
