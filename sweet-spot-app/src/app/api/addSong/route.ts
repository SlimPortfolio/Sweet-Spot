import { connectToDB } from "@/lib/mongodb";
import Song from "@/models/Song";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const data = await req.json();

    const newSong = await Song.create({
      label: data.label,
      artist: data.artist,
      id: data.id,
      songLowNote: data.songLowNote,
      songHighNote: data.songHighNote,
      songOriginalKey: data.songOriginalKey,
    });

    return NextResponse.json(newSong, { status: 201 });
  } catch (error) {
    return new Response("Failed to add song", { status: 500 });
  }
}
