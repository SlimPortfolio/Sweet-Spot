import { connectToDB } from "@/lib/mongodb";
import Song from "@/models/Song";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectToDB();
    const songs = await Song.find();
    return new Response(JSON.stringify(songs), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Failed to fetch songs", { status: 500 });
  }
}
