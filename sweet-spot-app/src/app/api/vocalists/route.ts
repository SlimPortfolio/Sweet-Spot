import { connectToDB } from "@/lib/mongodb";
import Vocalist from "@/models/Vocalist";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectToDB();
    const vocalists = await Vocalist.find();
    return new Response(JSON.stringify(vocalists), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Failed to fetch songs", { status: 500 });
  }
}
