// app/api/songs/route.ts
import { connectToDB } from "@/lib/mongodb";
import Song from "@/models/Song";
import mongoose from "mongoose";

export async function GET() {
  //this is logged in terminal, not on the webpage
  // const songsRaw = await mongoose.connection.db
  //   ?.collection("songs")
  //   .find()
  //   .toArray();
  // console.log("Raw songs:", songsRaw);
  const collections = await mongoose.connection.db?.listCollections().toArray();
  console.log("Using DB:", mongoose.connection.name);
  console.log(
    "Collections in DB:",
    collections?.map((c) => c.name)
  );
  try {
    await connectToDB();
    const songsRaw = await mongoose.connection.db
      ?.collection("songs")
      .find()
      .toArray();
    // const songs = await Song.find();
    const count = await Song.countDocuments();
    const songs = await Song.find();
    return new Response(JSON.stringify(songs), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Failed to fetch songs", { status: 500 });
  }
}
