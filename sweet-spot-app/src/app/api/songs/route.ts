import { connectToDB } from "@/lib/mongodb";
import Song from "@/models/Song";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

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

export async function POST(req: Request) {
  try {
    await connectToDB();
    const data = await req.json();

    const newSong = await Song.create({
      label: data.label,
      artist: data.artist,
      songLowNote: data.songLowNote,
      songHighNote: data.songHighNote,
      songOriginalKey: data.songOriginalKey,
    });

    return NextResponse.json(newSong, { status: 201 });
  } catch (error) {
    return new Response("Failed to add song", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("_id");

    if (!id) {
      return new Response("Missing song ID", { status: 400 });
    }

    const deletedSong = await Song.findByIdAndDelete(id);

    if (!deletedSong) {
      return new Response("Song not found", { status: 404 });
    }

    return NextResponse.json(
      { message: "Song deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response("Failed to delete song", { status: 500 });
  }
}
